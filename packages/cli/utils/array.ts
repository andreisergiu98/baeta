export function flattenArrays<T>(list: Array<T | Array<T>>) {
	return list.flatMap((item) => {
		if (Array.isArray(item)) {
			return item;
		}
		return [item];
	});
}
