export interface ContextStoreOptions {
  lazy?: boolean;
}

export interface ContextStoreValue<T> {
  isLoaded: boolean;
  result?: T | PromiseLike<T>;
  loader: () => T | PromiseLike<T>;
}

export function createContextStore<T, Context = unknown>(
  key: symbol,
  options?: ContextStoreOptions,
) {
  const { lazy = true } = options ?? {};

  const get = async (ctx: Context): Promise<T> => {
    const item = (ctx as Record<symbol, ContextStoreValue<T> | undefined>)[key];

    if (item == null) {
      throw new Error('Context store not initialized');
    }

    if (item.isLoaded) {
      return item.result as Promise<T>;
    }

    item.result = item.loader();
    item.isLoaded = true;

    return item.result;
  };

  const load = (_ctx: Context, loader: () => T | PromiseLike<T>) => {
    const ctx = _ctx as Record<symbol, ContextStoreValue<T> | undefined>;

    if (ctx[key] != null) {
      return;
    }

    const item: ContextStoreValue<T> = {
      loader,
      isLoaded: false,
    };

    if (lazy === false) {
      item.result = loader();
      item.isLoaded = true;
    }

    ctx[key] = item;
  };

  return [get, load] as const;
}
