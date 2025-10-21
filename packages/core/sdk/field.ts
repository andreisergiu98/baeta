import type { Extension } from './extension.ts';
import { FieldBuilder } from './field-builder.ts';
import type { Field, FieldWithMake } from './field-methods.ts';

export function createFieldBuilder<Result, Source, Context, Args, Info>(
	type: string,
	field: string,
	extensions: Array<Extension>,
) {
	return new FieldBuilder<Result, Source, Context, Args, Info>(
		type,
		field,
		extensions,
		new Map(),
		[],
	).toMethods();
}

export function makeField<Result, Expected, Source, Context, Args, Info>(
	field: Field<Result, Expected, Source, Context, Args, Info>,
) {
	return (field as FieldWithMake<Result, Expected, Source, Context, Args, Info>).__make();
}
