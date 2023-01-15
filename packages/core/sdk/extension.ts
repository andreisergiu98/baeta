import { ResolverMapper } from './resolver-mapper';
import { SchemaTransformer } from './transformer';

declare global {
  export namespace BaetaExtensions {
    export interface ResolverExtensions<Result, Root, Context, Args> {}

    export interface TypeExtensions<Root, Context> {}

    export interface SubscriptionSubscribeExtensions<Root, Context, Args> {}

    export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {}

    export interface ModuleExtensions {}
  }
}

export enum ExtensionVersion {
  V1,
}

export type ExtensionFactory<E extends Extension> = () => E;

export class Extension {
  version = ExtensionVersion.V1;

  getModuleExtensions() {
    return {};
  }

  getTypeExtensions<Result, Context>(type: string) {
    return {};
  }

  getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
    return {};
  }

  getSubscriptionSubscribeExtensions<Iterator, Root, Context, Args>(field: string) {
    return {};
  }

  getSubscriptionResolveExtensions<Result, Root, Context, Args>(field: string) {
    return {};
  }

  getTransformers(): SchemaTransformer[] {
    return [];
  }

  build(mapper: ResolverMapper, typeFields: Record<string, string[]>): void {}
}

export function resolveExtensions<T>(list: Array<() => T>): T[] {
  return list.map((ext) => ext());
}

export function mergeExtensions<T, K extends Record<string, unknown>>(
  items: T[],
  callback: (item: T) => K
) {
  const list = items.map(callback);
  const reduced = list.reduce(
    (acc, handler) => ({
      ...acc,
      ...handler,
    }),
    {}
  );
  return reduced;
}

export function withExtensions<Core, Ext>(core: Core, ext: Ext) {
  return {
    ...ext,
    ...core,
  } as Ext & Core;
}
