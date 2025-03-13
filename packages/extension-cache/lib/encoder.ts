import { encodeBase64Url } from '@baeta/util-encoding';
import { flatten } from 'flat';
import type { Serializer } from './serializer.ts';

export function encodeArgs(
	serializer: Serializer,
	args: Record<string, unknown> = {},
	catchAll?: string,
) {
	const entries: Array<[string, string]> = [];
	const flattened = flatten<Record<string, unknown>, Record<string, unknown>>(args);

	for (const key in flattened) {
		const value = flattened[key];
		const encodedKey = encodePropertyName(key);
		const encodedValue = encodeValue(serializer, value, catchAll);

		if (encodedValue) {
			entries.push([encodedKey, encodedValue]);
		}
	}

	entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
	const pairs = entries.map(([key, value]) => `${key}#${value}`);
	return pairs.join(catchAll ?? ',');
}

export function encodeValue(serializer: Serializer, value: unknown, catchAll?: string) {
	if (value === null) {
		return 'null';
	}

	if (value === undefined) {
		return catchAll ? null : 'null';
	}

	if (value === '') {
		return catchAll ? null : 'empty';
	}

	if (value === '*') {
		return catchAll ? catchAll : 'star';
	}

	const type = typeof value;

	if (type === 'object') {
		return encodeObject(serializer, value, catchAll);
	}

	const supported = ['string', 'number', 'boolean', 'bigint'];
	const isSupported = supported.includes(type);

	if (!isSupported) {
		return catchAll ? null : 'unsupported';
	}

	const str = value.toString();

	if (isSafeString(str)) {
		return `_${value}`;
	}

	return `enc_${encodeBase64Url(str)}`;
}

export function encodePropertyName(value: string) {
	const key = value.replaceAll('.', '_');
	if (isSafeString(key)) {
		return `_${key}`;
	}
	return `enc_${encodeBase64Url(key)}`;
}

export function isSafeString(value: string) {
	return /^[a-zA-Z0-9_-]+$/i.test(value);
}

function encodeObject(serializer: Serializer, value: unknown, catchAll?: string) {
	try {
		if (value instanceof Date) {
			return `_${value.getTime()}`;
		}
		const serialized = serializer.serialize(value).json;
		return `enc_${encodeBase64Url(JSON.stringify(serialized))}`;
	} catch {
		return catchAll ? null : 'unsupported';
	}
}
