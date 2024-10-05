import { createGrantCache } from './grant-cache.ts';
import { createScopeCache } from './scope-cache.ts';
import { type GetScopeLoader, createScopeResolverMap } from './scope-resolver.ts';
import { setAuthStore } from './store.ts';

export function loadAuthStore<T>(ctx: T, getScopeLoader: GetScopeLoader<T>) {
	setAuthStore(ctx, async () => {
		const scopeLoaders = await getScopeLoader(ctx);
		return {
			scopes: createScopeResolverMap(ctx, scopeLoaders),
			scopeCache: createScopeCache(),
			grantCache: createGrantCache(),
		};
	});
}
