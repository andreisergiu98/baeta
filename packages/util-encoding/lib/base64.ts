import { hasNodeBase64Requirements, nodeDecodeBase64, nodeEncodeBase64 } from './base64-node.ts';
import { hasWebBase64Requirements, webDecodeBase64, webEncodeBase64 } from './base64-web.ts';

function createBase64Encoder() {
	const global = globalThis;

	if (hasNodeBase64Requirements(global)) {
		return {
			encodeBase64: (value: string): string => nodeEncodeBase64(global, value),
			decodeBase64: (value: string): string => nodeDecodeBase64(global, value),
		};
	}

	if (hasWebBase64Requirements(global)) {
		return {
			encodeBase64: (value: string): string => webEncodeBase64(global, value),
			decodeBase64: (value: string): string => webDecodeBase64(global, value),
		};
	}

	return {
		encodeBase64: (_value: string): string => {
			throw new Error('No base64 encoder available.');
		},
		decodeBase64: (_value: string): string => {
			throw new Error('No base64 decoder available.');
		},
	};
}

export const { encodeBase64, decodeBase64 } = createBase64Encoder();
