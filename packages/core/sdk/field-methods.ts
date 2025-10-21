import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import type { FieldBuilder } from './field-builder.ts';
import type { FieldCompiler } from './field-compiler.ts';

export type Field<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

export type FieldMethods<Result, Source, Context, Args, Info> = {
	use: (
		middleware: Middleware<Result, Source, Context, Args, Info>,
	) => FieldMethods<Result, Source, Context, Args, Info>;
	key: <K extends keyof Source>(key: K) => Field<Result, Source[K], Source, Context, Args, Info>;
	map: <T = Result>(
		resolver: Resolver<T, Source, Context, Args, Info>,
	) => Field<Result, T, Source, Context, Args, Info>;
	resolve: (
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) => Field<Result, Result, Source, Context, Args, Info>;
} & BaetaExtensions.FieldExtensions<
	Result,
	Source,
	Context,
	Args,
	Info,
	FieldBuilder<Result, Source, Context, Args, Info>
>;

export type FieldHelpers<Expected, Result, Source, Context, Args, Info> = {
	map: <T = Expected>(
		fn: (params: ResolverParams<Result, Context, Args, Info>) => T | PromiseLike<T>,
	) => Field<Expected, T, Source, Context, Args, Info>;
	resolve: (
		fn: (params: ResolverParams<Result, Context, Args, Info>) => Expected | PromiseLike<Expected>,
	) => Field<Expected, Expected, Source, Context, Args, Info>;
	key: <K extends keyof Result>(key: K) => Field<Expected, Result[K], Source, Context, Args, Info>;
	to: <T = Expected>(fn: (source: Result) => T) => Field<Expected, T, Source, Context, Args, Info>;
	withDefault: <T = Expected>(
		value: T,
	) => Field<Expected, T | NonNullable<Result>, Source, Context, Args, Info>;
	undefinedAsNull: () => Field<
		Expected,
		Result extends undefined ? NonNullable<Result> | null : Result,
		Source,
		Context,
		Args,
		Info
	>;
};

export type FieldWithMake<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
> & {
	__make: () => FieldCompiler<Expected, Source, Context, Args, Info>;
};
