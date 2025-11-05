import sinon from 'sinon';

export { default } from 'ava';

export { sinon };
export * from 'ava';

declare function setTimeout(callback: () => void, ms: number): void;

export function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
