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

// biome-ignore lint/suspicious/noExplicitAny: Accepts any generic function
export function extendFunction<B extends (...args: any[]) => any, M extends {}>(
	fn: B,
	ext: M,
): B & M {
	const fnExtended = fn as B & M;
	const entries = Object.entries(ext);

	const properties: PropertyDescriptorMap = {};

	for (const [key, value] of entries) {
		properties[key] = { value };
	}

	Object.defineProperties(fnExtended, properties);

	return fnExtended;
}
