import { AuthExtension, type AuthOptions } from './lib/auth-extension.ts';
import './lib/global-types.ts';
import type { GetScopeLoader } from './lib/scope-resolver.ts';

export type {
	AuthMethodOptions,
	AuthOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './lib/auth-extension.ts';
export { aggregateErrorResolver } from './lib/error.ts';
export type { ScopeErrorResolver } from './lib/error.ts';
export type { GetGrant } from './lib/grant.ts';
export type { ScopeRules, Scopes } from './lib/scope-rules.ts';

export function authExtension<Ctx>(loadScopes: GetScopeLoader<Ctx>, options: AuthOptions = {}) {
	return () => new AuthExtension(loadScopes, options);
}
