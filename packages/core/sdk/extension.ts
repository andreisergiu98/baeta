import { ResolverMapper } from './resolver-mapper';
import { SchemaTransformer } from './transformer';

export enum ExtensionVersion {
  V1,
}

export type Extensions = Extension[];

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

  getSubscriptionSubscribeExtensions<Iterator, Root, Context, Args>() {
    return {};
  }

  getSubscriptionResolveExtensions<Result, Root, Context, Args>() {
    return {};
  }

  getTransformers(): SchemaTransformer[] {
    return [];
  }

  build(): void {}

  setResolvers(mapper: ResolverMapper, typeFields: Record<string, string[]>): void {}

  registerMiddlewares(mapper: ResolverMapper, typeFields: Record<string, string[]>): void {}
}

export class ExtensionA extends Extension {
  getResolverExtensions<Result, Root, Context, Args>() {
    return {
      $auth: (root: Root, ctx: Context, args: Args) => {
        console.log('auth');
      },
    };
  }

  getTypeExtensions<Result, Context>() {
    return {
      $genericAuth: (result: Result) => {
        console.log('generic auth');
      },
    };
  }

  getModuleExtensions() {
    return {};
  }
}

export class ExtensionB extends Extension {
  getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
    return {
      $test: () => {
        console.log('test');
      },
    };
  }

  getTypeExtensions<Result, Context>(type: string) {
    return {
      $genericTest: (ctx: Context) => {
        console.log('generic test');
      },
    };
  }

  getModuleExtensions() {
    return {
      $fff: () => {
        console.log('fff');
      },
    };
  }
}

type Merge<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export function mergeExtensions<T, K>(items: T[], callback: (item: T) => K) {
  const list = items.map(callback);
  const reduced = list.reduce((acc, handler) => ({
    ...acc,
    ...handler,
  }));
  return reduced;
}

export function createExtensionManager<E extends Extension>(list: E[]): ExtensionManager<E> {
  return {
    getModuleExtensions: () => {
      return mergeExtensions(list, (ext) => ext.getModuleExtensions());
    },
    getTypeExtensions: (type: string) => {
      return mergeExtensions(list, (ext) => ext.getTypeExtensions(type));
    },
    getResolverExtensions: (type: string, field: string) => {
      return mergeExtensions(list, (ext) => ext.getResolverExtensions(type, field));
    },
  };
}

export interface ExtensionManager<E extends Extension> {
  getTypeExtensions: E['getTypeExtensions'];
  getModuleExtensions: E['getModuleExtensions'];
  getResolverExtensions: E['getResolverExtensions'];
}

const m = createExtensionManager([new ExtensionA(), new ExtensionB()]);
const p = m.getTypeExtensions('');
