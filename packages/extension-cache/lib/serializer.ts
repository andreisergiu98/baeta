import { SuperJSON } from 'superjson';

// biome-ignore lint/suspicious/noExplicitAny: allow any
export type SerializerAny = any;

export declare type SerializerClass = {
	new (...args: SerializerAny[]): SerializerAny;
};

export declare type SerializerValue = SerializerPrimitive | SerializerArray | SerializerObject;

export declare type SerializerPrimitive = string | number | boolean | undefined | null;

export interface SerializerArray extends Array<SerializerValue> {}

export interface SerializerObject {
	[key: string]: SerializerValue;
}

export type CustomTransformer<Input, Output extends SerializerValue> = {
	kind: 'custom';
	name: string;
	isApplicable: (value: Input) => value is Input;
	serialize: (value: Input) => Output;
	deserialize: (value: Output) => Input;
};

export type ClassTransformer = {
	kind: 'class';
	class: SerializerClass;
	identifier?: string;
	allowProps?: string[];
};

export type SymbolTransformer = {
	kind: 'symbol';
	symbol: symbol;
	identifier?: string;
};

export type SerializerTransformer<
	Input = SerializerAny,
	Output extends SerializerValue = SerializerAny,
> = CustomTransformer<Input, Output> | ClassTransformer | SymbolTransformer;

export interface SerializerResult {
	json: SerializerAny;
	meta?: {
		values?: SerializerAny;
		referentialEqualities?: SerializerAny;
	};
}

export interface Serializer {
	serialize(object: SerializerAny): SerializerResult;
	deserialize<T = unknown>(payload: SerializerResult): T;
	stringify(object: SerializerAny): string;
	parse<T = unknown>(string: string): T;
}

export function createSerializer<
	Input = SerializerAny,
	Output extends SerializerValue = SerializerAny,
>(serializers?: SerializerTransformer<Input, Output>[]): Serializer {
	const superjson = new SuperJSON();

	for (const serializer of serializers ?? []) {
		if (serializer.kind === 'custom') {
			const { name, kind, ...handlers } = serializer;
			superjson.registerCustom(handlers, serializer.name);
		}

		if (serializer.kind === 'class') {
			superjson.registerClass(serializer.class, {
				identifier: serializer.identifier,
				allowProps: serializer.allowProps,
			});
		}

		if (serializer.kind === 'symbol') {
			superjson.registerSymbol(serializer.symbol, serializer.identifier);
		}
	}

	return superjson;
}
