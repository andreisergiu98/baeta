import type { GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { PluginId } from './app-plugin.ts';
import type { ModuleCompiler } from './module-compiler.ts';
import type { makePluginSymbol, makeSymbol } from './symbols.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompilerFactory, TypeMethods } from './type-methods.ts';

export type TypesBuildersMap<Context, Info> = Record<
	string,
	TypeMethods<any, Context, Info, any, any>
>;
export type TypesResolversMap<Context, Info> = Record<
	string,
	TypeCompilerFactory<any, Context, Info> | GraphQLScalarType<any, any>
>;

export type ModuleMethods<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = TypesBuildersMap<Context, Info>,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> = TypesBuilders & {
	$schema: (fields: TypesResolvers) => ModuleCompilerFactory<Context, Info, TypesResolvers>;
	$use: (
		input: ModuleUseInput<Context, Info>,
	) => ModuleMethods<Context, Info, TypesBuilders, TypesResolvers>;
	$directive: (
		transformer: SchemaTransformer | SchemaTransformer[],
	) => ModuleMethods<Context, Info, TypesBuilders, TypesResolvers>;
};

export type ModuleCompilerFactory<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info>,
> = {
	[makeSymbol]: () => ModuleCompiler<Context, Info, TypesResolvers>;
};

export type ModuleUsePlugin<Context, Info> = {
	[makePluginSymbol]: (options: { name: string; kind: 'module' }) => {
		id: PluginId;
		middleware?: Middleware<unknown, unknown, Context, unknown, Info>;
		meta?: Map<symbol, unknown>;
	};
};

export type ModuleUseInput<Context, Info> =
	| Middleware<unknown, unknown, Context, unknown, Info>
	| ModuleUsePlugin<Context, Info>;
