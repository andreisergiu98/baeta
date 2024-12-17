import { decodeBase64, encodeBase64 } from './base64.ts';

export function nativeEncodeBase64Url(value: string): string {
	return encodeBase64(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function nativeDecodeBase64Url(base64Url: string): string {
	const base64Encoded = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const requiredPadding = 4 - (base64Encoded.length % 4);
	const padding = requiredPadding < 4 ? '='.repeat(requiredPadding) : '';
	return decodeBase64(base64Encoded + padding);
}
