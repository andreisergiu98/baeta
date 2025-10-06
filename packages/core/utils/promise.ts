export function isThenable<T>(value: T | PromiseLike<T>): value is PromiseLike<T> {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof (value as { then?: unknown }).then === 'function'
	);
}
