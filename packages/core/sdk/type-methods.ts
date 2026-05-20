import type { Middleware } from '../lib/middleware.ts';
import type { PluginId } from './app-plugin.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import type { SubscriptionField, SubscriptionMethods } from './subscription-methods.ts';
import type { makePluginSymbol, makeSymbol } from './symbols.ts';
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
> = FieldsBuilders & {
	$fields: (fields: FieldsResolvers) => TypeCompilerFactory<Source, Context, Info, FieldsResolvers>;
	$use: (
		input: TypeUseInput<Source, Context, Info>,
	) => TypeMethods<Source, Context, Info, FieldsBuilders, FieldsResolvers>;
};

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
	[makeSymbol]: () => TypeCompiler<Source, Context, Info, FieldsResolvers>;
};

export type TypeUsePlugin<Source, Context, Info> = {
	[makePluginSymbol]: (options: { type: string; kind: 'type' }) => {
		id: PluginId;
		middleware?: Middleware<unknown, Source, Context, unknown, Info>;
		meta?: Map<symbol, unknown>;
	};
};

export type TypeUseInput<Source, Context, Info> =
	| Middleware<unknown, Source, Context, unknown, Info>
	| TypeUsePlugin<Source, Context, Info>;
