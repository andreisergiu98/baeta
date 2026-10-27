interface ResolversMapEntry {
	key: string;
	expected: string;
	actual: string;
}

export function assertResolversMap(
	label: string,
	expectedKeys: readonly string[],
	entries: readonly ResolversMapEntry[],
) {
	const keys = new Set(entries.map((entry) => entry.key));
	const expected = new Set(expectedKeys);
	const problems = [
		...expectedKeys.filter((key) => !keys.has(key)).map((key) => `missing "${key}"`),
		...entries
			.filter((entry) => !expected.has(entry.key))
			.map((entry) => `unexpected "${entry.key}"`),
		...entries
			.filter((entry) => expected.has(entry.key) && entry.actual !== entry.expected)
			.map((entry) => `"${entry.key}" was given the resolver for ${entry.actual}`),
	];
	if (problems.length > 0) {
		throw new Error(`Invalid ${label}: ${problems.join(', ')}.`);
	}
}
