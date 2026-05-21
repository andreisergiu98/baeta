export type {
	AuthMiddlewareOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './lib/auth-middlewares.ts';
export { aggregateErrorResolver, type ScopeErrorResolver } from './lib/error.ts';
export type { GetGrant, GetGrantFn, GetGrantResult, GrantConfig } from './lib/grant.ts';
export type { ScopeCacheKeyFn, ScopeCacheKeyMap } from './lib/scope-cache-keys.ts';
export type { DefaultScopes } from './lib/scope-defaults.ts';
export type { GetScopeLoader, ScopeLoader, ScopeLoaderMap } from './lib/scope-resolver.ts';
export type { ScopeRule, ScopeRules, ScopesShape, LogicRule } from './lib/scope-rules.ts';
export { type AuthOptions, createAuth } from './lib/create-auth.ts';
export { createScopeCacheKey, type SerializableScope } from './lib/serialize.ts';
