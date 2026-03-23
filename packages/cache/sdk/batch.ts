export async function doBatched<T>(
	items: T[],
	batchSize: number,
	fn: (batch: T[]) => Promise<void>,
): Promise<void> {
	for (let i = 0; i < items.length; i += batchSize) {
		const batch = items.slice(i, i + batchSize);
		await fn(batch);
	}
}
