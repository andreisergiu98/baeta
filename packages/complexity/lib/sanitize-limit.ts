export function sanitizeLimit(value: number | undefined, fallback: number): number {
	if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
		return fallback;
	}
	return value;
}
