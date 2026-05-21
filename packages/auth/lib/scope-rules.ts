import type { ResolverParams } from '@baeta/core';
import { ForbiddenError } from '@baeta/errors';
import { getAuthStore } from './store.ts';

export type LogicRule = 'and' | 'or' | 'chain' | 'race';

export type ScopesShape = Record<string, unknown>;

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
): Promise<true> {
	if (grant == null) {
		throw new Error("Grant key '$granted' must be defined in the scope rules!");
	}
	const store = await getAuthStore(params.ctx);
	const granted = store.grantCache.getGrants(params.source);
	if (granted?.has(grant) !== true) {
		throw new ForbiddenError();
	}
	return true;
}

export async function verifyScope<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeRules<Scopes, Grants> | undefined,
) {
	if (scope == null) {
		throw new Error('Scope rules cannot be undefined!');
	}

	if (scope.type === 'rule') {
		return await verifyScopeRule(params, scope);
	}

	if (scope.type === 'grant') {
		return await verifyGrant(params, scope.grant);
	}

	if (scope.type === 'scope') {
		const store = await getAuthStore(params.ctx);
		const resolve = store.scopes[scope.key as string];
		if (resolve == null) {
			throw new Error(`No scope resolver found for key '${scope.key as string}'!`);
		}
		return await resolve(scope.value);
	}

	scope satisfies never;
	throw new Error('Invalid scope rule! Must be a scope, grant, or nested rule.');
}

export async function verifyScopeRule<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeLogicRule<Scopes, Grants>,
): Promise<true> {
	if (scope.scopes.length === 0) {
		throw new Error('Scope rule cannot be empty!');
	}

	if (scope.rule === 'chain') {
		return await verifyChainScopes(params, scope.scopes);
	}

	if (scope.rule === 'race') {
		return await verifyRaceScopes(params, scope.scopes);
	}

	if (scope.rule === 'or') {
		return await verifyOrScopes(params, scope.scopes);
	}

	if (scope.rule === 'and') {
		return await verifyAndScopes(params, scope.scopes);
	}

	scope.rule satisfies never;
	throw new Error("Invalid logic rule! Must be one of 'chain', 'race', 'or', or 'and'.");
}

export async function verifyChainScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
): Promise<true> {
	for (const scope of scopes) {
		await verifyScope(params, scope);
	}
	return true;
}

export async function verifyRaceScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
): Promise<true> {
	for (const scope of scopes) {
		const result = await verifyScope(params, scope).catch((err) => err);
		if (result === true) {
			return true;
		}
	}
	throw new ForbiddenError();
}

export async function verifyOrScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
): Promise<true> {
	const promises = scopes.map((scope) => verifyScope(params, scope));
	return await Promise.any(promises);
}

export async function verifyAndScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
): Promise<true> {
	const promises = scopes.map((scope) => verifyScope(params, scope));
	await Promise.all(promises);
	return true;
}
