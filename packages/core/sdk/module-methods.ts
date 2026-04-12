import type { GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { ModuleCompiler } from './module-compiler.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompilerFactory, TypeMethods } from './type-methods.ts';

export type TypesBuildersMap<Context, Info> = Record<
	string,
	TypeMethods<any, Context, Info, string, string, any, any>
>;
export type TypesResolversMap<Context, Info> = Record<
	string,
	TypeCompilerFactory<any, Context, Info, string> | GraphQLScalarType<any, any>
>;

export type ModuleMethods<
	Context,
	Info,
	ModuleName extends string,
	TypesBuilders extends TypesBuildersMap<Context, Info> = TypesBuildersMap<Context, Info>,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> = TypesBuilders & {
	$schema: (fields: TypesResolvers) => ModuleCompilerFactory<Context, Info, TypesResolvers>;
	$use: (
		middleware: Middleware<unknown, unknown, Context, unknown, Info>,
	) => ModuleMethods<Context, Info, ModuleName, TypesBuilders, TypesResolvers>;
	$directive: (
		transformer: SchemaTransformer | SchemaTransformer[],
	) => ModuleMethods<Context, Info, ModuleName, TypesBuilders, TypesResolvers>;
} & BaetaExtensions.ModuleExtensions<Context, Info, ModuleName>;

export type ModuleCompilerFactory<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info>,
> = {
	__make: () => ModuleCompiler<Context, Info, TypesResolvers>;
};
