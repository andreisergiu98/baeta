import { isThenable } from './promise.ts';

export function lift<R, U>(result: R | PromiseLike<R>, fn: (x: R) => U | PromiseLike<U>) {
	if (isThenable(result)) {
		return result.then((res) => fn(res)) as PromiseLike<U>;
	}
	return fn(result) as U;
}
