export interface AbortSignalLike {
	readonly aborted: boolean;
	readonly reason?: unknown;
	addEventListener(type: 'abort', listener: () => void, options?: { once?: boolean }): void;
	removeEventListener(type: 'abort', listener: () => void): void;
}
