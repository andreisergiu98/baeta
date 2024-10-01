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
		if (obj != null) {
			obj[key] = value;
		}
	};

	return { get, set };
}
