import { createBase64Tests } from './__test__/base64.ts';
import { hasWebBase64Requirements, webDecodeBase64, webEncodeBase64 } from './base64-web.ts';

function encodeBase64(value: string): string {
	const global = globalThis;
	if (hasWebBase64Requirements(global)) {
		return webEncodeBase64(global, value);
	}
	throw new Error('Cannot satisfy Web test suite');
}

function decodeBase64(value: string): string {
	const global = globalThis;
	if (hasWebBase64Requirements(global)) {
		return webDecodeBase64(global, value);
	}
	throw new Error('Cannot satisfy Web test suite');
}

createBase64Tests(encodeBase64, decodeBase64);
