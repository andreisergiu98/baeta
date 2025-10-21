// biome-ignore lint/suspicious/noExplicitAny: Accepts any generic function
export function nameFunction(fn: (...args: any[]) => any | undefined, name: string) {
	try {
		if (!fn || (fn.name && fn.name !== 'anonymous')) {
			return;
		}
		Object.defineProperty(fn, 'name', {
			value: name,
			configurable: true,
		});
	} catch {}
}
