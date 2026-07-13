export function listen<T>(topic: string, payload?: T | T[]): AsyncIterable<T> {
	const marker = {
		topic,
		payloads: payload ? (Array.isArray(payload) ? payload : [payload]) : [],
		[Symbol.asyncIterator](): AsyncIterator<T> {
			throw new Error('Stateless subscription topic markers cannot be iterated.');
		},
	};
	return marker as AsyncIterable<T>;
}
