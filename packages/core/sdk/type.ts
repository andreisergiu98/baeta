import type { Extension } from './extension.ts';
import { TypeBuilder } from './type-builder.ts';
import type { FieldsBuildersMap, FieldsResolversMap } from './type-methods.ts';

export function createTypeBuilder<
	Source,
	Context,
	Info,
	FieldBuilders extends FieldsBuildersMap<Source, Context, Info>,
	FieldResolvers extends FieldsResolversMap<Source, Context, Info>,
>(type: string, builders: FieldBuilders, extensions: Array<Extension>) {
	return new TypeBuilder<Source, Context, Info, FieldBuilders, FieldResolvers>(
		type,
		builders,
		extensions,
		new Map(),
		[],
	).toMethods();
}
