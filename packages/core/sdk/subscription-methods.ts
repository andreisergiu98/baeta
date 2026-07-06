import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import type { UsePlugin } from './app-plugin.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';
import type { makeSymbol } from './symbols.ts';

export type Subscription<Result = unknown> = AsyncIterable<Result>;

export type SubscriptionField<Expected, Result, ParentSource, Context, Args, Info, Source = any> = {
	map: <T = Expected>(
		fn: (params: ResolverParams<Result, Context, Args, Info>) => T | PromiseLike<T>,
	) => SubscriptionField<Expected, T, ParentSource, Context, Args, Info, Source>;
	resolve: (
		fn: (params: ResolverParams<Result, Context, Args, Info>) => Expected | PromiseLike<Expected>,
	) => SubscriptionField<Expected, Expected, ParentSource, Context, Args, Info, Source>;
	key: <K extends keyof Result>(
		key: K,
	) => SubscriptionField<Expected, Result[K], ParentSource, Context, Args, Info, Source>;
	to: <T = Expected>(
		fn: (source: Result) => T,
	) => SubscriptionField<Expected, T, ParentSource, Context, Args, Info, Source>;
	withDefault: <T = Expected>(
		value: T,
	) => SubscriptionField<
		Expected,
		T | NonNullable<Result>,
		ParentSource,
		Context,
		Args,
		Info,
		Source
	>;
	undefinedAsNull: () => SubscriptionField<
		Expected,
		Result extends undefined ? NonNullable<Result> | null : Result,
		ParentSource,
		Context,
		Args,
		Info,
		Source
	>;
} & {
	[makeSymbol]: () => SubscriptionCompiler<Expected, Source, ParentSource, Context, Args, Info>;
};

export type Or<T, Fallback> = [T] extends [never] ? Fallback : T;

export type SubscriptionMethods<Result, Source, Context, Args, Info, Payload = never> = {
	$use: <T = Payload>(
		input: SubscriptionFieldUseInput<
			Subscription<Or<Or<Payload, T>, unknown>>,
			Source,
			Context,
			Args,
			Info,
			'subscribe'
		>,
	) => SubscriptionMethods<Result, Source, Context, Args, Info, Or<Payload, T>>;
	subscribe: <T = Result>(
		fn: Resolver<Subscription<Or<Payload, T>>, Source, Context, Args, Info>,
	) => SubscriptionResolveMethods<Result, Or<Payload, T>, Source, Context, Args, Info>;
};

export type SubscriptionUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info,
	Phase extends 'subscribe' | 'resolve',
	State = unknown,
> = UsePlugin<
	'subscription',
	Result,
	Source,
	Context,
	Args,
	Info,
	{
		type: 'Subscription';
		phase: Phase;
		field: string;
	},
	State
>;

export type SubscriptionFieldUseInput<
	Result,
	Source,
	Context,
	Args,
	Info,
	FieldKind extends 'subscribe' | 'resolve',
> =
	| Middleware<Result, Source, Context, Args, Info>
	| SubscriptionUsePlugin<Result, Source, Context, Args, Info, FieldKind>;

export type SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info> = {
	$use: (
		input: SubscriptionFieldUseInput<Result, Source, Context, Args, Info, 'resolve'>,
	) => SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info>;
	map: <T = Result>(
		resolver: Resolver<T, Source, Context, Args, Info>,
	) => SubscriptionField<Result, T, ParentSource, Context, Args, Info, Source>;
	resolve: (
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) => SubscriptionField<Result, Result, ParentSource, Context, Args, Info, Source>;
};
