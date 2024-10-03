export interface ContextStoreOptions {
	lazy?: boolean;
}

export interface ContextStoreValue<T> {
	isLoaded: boolean;
	result?: Promise<T>;
	load: () => Promise<T>;
}

export function createContextStore<T, Context = unknown>(
	key: symbol,
	options?: ContextStoreOptions,
) {
	const { lazy = true } = options ?? {};

	const get = (ctx: Context): Promise<T> => {
		const item = (ctx as Record<symbol, ContextStoreValue<T> | undefined>)[key];

		if (item == null) {
			throw new Error('Context store not initialized');
		}

		if (item.isLoaded) {
			return item.result as Promise<T>;
		}

		item.result = item.load();
		item.isLoaded = true;

		return item.result;
	};

	const load = (_ctx: Context, loader: () => T | PromiseLike<T>) => {
		const ctx = _ctx as Record<symbol, ContextStoreValue<T> | undefined>;

		if (ctx[key] != null) {
			return;
		}

		const item: ContextStoreValue<T> = {
			load: async () => loader(),
			isLoaded: false,
		};

		if (lazy === false) {
			item.result = item.load();
			item.isLoaded = true;
		}

		ctx[key] = item;
	};

	return [get, load] as const;
}
