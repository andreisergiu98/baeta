import {
	hasNodeBase64Requirements,
	nodeDecodeBase64Url,
	nodeEncodeBase64Url,
} from './base64-node.ts';
import { nativeDecodeBase64Url, nativeEncodeBase64Url } from './base64-url-native.ts';

function createBase64UrlEncoder() {
	const global = globalThis;

	if (hasNodeBase64Requirements(global)) {
		return {
			encodeBase64Url: (value: string): string => nodeEncodeBase64Url(global, value),
			decodeBase64Url: (value: string): string => nodeDecodeBase64Url(global, value),
		};
	}

	return {
		encodeBase64Url: (value: string): string => nativeEncodeBase64Url(value),
		decodeBase64Url: (value: string): string => nativeDecodeBase64Url(value),
	};
}

export const { encodeBase64Url, decodeBase64Url } = createBase64UrlEncoder();
