import { logger } from './logger.ts';

function isValidLimit(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function assertValidLimit(name: string, value: number | undefined): void {
	if (value == null) {
		return;
	}
	if (!isValidLimit(value)) {
		throw new Error(
			`Invalid complexity option '${name}': ${value}. Expected a finite number greater than or equal to 0.`,
		);
	}
}

export function sanitizeLimit(value: number | undefined, fallback: number, name: string): number {
	if (value == null) {
		return fallback;
	}
	if (!isValidLimit(value)) {
		logger.warn({
			type: 'invalid-limit',
			message: `Invalid complexity limit '${name}': ${value}. Falling back to ${fallback}.`,
		});
		return fallback;
	}
	return value;
}
