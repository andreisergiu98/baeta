type WebGlobal = {
	atob: (decodedString: string) => string;
	btoa: (encodedString: string) => string;
	TextEncoder: new () => {
		encode(input?: string): Uint8Array;
	};
	TextDecoder: new () => {
		decode(input?: Uint8Array): string;
	};
};

export function hasWebBase64Requirements<T extends {}>(global: T): global is T & WebGlobal {
	return 'btoa' in global && 'atob' in global && 'TextEncoder' in global && 'TextDecoder' in global;
}

export function webEncodeBase64(global: WebGlobal, value: string): string {
	const utf8Bytes = new global.TextEncoder().encode(value);
	return global.btoa(String.fromCharCode(...utf8Bytes));
}

export function webDecodeBase64(global: WebGlobal, value: string): string {
	const binaryString = global.atob(value);
	const utf8Bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		utf8Bytes[i] = binaryString.charCodeAt(i);
	}
	return new global.TextDecoder().decode(utf8Bytes);
}
