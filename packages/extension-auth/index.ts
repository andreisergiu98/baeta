import './lib/global-types.ts';

import { AuthExtension, type AuthOptions } from './lib/auth-extension.ts';
import type { GetScopeLoader } from './lib/scope-resolver.ts';

export type { AuthOptions } from './lib/auth-extension.ts';
export type {
	AuthMiddlewareOptions,
	AuthMiddlewareSubscribeOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './lib/auth-middlewares.ts';
export { aggregateErrorResolver, type ScopeErrorResolver } from './lib/error.ts';
export type { GetGrant, GetGrantFn, GetGrantResult } from './lib/grant.ts';
export type { LogicRule } from './lib/rule.ts';
export type { DefaultScopes } from './lib/scope-defaults.ts';
export type { GetScopeLoader, ScopeLoader, ScopeLoaderMap } from './lib/scope-resolver.ts';
export type { ScopeRule, ScopeRules, ScopesShape } from './lib/scope-rules.ts';

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
export function authExtension<Ctx>(
	loadScopes: GetScopeLoader<AuthExtension.Scopes, Ctx>,
	options: AuthOptions = {},
) {
	return new AuthExtension(loadScopes, options);
}
