import { FieldBuilder } from './field-builder.ts';

export function createFieldBuilder<Result, Source, Context, Args, Info>(
	type: string,
	field: string,
) {
	return new FieldBuilder<Result, Source, Context, Args, Info>({
		type,
		field,
		metadata: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	}).toMethods();
}
