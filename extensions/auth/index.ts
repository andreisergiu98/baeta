import { AuthExtension, AuthOptions } from './lib/auth-extension';
import './lib/global-types';
import { ScopesInitializer } from './lib/scope-loader';

export type {
  AuthMethodOptions,
  AuthOptions,
  GetPostRequiredScopes,
  GetRequiredScopes,
} from './lib/auth-extension';
export type { RequiredScopes, Scopes } from './lib/scope';

export function authExtension<Ctx>(loadScopes: ScopesInitializer<Ctx>, options: AuthOptions = {}) {
  return () => new AuthExtension(loadScopes, options);
}
