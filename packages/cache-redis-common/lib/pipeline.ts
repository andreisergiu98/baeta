export function assertNoPipelineErrors(
	result: [error: Error | null, result: unknown][] | null,
	clientName = 'Redis',
): asserts result is [error: null, result: unknown][] {
	if (result == null) {
		throw new Error(`Unexpected null result from ${clientName} pipeline`);
	}
	const errors: Error[] = [];
	for (const [error] of result) {
		if (error) {
			errors.push(error);
		}
	}
	if (errors.length > 0) {
		throw new AggregateError(errors, `One or more ${clientName} operations failed`);
	}
}

export interface PipelineOptions<Pipeline, Result, Items> {
	makePipeline: () => Pipeline;
	addCommand: (pipeline: Pipeline, item: Items) => void;
	executePipeline: (pipeline: Pipeline) => Promise<Result[]>;
	estimateSize: (item: Items) => number;
	items: Items[];
	maxBatchBytes: number;
	maxBatchCount: number;
	estimateOverheadBytes?: number;
}

export async function batchPipeline<Pipeline, Result, Items>({
	makePipeline,
	addCommand,
	executePipeline,
	estimateSize,
	items,
	maxBatchBytes,
	maxBatchCount,
	estimateOverheadBytes = 100,
}: PipelineOptions<Pipeline, Result, Items>): Promise<unknown[]> {
	let pipeline = makePipeline();
	let currentSize = 0;
	let currentCount = 0;
	const results: unknown[] = [];

	for (const item of items) {
		const size = estimateSize(item) + estimateOverheadBytes;
		if (currentCount > 0 && (currentSize + size > maxBatchBytes || currentCount >= maxBatchCount)) {
			const batchResults = await executePipeline(pipeline);
			results.push(...batchResults);
			pipeline = makePipeline();
			currentSize = 0;
			currentCount = 0;
		}
		addCommand(pipeline, item);
		currentSize += size;
		currentCount++;
	}

	if (currentCount > 0) {
		const batchResults = await executePipeline(pipeline);
		results.push(...batchResults);
	}

	return results;
}
