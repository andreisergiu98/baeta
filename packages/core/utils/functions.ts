// biome-ignore lint/suspicious/noExplicitAny: Accepts any generic function
export function nameFunction(fn: (...args: any[]) => any | undefined, name: string) {
	if (!fn) {
		return;
	}

	if (fn.name !== '') {
		return;
	}

	Object.defineProperty(fn, 'name', {
		value: name,
	});
}
