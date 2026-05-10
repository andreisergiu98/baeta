import { FieldBuilder } from './field-builder.ts';
import type { Field, FieldWithMake } from './field-methods.ts';

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

export function makeField<Result, Expected, Source, Context, Args, Info>(
	field: Field<Result, Expected, Source, Context, Args, Info>,
) {
	return (field as FieldWithMake<Result, Expected, Source, Context, Args, Info>).__make();
}
