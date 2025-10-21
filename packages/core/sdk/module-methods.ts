import type { GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import type { ModuleBuilder } from './module-builder.ts';
import type { ModuleCompiler } from './module-compiler.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompilerFactory, TypeMethods } from './type-methods.ts';

export type TypesBuildersMap<Context, Info> = Record<
	string,
	TypeMethods<Any, Context, Info, Any, Any>
>;
export type TypesResolversMap<Context, Info> = Record<
	string,
	TypeCompilerFactory<Any, Context, Info> | GraphQLScalarType<Any, Any>
>;

export type ModuleMethods<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info>,
	TypesResolvers extends TypesResolversMap<Context, Info>,
> = TypesBuilders & {
	$schema: (fields: TypesResolvers) => ModuleCompilerFactory<Context, Info, TypesResolvers>;
	$use: (
		middleware: Middleware<unknown, unknown, Context, unknown, Info>,
	) => ModuleMethods<Context, Info, TypesBuilders, TypesResolvers>;
	$directive: (
		transformer: SchemaTransformer | SchemaTransformer[],
	) => ModuleMethods<Context, Info, TypesBuilders, TypesResolvers>;
} & BaetaExtensions.ModuleExtensions<
		Context,
		Info,
		ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>
	>;

export type ModuleCompilerFactory<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info>,
> = {
	__make: () => ModuleCompiler<Context, Info, TypesResolvers>;
};
