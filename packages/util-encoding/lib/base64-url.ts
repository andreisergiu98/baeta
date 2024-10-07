import { decodeBase64, encodeBase64 } from './base64.ts';
import { decodeBinary, encodeBinary } from './text-encoder.ts';

export function encodeBase64Url(value: string): string {
	const utf8Bytes = encodeBinary(value);
	const base64Encoded = encodeBase64(String.fromCharCode(...utf8Bytes));
	return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createPadding(length: number): string {
	const padding = 4 - (length % 4);
	if (padding < 4) {
		return '='.repeat(padding);
	}
	return '';
}

export function decodeBase64Url(base64Url: string): string {
	const base64Encoded = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const padding = createPadding(base64Url.length);
	const base64WithPadding = base64Encoded + padding;

	const binaryString = decodeBase64(base64WithPadding);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	return decodeBinary(bytes);
}
