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
export { type AuthOptions, createAuth } from './lib/create-auth.ts';
