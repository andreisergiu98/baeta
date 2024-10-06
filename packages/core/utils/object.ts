const bannedKeys = ['__proto__', 'constructor', 'prototype'];

function isValidKey(key: string | number) {
	return !bannedKeys.includes(key.toString());
}

function canUseObject(obj: unknown): obj is { [k: string | number]: unknown } {
	return obj != null;
}

function getValueAt(obj: unknown, key: string | number) {
	if (!canUseObject(obj)) {
		return null;
	}
	if (!isValidKey(key)) {
		return null;
	}
	return obj[key];
}

function setValueAt(obj: unknown, key: string | number, value: unknown) {
	if (!canUseObject(obj)) {
		return false;
	}
	if (!isValidKey(key)) {
		return false;
	}
	obj[key] = value;
	return true;
}

/**
 * A lens to get and set values in an object, that fails silently if the path does not exist.
 */
export function createObjectLens<T = unknown>(
	input: Record<string, unknown>,
	path: Array<string | number>,
) {
	let i = 0;
	let current: unknown = input;

	for (; i < path.length - 1; i++) {
		current = getValueAt(current, path[i]);
	}

	const get = () => {
		return getValueAt(current, path[i]) as T | null;
	};

	const set = (value: T) => {
		return setValueAt(current, path[i], value);
	};

	return { get, set };
}
