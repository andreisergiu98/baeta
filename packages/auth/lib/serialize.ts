import stringify from 'safe-stable-stringify';

export type SerializableScope =
	| string
	| number
	| boolean
	| null
	| SerializableScope[]
	| { [key: string]: SerializableScope };

export function createScopeCacheKey(params: SerializableScope): string {
	return stringify(params);
}

export function canSafelySerialize(
	value: any,
	path: WeakSet<object> = new WeakSet(),
): value is SerializableScope {
	if (Array.isArray(value)) {
		if (path.has(value)) return false;
		path.add(value);
		const ok = value.every((v) => canSafelySerialize(v, path));
		path.delete(value);
		return ok;
	}
	if (value && typeof value === 'object') {
		const proto = Object.getPrototypeOf(value);
		if (proto !== null && proto !== Object.prototype) return false;
		if (path.has(value)) return false;
		path.add(value);
		const ok = Object.values(value).every((v) => canSafelySerialize(v, path));
		path.delete(value);
		return ok;
	}
	return isSerializablePrimitive(value);
}

export function isSerializablePrimitive(value: any): value is string | number | boolean | null {
	return (
		value === null ||
		typeof value === 'boolean' ||
		typeof value === 'number' ||
		typeof value === 'string'
	);
}
