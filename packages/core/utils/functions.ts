export function nameFunction(fn: Function | undefined, name: string) {
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

export function extendFunction<B extends Function, M extends {}>(fn: B, ext: M): B & M {
	const fnExtended = fn as B & M;
	const entries = Object.entries(ext);

	const properties: PropertyDescriptorMap = {};

	for (const [key, value] of entries) {
		properties[key] = { value };
	}

	Object.defineProperties(fnExtended, properties);

	return fnExtended;
}
