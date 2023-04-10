export interface ContextStoreOptions {
  lazy?: boolean;
}

interface ContextStoreValue<T> {
  loader: () => T | PromiseLike<T>;
  promise?: T | PromiseLike<T>;
}

export function createContextStore<T, Context = unknown>(
  key: symbol,
  options?: ContextStoreOptions
) {
  const { lazy = true } = options ?? {};

  const get = (ctx: Context) => {
    const item = (ctx as Record<symbol, ContextStoreValue<T> | undefined>)[key];

    if (item == null) {
      throw new Error('Context store not initialized');
    }

    if (!item.promise) {
      item.promise = item.loader();
    }

    return item.promise;
  };

  const load = (_ctx: Context, loader: () => T | PromiseLike<T>) => {
    const ctx = _ctx as Record<symbol, ContextStoreValue<T> | undefined>;

    if (ctx[key] != null) {
      return;
    }

    const value: ContextStoreValue<T> = {
      loader,
    };

    if (!lazy) {
      value.promise = loader();
    }

    ctx[key] = value;
  };

  return [get, load] as const;
}
