import type { Middleware } from '../lib/middleware.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import type { SubscriptionField, SubscriptionMethods } from './subscription-methods.ts';
import type { TypeCompiler } from './type-compiler.ts';

export type FieldsBuildersMap<Source, Context, Info> = Record<
	string,
	| FieldMethods<any, Source, Context, any, Info>
	| SubscriptionMethods<any, Source, Context, any, Info>
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
	$fields: (fields: FieldsResolvers) => TypeCompilerFactory<Source, Context, Info, FieldsResolvers>;
	$use: (
		middleware: Middleware<unknown, Source, Context, unknown, Info>,
	) => TypeMethods<Source, Context, Info, FieldsBuilders, FieldsResolvers>;
} & BaetaExtensions.TypeExtensions<Source, Context, Info> &
	FieldsBuilders;

export type TypeCompilerFactory<
	Source,
	Context,
	Info,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = FieldsResolversMap<
		Source,
		Context,
		Info
	>,
> = {
	__make: () => TypeCompiler<Source, Context, Info, FieldsResolvers>;
};
