import { makeErrorMessage } from '../sdk/errors.tsx';

type CancelableAsyncFn<T> = (isCancelled: () => boolean) => Promise<T>;

export function runAsync<T>(run: CancelableAsyncFn<T>, onError?: (error: unknown) => void) {
	let isCancelled = false;
	const handleError = (error: unknown) => {
		if (onError) return onError(error);
		console.error(makeErrorMessage('Unexpected error.'), error);
	};
	try {
		run(() => isCancelled).catch(handleError);
	} catch (error) {
		handleError(error);
	}
	const cancel = () => {
		isCancelled = true;
	};
	return cancel;
}
