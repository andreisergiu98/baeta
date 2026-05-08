import { z } from 'zod';

type JsonValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| JsonValue[]
	| { [k: string]: JsonValue };

export function buildLiteralSchema(value: JsonValue): z.ZodTypeAny {
	if (value === undefined) return z.undefined().optional();
	if (value === null) return z.null();

	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
		return z.literal(value);
	}

	if (Array.isArray(value)) {
		if (value.length === 0) return z.tuple([]);
		const items = value.map(buildLiteralSchema) as [z.ZodTypeAny, ...z.ZodTypeAny[]];
		return z.tuple(items);
	}

	const shape: Record<string, z.ZodTypeAny> = {};
	for (const [k, v] of Object.entries(value)) {
		shape[k] = buildLiteralSchema(v);
	}
	return z.object(shape).strict();
}
