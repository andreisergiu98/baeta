import type { Extension } from '@baeta/core/sdk';
import { AuthExtension, type AuthOptions } from './lib/auth-extension.ts';
import './lib/global-types.ts';
import type { GetScopeLoader } from './lib/scope-resolver.ts';

export type {
	AuthMethodOptions,
	AuthMethodSubscribeOptions,
	AuthOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './lib/auth-extension.ts';
export type { DefaultScopes } from './lib/scope-defaults.ts';
export { aggregateErrorResolver, type ScopeErrorResolver } from './lib/error.ts';
export type { GetGrant, GetGrantFn, GetGrantResult } from './lib/grant.ts';
export type { LogicRule } from './lib/rule.ts';
export type { ScopeRules, ScopeRule, Scopes } from './lib/scope-rules.ts';
export type { GetScopeLoader, ScopeLoader, ScopeLoaderMap } from './lib/scope-resolver.ts';

/**
 * Creates an authentication extension.
 *
 * @param loadScopes - Function to load authorization scopes
 * @param options - Configuration options for the auth extension
 * @returns A factory function that creates an AuthExtension instance
 *
 * @example
 * ```typescript
 * const authExt = authExtension<Context>(
 *   async (ctx) => ({
 *     isLoggedIn: () =>ctx.userId != null,
 *     hasRole: (role) => ctx.user?.role === role
 *   }),
 *   {
 *     defaultScopes: {
 *       Query: { isLoggedIn: true },
 *       Mutation: { isLoggedIn: true },
 *       Subscription: { subscribe: { isLoggedIn: true } }
 *     }
 *   }
 * );
 * ```
 */
export function authExtension<Ctx>(loadScopes: GetScopeLoader<Ctx>, options: AuthOptions = {}) {
	return (): Extension => new AuthExtension(loadScopes, options);
}
