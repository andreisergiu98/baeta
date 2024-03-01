import { Middleware } from '@baeta/core';
import { Extension } from '@baeta/core/sdk';
import { TypeGetter } from './global-types';
import { Store } from './store';
import { Options, ParentRef, StoreAdapter, StoreOptions } from './store-adapter';

export class CacheExtension extends Extension {
  constructor(
    private store: Store,
    private defaultOptions?: Options,
  ) {
    super();
  }

  getTypeExtensions = <Root, Context>(
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
    type: string,
    field: string,
  ): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
    const ref = `${type}.${field}`;
    return {
      $cacheRef: ref,
      $cacheMiddleware: (store: StoreAdapter<TypeGetter<Result>>) => {
        return store.createQueryMiddleware(ref) as Middleware<Result, Root, Context, Args>;
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
