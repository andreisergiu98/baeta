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
