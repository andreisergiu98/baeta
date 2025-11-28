import { encodeBase64Url } from '@baeta/util-encoding';
import { flatten } from 'flat';
import {
	type GraphQLInputType,
	type GraphQLSchema,
	getNullableType,
	isEnumType,
	isInputObjectType,
	isListType,
	isObjectType,
	isScalarType,
} from 'graphql';
import type { ItemRef, ParentRef } from './ref.ts';

interface Wildcard {
	kind: 'WILDCARD';
	value: string;
}

interface EncodedValue {
	kind: 'ENCODED_VALUE';
	value: string;
}

export function encodeArgs(
	type: string,
	field: string,
	schema: GraphQLSchema,
	args?: Record<string, unknown>,
	wildcard?: Wildcard,
) {
	if (args == null) {
		return wildcard?.value || 'null';
	}

	const typeDef = schema.getType(type);

	if (typeDef == null) {
		throw new Error(`Type ${type} not found in schema`);
	}

	if (!isObjectType(typeDef)) {
		throw new Error(`Type ${type} is not an object type`);
	}

	const fieldDefinition = typeDef.getFields()[field];

	if (fieldDefinition == null) {
		throw new Error(`Field ${field} not found in type ${type}`);
	}

	const safeArgs: Record<string, unknown> = {};

	for (const argDefinition of fieldDefinition.args) {
		if (argDefinition.name in args) {
			safeArgs[argDefinition.name] = serializeGraphQLInput(
				argDefinition.type,
				args[argDefinition.name],
			);
		}
	}

	const flattened = flatten<Record<string, unknown>, Record<string, unknown>>(safeArgs);
	const entries: Array<[string, string]> = [];

	for (const key in flattened) {
		const value = flattened[key];
		const encodedKey = encodePropertyName(key);
		const encodedValue = encodeValue(value, wildcard);

		if (encodedValue.kind === 'ENCODED_VALUE') {
			entries.push([encodedKey, encodedValue.value]);
			continue;
		}

		if (encodedValue.kind === 'WILDCARD') {
			entries.push([encodedKey, encodedValue.value]);
			continue;
		}

		assertNever(encodedValue);
	}

	entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
	const pairs = entries.map(([key, value]) => `${key}#${value}`);
	const separator = wildcard?.value ?? ',';
	return pairs.join(separator);
}

export function encodeRef(value: ItemRef | ParentRef): string {
	if (value == null) {
		return 'null';
	}
	const stringValue = value.toString();
	if (isSafeString(stringValue)) {
		return `_${stringValue}`;
	}
	return `enc_${encodeBase64Url(stringValue)}`;
}

function makeEncodedValue(value: string): EncodedValue {
	return { kind: 'ENCODED_VALUE', value };
}

export function encodeValue(value: unknown, catchAll?: Wildcard): EncodedValue | Wildcard {
	if (value === null) {
		return makeEncodedValue('null');
	}

	if (value === '') {
		return makeEncodedValue('blank');
	}

	if (value === undefined) {
		return catchAll || makeEncodedValue('undefined');
	}

	if (value === '*') {
		return catchAll || makeEncodedValue('star');
	}

	const type = typeof value;

	switch (type) {
		case 'object':
			return encodeObject(value);
		case 'bigint':
		case 'string':
		case 'number':
		case 'boolean': {
			const str = value.toString();
			if (isSafeString(str)) {
				return makeEncodedValue(`_${str}`);
			}
			return makeEncodedValue(`enc_${encodeBase64Url(str)}`);
		}
		case 'function':
		case 'symbol':
		case 'undefined':
			throw new Error(`Unsupported type: ${type} for args serialization.`);
		default:
			assertNever(type);
			return type;
	}
}

export function encodePropertyName(value: string) {
	const key = value.replaceAll('.', '_');
	if (isSafeString(key)) {
		return `_${key}`;
	}
	return `enc_${encodeBase64Url(key)}`;
}

export function isSafeString(value: string) {
	return /^[a-z0-9_-]+$/i.test(value);
}

function encodeObject(value: unknown) {
	const serialized = JSON.stringify(value);
	if (isSafeString(serialized)) {
		return makeEncodedValue(`_${serialized}`);
	}
	return makeEncodedValue(`enc_${encodeBase64Url(serialized)}`);
}

function serializeGraphQLInput(inputType: GraphQLInputType, value: unknown): unknown {
	const type = getNullableType(inputType);

	if (value == null) {
		return null;
	}

	if (isListType(type)) {
		if (!Array.isArray(value)) {
			throw new Error(`Expected array, but got: ${typeof value}`);
		}
		return value.map((v) => serializeGraphQLInput(type.ofType, v));
	}

	if (isInputObjectType(type)) {
		if (typeof value !== 'object') {
			throw new Error(`Expected object, but got: ${typeof value}`);
		}

		const out: Record<string, any> = {};
		const fields = type.getFields();

		for (const name in fields) {
			const field = fields[name];
			if (name in value) {
				const inner = (value as Record<string, unknown>)[name];
				out[name] = serializeGraphQLInput(field.type, inner);
			}
		}

		return out;
	}

	if (isEnumType(type)) {
		return type.serialize(value);
	}

	if (isScalarType(type)) {
		return type.serialize(value);
	}

	assertNever(type);
	return type;
}

function assertNever(value: never): asserts value is never {
	throw new Error(
		`Expected never, but got: ${value}, this likely means outdated type guard. Please notify the maintainers.`,
	);
}
