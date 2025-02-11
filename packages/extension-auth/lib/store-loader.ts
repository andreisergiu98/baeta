import { createGrantCache } from './grant-cache.ts';
import { createScopeCache } from './scope-cache.ts';
import { type GetScopeLoader, createScopeResolverMap } from './scope-resolver.ts';
import type { ScopesShape } from './scope-rules.ts';
import { setAuthStore } from './store.ts';

export function loadAuthStore<S extends ScopesShape, T>(
	ctx: T,
	getScopeLoader: GetScopeLoader<S, T>,
) {
	setAuthStore(ctx, async () => {
		const scopeLoaders = await getScopeLoader(ctx);
		return {
			scopes: createScopeResolverMap(ctx, scopeLoaders),
			scopeCache: createScopeCache(),
			grantCache: createGrantCache(),
		};
	});
}
