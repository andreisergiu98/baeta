/**
 * Configuration options for the context store.
 */
export interface ContextStoreOptions {
	/**
	 * Whether to load the value eagerly (immediately) or lazily (on first access).
	 * @defaultValue false
	 */
	eager?: boolean;
}

export type ContextStoreValue<T> =
	| {
			isLoaded: false;
			load: () => T | PromiseLike<T>;
	  }
	| {
			isLoaded: true;
			result: Promise<Awaited<T>>;
	  };

/**
 * Creates a context store for managing asynchronous values within the context object.
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
 * const [getUser, setUserLoader] = createContextStore<User>(userStoreKey, { lazy: true });
 *
 * // Set the loader function after creating the context object
 * setUserLoader(ctx, async () => {
 *   return fetchUser(userId);
 * });
 *
 * // Later, retrieve the user in a resolver
 * const user = await getUser(ctx);
 * ```
 */
export function createContextStore<Result, Context = unknown>(
	key: symbol,
	options?: ContextStoreOptions,
) {
	const { eager = false } = options ?? {};

	const get = (ctx: Context): Promise<Result> => {
		const _ctx = ctx as Record<symbol, ContextStoreValue<Result> | undefined>;
		const item = _ctx[key];

		if (item == null) {
			throw new Error('Context store not initialized');
		}

		if (item.isLoaded) {
			return item.result;
		}

		_ctx[key] = {
			isLoaded: true,
			result: loadAsync(item.load),
		};

		return _ctx[key].result;
	};

	const setLoader = (ctx: Context, loader: () => Result | PromiseLike<Result>) => {
		const _ctx = ctx as Record<symbol, ContextStoreValue<Result> | undefined>;

		if (_ctx[key] != null) {
			return;
		}

		if (eager) {
			_ctx[key] = {
				isLoaded: true,
				result: loadAsync(loader),
			};
		} else {
			_ctx[key] = {
				isLoaded: false,
				load: loader,
			};
		}
	};

	return [get, setLoader] as const;
}

/**
 * Creates a context store for managing asynchronous values within the context object.
 * See https://baeta.io/docs/guides/context-store
 *
 * @param key - A unique symbol to identify the stored value in the context
 * @param loader - A function that returns the value for the store
 * @param options - Configuration options for the store
 * @returns A tuple containing get and load functions for managing the stored value
 *
 * @example
 * ```typescript
 * // Create a store for user data
 * const userStoreKey = Symbol('userStore');
 * const [getUser, initUserStore] = createContextStoreWithLoader(userStoreKey, (userId: string) => { return fetchUser(userId); }, { lazy: true });
 *
 * // Initialize the store when you create the context
 * initUserStore(ctx, userId);
 *
 * // Later, retrieve the user in a resolver
 * const user = await getUser(ctx);
 * ```
 */
export function createContextStoreWithLoader<
	Result,
	Context = unknown,
	Args extends unknown[] = unknown[],
>(
	key: symbol,
	loader: (ctx: Context, ...args: Args) => Result | PromiseLike<Result>,
	options?: ContextStoreOptions,
) {
	const [get, setLoader] = createContextStore<Result, Context>(key, options);

	const init = (ctx: Context, ...args: Args) => {
		return setLoader(ctx, () => loader(ctx, ...args));
	};

	return [get, init] as const;
}

async function loadAsync<T>(fn: () => T | PromiseLike<T>): Promise<Awaited<T>> {
	return await fn();
}
