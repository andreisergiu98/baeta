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
