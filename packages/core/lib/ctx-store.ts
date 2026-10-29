import { isPromise } from '../utils/promise.ts';
import { logger } from './logger.ts';

/**
 * Configuration options for the context store.
 */
export interface ContextStoreOptions {
	/**
	 * Whether to load the value eagerly (immediately) or lazily (on first access).
	 * @defaultValue false
	 */
	eager?: boolean;
	/**
	 * Whether to warn when a loader is set on a context that already has one.
	 * The existing loader is always kept. Disable when setting the loader
	 * repeatedly is expected, e.g. from a middleware that runs per field.
	 * @defaultValue true
	 */
	warnOnDuplicateLoader?: boolean;
}

export type ContextStoreValue<T> =
	| {
			isLoaded: false;
			load: () => T | PromiseLike<T>;
	  }
	| LoadedContextStoreValue<T>;

type LoadedContextStoreValue<T> =
	| {
			isLoaded: true;
			isResolved: false;
			result: Promise<Awaited<T>>;
	  }
	| {
			isLoaded: true;
			isResolved: true;
			result: Promise<Awaited<T>>;
			value: Awaited<T>;
	  };

/**
 * Creates a context store for managing asynchronous values within the context object.
 * See https://baeta.io/docs/guides/context-store
 *
 * @param key - A unique symbol to identify the stored value in the context
 * @param options - Configuration options for the store
 * @returns A tuple containing get, setLoader and getMaybeSync functions for managing the stored value
 *
 * @example
 * ```typescript
 * // Create a store for user data
 * const userStoreKey = Symbol('userStore');
 * const [getUser, setUserLoader, getUserMaybeSync] = createContextStore<User>(userStoreKey);
 *
 * // Set the loader function after creating the context object
 * setUserLoader(ctx, async () => {
 *   return fetchUser(userId);
 * });
 *
 * // Later, retrieve the user in a resolver
 * const user = await getUser(ctx);
 *
 * // Or read the cached user synchronously, falling back to a promise while it loads
 * const nameOrPromise = mapMaybePromise(getUserMaybeSync(ctx), (user) => user.name);
 * ```
 */
export function createContextStore<Result, Context = unknown>(
	key: symbol,
	options?: ContextStoreOptions,
) {
	const load = (
		_ctx: Record<symbol, ContextStoreValue<Result> | undefined>,
		loader: () => Result | PromiseLike<Result>,
	): LoadedContextStoreValue<Result> => {
		const item = runLoader(loader);
		_ctx[key] = item;
		if (!item.isResolved) {
			item.result.then(
				(value) => {
					_ctx[key] = { isLoaded: true, isResolved: true, result: item.result, value };
				},
				() => {},
			);
		}
		return item;
	};

	const getLoaded = (ctx: Context) => {
		const _ctx = ctx as Record<symbol, ContextStoreValue<Result> | undefined>;
		const item = _ctx[key];
		if (item == null) {
			throw new Error('Context store not initialized');
		}
		if (item.isLoaded) {
			return item;
		}
		return load(_ctx, item.load);
	};

	const get = (ctx: Context): Promise<Result> => {
		return getLoaded(ctx).result;
	};

	const getMaybeSync = (ctx: Context): Result | Promise<Result> => {
		const item = getLoaded(ctx);
		return item.isResolved ? item.value : item.result;
	};

	const setLoader = (ctx: Context, loader: () => Result | PromiseLike<Result>) => {
		const _ctx = ctx as Record<symbol, ContextStoreValue<Result> | undefined>;

		if (_ctx[key] != null) {
			if (options?.warnOnDuplicateLoader !== false) {
				logger.warn({
					type: 'context-store',
					message: `Loader for context store ${String(key)} is already set. Keeping the existing one.`,
				});
			}
			return;
		}

		if (options?.eager) {
			load(_ctx, loader).result.catch((err) => {
				logger.debug({
					type: 'context-store-eager-load',
					message: `Eager loader for context store ${String(key)} failed.`,
					error: err,
				});
			});
		} else {
			_ctx[key] = {
				isLoaded: false,
				load: loader,
			};
		}
	};

	return [get, setLoader, getMaybeSync] as const;
}

/**
 * Creates a context store for managing asynchronous values within the context object.
 * See https://baeta.io/docs/guides/context-store
 *
 * @param key - A unique symbol to identify the stored value in the context
 * @param loader - A function that returns the value for the store
 * @param options - Configuration options for the store
 * @returns A tuple containing get, init and getMaybeSync functions for managing the stored value
 *
 * @example
 * ```typescript
 * // Create a store for user data
 * const userStoreKey = Symbol('userStore');
 * const [getUser, initUserStore] = createContextStoreWithLoader(userStoreKey, (userId: string) => { return fetchUser(userId); });
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
	const [get, setLoader, getMaybeSync] = createContextStore<Result, Context>(key, options);
	const init = (ctx: Context, ...args: Args) => {
		return setLoader(ctx, () => loader(ctx, ...args));
	};
	return [get, init, getMaybeSync] as const;
}

function runLoader<T>(fn: () => T | PromiseLike<T>): LoadedContextStoreValue<T> {
	let value: T | PromiseLike<T>;
	try {
		value = fn();
	} catch (err) {
		return { isLoaded: true, isResolved: false, result: Promise.reject(err) };
	}
	if (isPromise(value)) {
		return { isLoaded: true, isResolved: false, result: Promise.resolve(value) };
	}
	const resolved = value as Awaited<T>;
	return { isLoaded: true, isResolved: true, result: Promise.resolve(resolved), value: resolved };
}
