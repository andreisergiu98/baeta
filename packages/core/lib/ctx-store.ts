/**
 * Configuration options for the context store.
 */
export interface ContextStoreOptions {
	/**
	 * Whether to load the value lazily (on first access) or eagerly (immediately).
	 * @defaultValue true
	 */
	lazy?: boolean;
}

export interface ContextStoreValue<T> {
	isLoaded: boolean;
	result?: Promise<T>;
	load: () => Promise<T>;
}

/**
 * Creates a context store for managing asynchronous values within a context object.
 * See https://baeta.io/docs/guides/context-store
 *
 * @param key - A unique symbol to identify the stored value in the context
 * @param options - Configuration options for the store
 * @returns A tuple containing get and load functions for managing the stored value
 *
 * @example
 * ```typescript
 * // Create a store for user data
 * const userStoreKey = Symbol('userStore');
 * const [getUser, loadUser] = createContextStore<User>(userStoreKey, { lazy: true });
 *
 * // Initialize the store when you create the context
 * loadUser(ctx, async () => {
 *   return fetchUser(userId);
 * });
 *
 * // Later, retrieve the user in a resolver
 * const user = await getUser(ctx);
 * ```
 */
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
