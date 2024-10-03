import { Middleware } from '@baeta/core';
import { Extension, ModuleBuilder, createMiddlewareAdapter, nameFunction } from '@baeta/core/sdk';
import { TypeGetter } from './global-types';
import { Store } from './store';
import { ParentRef, StoreAdapter, StoreAdapterOptions, StoreOptions } from './store-adapter';

export class CacheExtension extends Extension {
	constructor(
		private store: Store,
		private defaultOptions?: StoreAdapterOptions,
	) {
		super();
	}

	getTypeExtensions = <Root, Context>(
		module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$createCache: (options?: StoreOptions<Root>) => {
				const mergedOptions = {
					...this.defaultOptions,
					...options,
				};
				return this.store.createStoreAdapter<Root>(mergedOptions, type, '');
			},
		};
	};

	getResolverExtensions = <Result, Root, Context, Args>(
		module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		const ref = `${type}_${field}`;
		return {
			$cacheRef: ref,
			$useCache: (store: StoreAdapter<TypeGetter<Result>>) => {
				const middleware = store.createQueryMiddleware(ref) as Middleware<
					unknown,
					unknown,
					unknown,
					unknown
				>;
				nameFunction(middleware, `${type}.${field}.$useCache`);
				module.mapper.addMiddleware(type, field, createMiddlewareAdapter(middleware));
			},
			$clearCache: (
				store: StoreAdapter<TypeGetter<Result>>,
				parentRef?: ParentRef,
				args?: Partial<Args>,
			) => {
				return store.deleteQueries(ref, parentRef ?? undefined, args);
			},
		};
	};
}