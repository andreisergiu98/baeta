import ava from 'ava';
import sinon from 'sinon';

export { sinon };
export * from 'ava';
export default ava;

declare function setTimeout(callback: () => void, ms: number): void;

export function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
