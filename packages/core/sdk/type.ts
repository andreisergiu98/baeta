import type { Extension } from './extension.ts';
import { TypeBuilder } from './type-builder.ts';
import type { FieldsBuildersMap, FieldsResolversMap } from './type-methods.ts';

export function createTypeBuilder<
	Source,
	Context,
	Info,
	ModuleName extends string,
	TypeName extends string,
	FieldBuilders extends FieldsBuildersMap<Source, Context, Info>,
	FieldResolvers extends FieldsResolversMap<Source, Context, Info>,
>(module: ModuleName, type: TypeName, builders: FieldBuilders, extensions: Array<Extension>) {
	return new TypeBuilder<
		Source,
		Context,
		Info,
		ModuleName,
		TypeName,
		FieldBuilders,
		FieldResolvers
	>({
		module,
		type,
		fieldBuilders: builders,
		extensions,
		store: new Map(),
		middlewares: [],
	}).toMethods();
}
