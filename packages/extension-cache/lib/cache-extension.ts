import { Extension, type FieldBuilder, type TypeBuilder } from '@baeta/core/sdk';
import type { TypeGetter, UseCacheArgs } from './global-types.ts';
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import { CacheRef, type RefCompatibleRoot } from './ref.ts';
import type { Store } from './store.ts';
import type { CacheQueryMatcher, StoreAdapter } from './store-adapter.ts';
import type { DefaultStoreOptions, StoreOptions } from './store-options.ts';

const DEFAULT_TTL = 3600;

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {
			cacheExtension: CacheExtension;
		}
	}
}

export class CacheExtension extends Extension<never> {
	readonly stateKey = Symbol('cache-extension-state');
	private readonly store: Store;
	private readonly defaultOptions?: DefaultStoreOptions;
	constructor(store: Store, defaultOptions?: DefaultStoreOptions) {
		super();
		this.store = store;
		this.defaultOptions = defaultOptions;
	}

	getTypeExtensions<Source, Context, Info>(
		builder: TypeBuilder<Source, Context, Info>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info> {
		return {
			$createCache: (options: StoreOptions<Source>) => {
				return this.store.createStoreAdapter<Source>({
					options: {
						...options,
						ttl: options.ttl ?? this.defaultOptions?.ttl ?? DEFAULT_TTL,
					},
					type: builder.type,
					getSchema: () => this.getSchema(),
				});
			},
		};
	}

	getFieldExtensions<Result, Source, Context, Args, Info>(
		builder: FieldBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.FieldExtensions<Result, Source, Context, Args, Info> {
		const ref = new CacheRef<Result, Source, Args>(builder.type, builder.field);
		return {
			$cacheRef: ref,
			$cacheClear: async (
				store: StoreAdapter<TypeGetter<Result>>,
				matcher?: CacheQueryMatcher<Args>,
			) => {
				await store.deleteQueries(ref, matcher);
			},
			$useCache: (...args: UseCacheArgs<Result, Source>) => {
				const editable = builder.edit();
				const [store, options] = args;

				// Pleasing the compiler
				const middlewareArgs = [ref, options] as Source extends RefCompatibleRoot
					? [ref: CacheRef<Result, Source, Args>, options?: CacheMiddlewareOptions<Source>]
					: [ref: CacheRef<Result, Source, Args>, options: RequiredCacheMiddlewareOptions<Source>];

				const middleware = store.createMiddleware<Result, Source, Context, Args, Info>(
					...middlewareArgs,
				);
				editable.addMiddleware(middleware);
				return editable.commitToMethods();
			},
		};
	}
}
