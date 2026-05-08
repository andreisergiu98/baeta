export function nameFunction(fn: (...args: any[]) => any, name: string) {
	try {
		if (!fn || (fn.name && fn.name !== 'anonymous')) {
			return;
		}
		Object.defineProperty(fn, 'name', {
			value: name,
			configurable: true,
		});
	} catch {
		// do nothing
	}
}
