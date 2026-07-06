import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import type { UsePlugin } from './app-plugin.ts';
import type { FieldCompiler } from './field-compiler.ts';
import type { makeSymbol } from './symbols.ts';

export type Field<Expected, Result, Source, Context, Args, Info> = {
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
} & {
	[makeSymbol]: () => FieldCompiler<Expected, Source, Context, Args, Info>;
};

export type FieldMethods<Result, Source, Context, Args, Info> = {
	$use: (
		input: FieldUseInput<Result, Source, Context, Args, Info>,
	) => FieldMethods<Result, Source, Context, Args, Info>;
	key: <K extends keyof Source>(key: K) => Field<Result, Source[K], Source, Context, Args, Info>;
	map: <T = Result>(
		resolver: Resolver<T, Source, Context, Args, Info>,
	) => Field<Result, T, Source, Context, Args, Info>;
	resolve: (
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) => Field<Result, Result, Source, Context, Args, Info>;
};

export type FieldUsePlugin<Result, Source, Context, Args, Info, State = unknown> = UsePlugin<
	'field',
	Result,
	Source,
	Context,
	Args,
	Info,
	{ type: string; field: string },
	State
>;

export type FieldUseInput<Result, Source, Context, Args, Info> =
	| Middleware<Result, Source, Context, Args, Info>
	| FieldUsePlugin<Result, Source, Context, Args, Info>;
