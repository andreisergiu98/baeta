import { Base64 } from 'js-base64';

export function encodeBase64Url(value: string) {
	return Base64.encode(value, true);
}

export function decodeBase64Url(value: string) {
	return Base64.decode(value);
}
