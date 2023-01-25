import { AuthExtension, AuthOptions } from './lib/auth-extension';
import { ScopesInitializer } from './lib/scope-loader';

export function authExtension<Ctx>(loadScopes: ScopesInitializer<Ctx>, options: AuthOptions = {}) {
  return () => new AuthExtension(loadScopes, options);
}
