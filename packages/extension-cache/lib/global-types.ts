import { Middleware } from '@baeta/core';
import { ParentRef, StoreAdapter, StoreOptions } from './store-adapter';

export type TypeGetter<T> = NonNullable<T> extends Array<infer G> ? G : NonNullable<T>;

declare global {
  export namespace BaetaExtensions {
    export interface TypeExtensions<Root, Context> {
      $createCache: (options?: StoreOptions<Root>) => StoreAdapter<Root>;
    }

    export interface ResolverExtensions<Result, Root, Context, Args> {
      $cacheRef: string;
      $cacheMiddleware: (
        store: StoreAdapter<TypeGetter<Result>>,
      ) => Middleware<Result, Root, Context, Args>;
      $clearCache: (
        store: StoreAdapter<TypeGetter<Result>>,
        parentRef?: ParentRef,
        args?: Partial<Args>,
      ) => void;
    }
  }
}
