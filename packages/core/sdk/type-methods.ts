import type { Middleware } from '../lib/middleware.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import type { SubscriptionField, SubscriptionMethods } from './subscription-methods.ts';
import type { TypeCompiler } from './type-compiler.ts';

export type FieldsBuildersMap<Source, Context, Info> = Record<
	string,
	| FieldMethods<any, Source, Context, any, Info, string, string, string>
	| SubscriptionMethods<any, Source, Context, any, Info, string, string>
>;

export type FieldsResolversMap<Source, Context, Info> = Record<
	string,
	| Field<any, any, Source, Context, any, Info>
	| SubscriptionField<any, any, Source, Context, any, Info>
>;
export type TypeMethods<
	Source,
	Context,
	Info,
	ModuleName extends string,
	TypeName extends string,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = FieldsBuildersMap<
		Source,
		Context,
		Info
	>,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = FieldsResolversMap<
		Source,
		Context,
		Info
	>,
> = {
	$fields: (
		fields: FieldsResolvers,
	) => TypeCompilerFactory<Source, Context, Info, TypeName, FieldsResolvers>;
	$use: (
		middleware: Middleware<unknown, Source, Context, unknown, Info>,
	) => TypeMethods<Source, Context, Info, ModuleName, TypeName, FieldsBuilders, FieldsResolvers>;
} & BaetaExtensions.TypeExtensions<Source, Context, Info, ModuleName, TypeName> &
	FieldsBuilders;

export type TypeCompilerFactory<
	Source,
	Context,
	Info,
	TypeName extends string,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = FieldsResolversMap<
		Source,
		Context,
		Info
	>,
> = {
	__make: () => TypeCompiler<Source, Context, Info, TypeName, FieldsResolvers>;
};
