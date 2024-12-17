import { createBase64UrlTests } from './__test__/base64-url.ts';
import { createBase64Tests } from './__test__/base64.ts';
import {
	hasNodeBase64Requirements,
	nodeDecodeBase64,
	nodeDecodeBase64Url,
	nodeEncodeBase64,
	nodeEncodeBase64Url,
} from './base64-node.ts';

function encodeBase64(value: string): string {
	const global = globalThis;
	if (hasNodeBase64Requirements(global)) {
		return nodeEncodeBase64(global, value);
	}
	throw new Error('Cannot satisfy Node test suite');
}

function decodeBase64(value: string): string {
	const global = globalThis;
	if (hasNodeBase64Requirements(global)) {
		return nodeDecodeBase64(global, value);
	}
	throw new Error('Cannot satisfy Node test suite');
}

function encodeBase64Url(value: string): string {
	const global = globalThis;
	if (hasNodeBase64Requirements(global)) {
		return nodeEncodeBase64Url(global, value);
	}
	throw new Error('Cannot satisfy Node test suite');
}

function decodeBase64Url(value: string): string {
	const global = globalThis;
	if (hasNodeBase64Requirements(global)) {
		return nodeDecodeBase64Url(global, value);
	}
	throw new Error('Cannot satisfy Node test suite');
}

createBase64Tests(encodeBase64, decodeBase64);
createBase64UrlTests(encodeBase64Url, decodeBase64Url);
