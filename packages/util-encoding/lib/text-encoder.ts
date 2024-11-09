interface TextEncoder {
	encode(input?: string): Uint8Array;
}

interface TextDecoderOptions {
	label?: string;
}

declare const TextEncoder: {
	prototype: TextEncoder;
	new (): TextEncoder;
};

interface TextDecoder {
	decode(input?: Uint8Array, options?: TextDecoderOptions): string;
}

declare const TextDecoder: {
	prototype: TextDecoder;
	new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

export function encodeBinary(value: string): Uint8Array {
	return new TextEncoder().encode(value);
}

export function decodeBinary(value: Uint8Array): string {
	return new TextDecoder().decode(value);
}
