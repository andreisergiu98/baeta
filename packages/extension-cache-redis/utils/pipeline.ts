export function collectPipelineErrors(result: [error: Error | null, result: unknown | null][]) {
	const errors: Error[] = [];

	for (const [error] of result) {
		if (error) {
			errors.push(error);
		}
	}

	if (errors.length === 0) {
		return null;
	}

	const err = new Error(errors.map((error) => error.message).join('\n'));
	err.stack = errors.map((error) => error.stack).join('\n');
	return err;
}
