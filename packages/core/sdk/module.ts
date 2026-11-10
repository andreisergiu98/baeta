import { createEmptyBuilderContext } from './builder-context.ts';
import { ModuleBuilder } from './module-builder.ts';
import type { TypesBuildersMap, TypesResolversMap } from './module-methods.ts';

export function createModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = TypesBuildersMap<Context, Info>,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
>(name: string, builders: TypesBuilders) {
	return new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
		name,
		typeBuilders: builders,
		context: createEmptyBuilderContext(),
	}).toMethods();
}
