import { AuthExtension, AuthOptions } from './lib/auth-extension';
import './lib/global-types';
import { GetScopeLoader } from './lib/scope-resolver';

export type {
	AuthMethodOptions,
	AuthOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './lib/auth-extension';
export { aggregateErrorResolver } from './lib/error';
export type { ScopeErrorResolver } from './lib/error';
export type { GetGrant } from './lib/grant';
export type { ScopeRules, Scopes } from './lib/scope-rules';

export function authExtension<Ctx>(loadScopes: GetScopeLoader<Ctx>, options: AuthOptions = {}) {
	return () => new AuthExtension(loadScopes, options);
}
