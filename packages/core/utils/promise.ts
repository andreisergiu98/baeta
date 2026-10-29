export function isPromise<T>(value: T | PromiseLike<T>): value is PromiseLike<T> {
	return (
		value != null &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof (value as { then?: unknown }).then === 'function'
	);
}

export function mapMaybePromise<R, U>(
	result: R | PromiseLike<R>,
	fn: (x: R) => U | PromiseLike<U>,
) {
	if (!isPromise(result)) {
		return fn(result);
	}
	return result.then(fn);
}

export function thenMaybePromise<R, U>(
	run: () => R | PromiseLike<R>,
	thenFn: (x: R) => U | PromiseLike<U>,
	catchFn: (error: unknown) => U | PromiseLike<U>,
): U | PromiseLike<U> {
	try {
		const result = run();
		if (isPromise(result)) {
			return result.then(thenFn).then(undefined, catchFn);
		}
		const output = thenFn(result);
		return isPromise(output) ? output.then(undefined, catchFn) : output;
	} catch (error) {
		return catchFn(error);
	}
}

export function mapMaybePromiseAll<T, U>(
	items: readonly T[],
	fn: (item: T) => U | PromiseLike<U>,
): U[] | Promise<U[]> {
	const results = items.map((item) => runCatching(fn, item));
	if (results.some((result) => isPromise(result))) {
		return Promise.all(results);
	}
	return results as U[];
}

export function mapMaybePromiseAny<T, U>(
	items: readonly T[],
	fn: (item: T) => U | PromiseLike<U>,
): U | Promise<U> {
	const results = items.map((item) => runCatching(fn, item));
	const pending = results.filter((result) => isPromise(result));
	if (pending.length === results.length) {
		return Promise.any(pending);
	}
	for (const result of pending) {
		result.then(undefined, () => {});
	}
	return results.find((result) => !isPromise(result)) as U;
}

function runCatching<T, U>(fn: (item: T) => U | PromiseLike<U>, item: T): U | PromiseLike<U> {
	try {
		return fn(item);
	} catch (error) {
		return Promise.reject(error);
	}
}
