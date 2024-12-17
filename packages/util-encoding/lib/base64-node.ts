type NodeGlobal = {
	Buffer: BufferConstructor;
};

type BufferEncoding = 'utf-8' | 'base64' | 'base64url';

interface BufferConstructor {
	from(str: string, encoding?: BufferEncoding): Buffer;
}

interface Buffer {
	toString(encoding?: BufferEncoding, start?: number, end?: number): string;
}

export function hasNodeBase64Requirements<T extends {}>(global: T): global is T & NodeGlobal {
	return 'Buffer' in global;
}

export function nodeEncodeBase64(global: NodeGlobal, value: string): string {
	return global.Buffer.from(value, 'utf-8').toString('base64');
}

export function nodeDecodeBase64(global: NodeGlobal, value: string): string {
	return global.Buffer.from(value, 'base64').toString('utf-8');
}

export function nodeEncodeBase64Url(global: NodeGlobal, value: string): string {
	return global.Buffer.from(value).toString('base64url');
}

export function nodeDecodeBase64Url(global: NodeGlobal, value: string): string {
	return global.Buffer.from(value, 'base64url').toString('utf-8');
}
