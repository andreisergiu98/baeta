import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode } from 'graphql';
import { createEmptyModuleBuilderContext } from './module-builder-context.ts';
import { ModuleBuilder } from './module-builder.ts';
import type { TypesBuildersMap, TypesResolversMap } from './module-methods.ts';

export function createModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = TypesBuildersMap<Context, Info>,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
>(name: string, typedef: DocumentNode, builders: TypesBuilders, defaultResolvers: IResolvers) {
	return new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
		name,
		typedef,
		typeBuilders: builders,
		defaultResolvers,
		context: createEmptyModuleBuilderContext(),
	}).toMethods();
}
