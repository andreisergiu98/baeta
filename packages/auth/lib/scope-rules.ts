import type { ResolverParams } from '@baeta/core';
import {
	mapMaybePromise,
	mapMaybePromiseAll,
	mapMaybePromiseAny,
	thenMaybePromise,
} from '@baeta/core/utils';
import { ForbiddenError } from '@baeta/errors';
import { GraphQLError } from 'graphql';
import type { AuthStoreResult } from './auth-store.ts';
import type { GrantCache } from './grant-cache.ts';
import { logger } from './logger.ts';
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

type VerifyResult = true | PromiseLike<true>;

export function verifyGrant(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	grant: string | undefined,
	grantCache: GrantCache,
): true {
	if (grant == null) {
		throw new Error("Grant key '$granted' must be defined in the scope rules!");
	}
	const granted = grantCache.getGrants(params.source);
	if (granted?.has(grant) !== true) {
		throw new ForbiddenError();
	}
	return true;
}

export function verifyScope<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeRules<Scopes, Grants> | undefined,
	store: AuthStoreResult,
): VerifyResult {
	if (scope == null) {
		throw new Error('Scope rules cannot be undefined!');
	}

	if (scope.type === 'rule') {
		return verifyScopeRule(params, scope, store);
	}

	if (scope.type === 'grant') {
		return verifyGrant(params, scope.grant, store.grantCache);
	}

	if (scope.type === 'scope') {
		const resolve = store.scopeResolverMap.get(scope.key as string);
		if (resolve == null) {
			throw new Error(`No scope resolver found for key '${scope.key as string}'!`);
		}
		return mapMaybePromise(resolve(scope.value), (result): true => {
			if (result !== true) {
				throw new Error('Scope resolver should throw for non true results!');
			}
			return true;
		});
	}

	scope satisfies never;
	throw new Error('Invalid scope rule! Must be a scope, grant, or nested rule.');
}

export function verifyScopeRule<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scope: ScopeLogicRule<Scopes, Grants>,
	store: AuthStoreResult,
): VerifyResult {
	if (scope.scopes.length === 0) {
		throw new Error('Scope rule cannot be empty!');
	}

	if (scope.rule === 'chain') {
		return verifyChainScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'race') {
		return verifyRaceScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'or') {
		return verifyOrScopes(params, scope.scopes, store);
	}

	if (scope.rule === 'and') {
		return verifyAndScopes(params, scope.scopes, store);
	}

	scope.rule satisfies never;
	throw new Error("Invalid logic rule! Must be one of 'chain', 'race', 'or', or 'and'.");
}

export function verifyChainScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
	index = 0,
): VerifyResult {
	if (index >= scopes.length) {
		return true;
	}
	return mapMaybePromise(verifyScope(params, scopes[index], store), () =>
		verifyChainScopes(params, scopes, store, index + 1),
	);
}

export function verifyRaceScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
	index = 0,
): VerifyResult {
	if (index >= scopes.length) {
		throw new ForbiddenError();
	}
	return thenMaybePromise(
		() => verifyScope(params, scopes[index], store),
		(): true => true,
		(err) => {
			if (!(err instanceof GraphQLError)) {
				logger.warn({
					type: 'non-graphql-error',
					message: `Non GraphQLError encountered by auth`,
					extra: { origin: err },
				});
			}
			return verifyRaceScopes(params, scopes, store, index + 1);
		},
	);
}

export function verifyOrScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: ScopeRules<Scopes, Grants>[],
	store: AuthStoreResult,
): VerifyResult {
	return mapMaybePromiseAny(scopes, (scope) => verifyScope(params, scope, store));
}

export function verifyAndScopes<Scopes extends ScopesShape, Grants extends string>(
	params: ResolverParams<unknown, unknown, unknown, unknown>,
	scopes: (ScopeRules<Scopes, Grants> | undefined)[],
	store: AuthStoreResult,
): VerifyResult {
	return mapMaybePromise(
		mapMaybePromiseAll(scopes, (scope) => verifyScope(params, scope, store)),
		(): true => true,
	);
}
