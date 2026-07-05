import type { ResolverParams } from '@baeta/core';
import { ForbiddenError } from '@baeta/errors';
import type { AuthStoreResult } from './auth-store.ts';
import type { GrantCache } from './grant-cache.ts';
import type { ScopesShape } from './scope-shape.ts';

export type LogicRule = 'and' | 'or' | 'chain' | 'race';

/**
 * Defines the structure of authorization scope rules.
 * Combines individual scope rules with logical operators and granted permissions.
 */
export type ScopeRules<Scopes extends ScopesShape, Grants extends string> =
	| ScopeRule<Scopes, Grants>
	| ScopeLogicRule<Scopes, Grants>;

/**
 * Utility type that enforces boolean scopes must be true.
 * For non-boolean scopes, preserves the original type.
 */
export type ScopeRule<Scopes extends ScopesShape, Grants extends string> =
	| {
			[K in keyof Scopes]: {
				type: 'scope';
				key: K;
				value: Scopes[K] extends boolean ? true : Scopes[K];
			};
	  }[keyof Scopes]
	| { type: 'grant'; grant: Grants };

export type ScopeLogicRule<Scopes extends ScopesShape, Grants extends string> = {
	type: 'rule';
	rule: LogicRule;
	scopes: ScopeRules<Scopes, Grants>[];
};

export async function verifyGrant(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	grant: string | undefined,
	grantCache: GrantCache,
): Promise<true> {
	if (grant == null) {
		throw new Error("Grant key '$granted' must be defined in the scope rules!");
	}
	const granted = grantCache.getGrants(params.source);
	if (granted?.has(grant) !== true) {
		throw new ForbiddenError();
	}
	return true;
}

export async function verifyScope<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeRules<Scopes, Grants> | undefined,
	store: AuthStoreResult,
) {
	if (scope == null) {
		throw new Error('Scope rules cannot be undefined!');
	}

	if (scope.type === 'rule') {
		return await verifyScopeRule(params, scope, store);
	}

	if (scope.type === 'grant') {
		return await verifyGrant(params, scope.grant, store.grantCache);
	}

	if (scope.type === 'scope') {
		const resolve = store.scopeResolverMap.get(scope.key as string);
		if (resolve == null) {
			throw new Error(`No scope resolver found for key '${scope.key as string}'!`);
		}
		const result = await resolve(scope.value);
		if (result !== true) {
			throw new Error('Scope resolver should throw for non true results!');
		}
		return true;
	}

	scope satisfies never;
	throw new Error('Invalid scope rule! Must be a scope, grant, or nested rule.');
}

export async function verifyScopeRule<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeLogicRule<Scopes, Grants>,
	store: AuthStoreResult,
): Promise<true> {
	if (scope.scopes.length === 0) {
		throw new Error('Scope rule cannot be empty!');
	}

	if (scope.rule === 'chain') {
		return await verifyChainScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'race') {
		return await verifyRaceScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'or') {
		return await verifyOrScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'and') {
		return await verifyAndScopes(params, scope.scopes, store);
	}

	scope.rule satisfies never;
	throw new Error("Invalid logic rule! Must be one of 'chain', 'race', 'or', or 'and'.");
}

export async function verifyChainScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
): Promise<true> {
	for (const scope of scopes) {
		await verifyScope(params, scope, store);
	}
	return true;
}

export async function verifyRaceScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
): Promise<true> {
	for (const scope of scopes) {
		const result = await verifyScope(params, scope, store).catch((err) => err);
		if (result === true) {
			return true;
		}
	}
	throw new ForbiddenError();
}

export async function verifyOrScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
): Promise<true> {
	const promises = scopes.map((scope) => verifyScope(params, scope, store));
	return await Promise.any(promises);
}

export async function verifyAndScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
): Promise<true> {
	const promises = scopes.map((scope) => verifyScope(params, scope, store));
	await Promise.all(promises);
	return true;
}
