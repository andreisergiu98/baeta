import { Base64 } from 'js-base64';

export function encodeBase64(value: string) {
	return Base64.encode(value);
}

export function decodeBase64(value: string) {
	if (!Base64.isValid(value)) {
		throw new Error('Invalid base64 input!');
	}
	return Base64.decode(value);
}
