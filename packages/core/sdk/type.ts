import { TypeBuilder } from './type-builder.ts';
import type { FieldsBuildersMap, FieldsResolversMap } from './type-methods.ts';

export function createTypeBuilder<
	Source,
	Context,
	Info,
	FieldBuilders extends FieldsBuildersMap<Source, Context, Info>,
	FieldResolvers extends FieldsResolversMap<Source, Context, Info>,
>(type: string, builders: FieldBuilders) {
	return new TypeBuilder<Source, Context, Info, FieldBuilders, FieldResolvers>({
		type,
		fieldBuilders: builders,
		state: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	}).toMethods();
}
