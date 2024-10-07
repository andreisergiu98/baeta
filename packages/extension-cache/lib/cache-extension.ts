import {
	Extension,
	type ModuleBuilder,
	createMiddlewareAdapter,
	nameFunction,
} from '@baeta/core/sdk';
import type { TypeGetter } from './global-types.ts';
import type { MiddlewareOptions } from './middleware-options.ts';
import { CacheRef } from './ref.ts';
import type { QueryMatching, StoreAdapter } from './store-adapter.ts';
import type { DefaultStoreOptions, StoreOptions } from './store-options.ts';
import type { Store } from './store.ts';

export class CacheExtension extends Extension {
	constructor(
		private store: Store,
		private defaultOptions?: DefaultStoreOptions,
	) {
		super();
	}

	getTypeExtensions = <Root, Context>(
		_module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$createCache: (options: StoreOptions<Root>) => {
				const mergedOptions = {
					...this.defaultOptions,
					...options,
				};
				return this.store.createStoreAdapter<Root>(mergedOptions, type, 'hash');
			},
		};
	};

	getResolverExtensions = <Result, Root, Context, Args>(
		module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		const ref = new CacheRef<Result, Root, Args>(type, field);
		return {
			$cacheRef: ref,
			$cacheRevision: (revision: number) => {
				ref.setRevision(revision);
			},
			$cacheClear: (store: StoreAdapter<TypeGetter<Result>>, matcher?: QueryMatching<Args>) => {
				return store.deleteQueries(ref, matcher);
			},
			$useCache: (store: StoreAdapter<TypeGetter<Result>>, options: MiddlewareOptions<Root>) => {
				const middleware = store.createMiddleware(ref, options);
				nameFunction(middleware, `${type}.${field}.$useCache`);
				module.mapper.addMiddleware(type, field, createMiddlewareAdapter(middleware));
			},
		};
	};
}
