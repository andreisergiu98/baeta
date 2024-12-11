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
export type { AuthExtension, AuthExtensionMethods } from './lib/global-types.ts';

export function authExtension<Ctx>(loadScopes: GetScopeLoader<Ctx>, options: AuthOptions = {}) {
	return (): Extension => new AuthExtension(loadScopes, options);
}
