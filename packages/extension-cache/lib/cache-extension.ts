import { Extension, type FieldBuilder, type TypeBuilder } from '@baeta/core/sdk';
import type { CreateCacheArgs, TypeGetter, UseCacheArgs } from './global-types.ts';
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import { CacheRef, type RefCompatibleRoot } from './ref.ts';
import { createSerializer, type Serializer, type SerializerTransformer } from './serializer.ts';
import type { Store } from './store.ts';
import type { CacheQueryMatching, StoreAdapter } from './store-adapter.ts';
import type { DefaultStoreOptions } from './store-options.ts';

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {
			cacheExtension: CacheExtension;
		}
	}
}

export class CacheExtension extends Extension<never> {
	readonly stateKey = Symbol('cache-extension-state');
	private serializer: Serializer;
	private store: Store;
	private defaultOptions?: DefaultStoreOptions;
	constructor(
		store: Store,
		defaultOptions?: DefaultStoreOptions,
		transformers: SerializerTransformer[] = [],
	) {
		super();
		this.store = store;
		this.defaultOptions = defaultOptions;
		this.serializer = createSerializer(transformers);
	}

	getTypeExtensions = <Source, Context, Info>(
		builder: TypeBuilder<Source, Context, Info>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info, TypeBuilder<Source, Context, Info>> => {
		return {
			$createCache: (...args: CreateCacheArgs<Source>) => {
				const [options] = args;
				const mergedOptions = {
					ttl: 3600,
					...this.defaultOptions,
					...options,
				};
				return this.store.createStoreAdapter<Source>(
					this.serializer,
					mergedOptions,
					builder.type,
					'0',
				);
			},
		};
	};

	getResolverExtensions = <Result, Source, Context, Args, Info>(
		builder: FieldBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.FieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		FieldBuilder<Result, Source, Context, Args, Info>
	> => {
		const ref = new CacheRef<Result, Source, Args>(builder.type, builder.field);
		return {
			$cacheRef: ref,
			$cacheClear: (
				store: StoreAdapter<TypeGetter<Result>>,
				matcher?: CacheQueryMatching<Args>,
			) => {
				return store.deleteQueries(ref, matcher);
			},
			$useCache: (...args: UseCacheArgs<Result, Source>) => {
				const editable = builder.edit();
				const [store, options] = args;
				// We try to please the compiler
				const middlewareArgs = options as Source extends RefCompatibleRoot
					? [options?: CacheMiddlewareOptions<Source>]
					: [options: RequiredCacheMiddlewareOptions<Source>];

				const middleware = store.createMiddleware<Result, Source, Context, Args, Info>(
					ref,
					...middlewareArgs,
				);
				editable.addMiddleware(middleware);
				return editable.commitToMethods();
			},
		};
	};
}
