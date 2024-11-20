import {
	Extension,
	type ModuleBuilder,
	createMiddlewareAdapter,
	nameFunction,
} from '@baeta/core/sdk';
import type { CreateCacheArgs, TypeGetter, UseCacheArgs } from './global-types.ts';
import type { MiddlewareOptions, RequiredMiddlewareOptions } from './middleware-options.ts';
import { CacheRef, type RefCompatibleRoot } from './ref.ts';
import type { QueryMatching, StoreAdapter } from './store-adapter.ts';
import type { DefaultStoreOptions } from './store-options.ts';
import type { Store } from './store.ts';

export class CacheExtension extends Extension {
	constructor(
		private store: Store,
		private defaultOptions?: DefaultStoreOptions,
	) {
		super();
	}

	getTypeExtensions = <Root, Context>(
		module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$createCache: (...args: CreateCacheArgs<Root>) => {
				const [options] = args;
				const mergedOptions = {
					...this.defaultOptions,
					...options,
				};
				const typeHash = module.hashes[type]?.hash ?? '0';
				return this.store.createStoreAdapter<Root>(mergedOptions, type, typeHash);
			},
		};
	};

	getResolverExtensions = <Result, Root, Context, Args>(
		module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		const fieldHash = module.hashes[type]?.fieldsHashes[field] ?? '0';
		const ref = new CacheRef<Result, Root, Args>(type, field, fieldHash);
		return {
			$cacheRef: ref,
			$cacheRevision: (revision: number) => {
				ref.setRevision(revision);
			},
			$cacheClear: (store: StoreAdapter<TypeGetter<Result>>, matcher?: QueryMatching<Args>) => {
				return store.deleteQueries(ref, matcher);
			},
			$useCache: (...args: UseCacheArgs<Result, Root>) => {
				const [store, options] = args;
				// We try to please the compiler
				const middlewareArgs = [options] as Root extends RefCompatibleRoot
					? [options?: MiddlewareOptions<Root>]
					: [options: RequiredMiddlewareOptions<Root>];
				const middleware = store.createMiddleware(ref, ...middlewareArgs);
				nameFunction(middleware, `${type}.${field}.$useCache`);
				module.mapper.addMiddleware(type, field, createMiddlewareAdapter(middleware));
			},
		};
	};
}
