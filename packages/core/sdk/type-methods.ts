import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import type { SubscriptionField, SubscriptionMethods } from './subscription-methods.ts';
import type { TypeBuilder } from './type-builder.ts';
import type { TypeCompiler } from './type-compiler.ts';

export type FieldsBuildersMap<Source, Context, Info> = Record<
	string,
	| FieldMethods<Any, Source, Context, Any, Info>
	| SubscriptionMethods<Any, Source, Context, Any, Info>
>;

export type FieldsResolversMap<Source, Context, Info> = Record<
	string,
	| Field<Any, Any, Source, Context, Any, Info>
	| SubscriptionField<Any, Any, Source, Context, Any, Info>
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
} & BaetaExtensions.TypeExtensions<
	Source,
	Context,
	Info,
	TypeBuilder<Source, Context, Info, FieldsBuilders, FieldsResolvers>
> &
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
