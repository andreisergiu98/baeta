export function createObjectLens<T = unknown>(
	input: Record<string, unknown>,
	path: Array<string | number>,
) {
	let i = 0;
	let obj = input;

	for (; i < path.length - 1; i++) {
		if (obj == null) {
			break;
		}
		obj = obj[path[i]] as Record<string, unknown>;
	}

	const key = path[i];

	const get = (): T => {
		return obj?.[key] as T;
	};

	const set = (value: T) => {
		if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
			throw new Error(`Setting ${key} is not allowed to prevent prototype pollution.`);
		}

		if (obj != null) {
			obj[key] = value;
		}
	};

	return { get, set };
}
