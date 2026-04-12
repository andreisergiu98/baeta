import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { FieldHelpers } from './field-methods.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';

export type Subscription<Result = unknown> = AsyncIterable<Result>;

export type SubscriptionWrapper<Result = unknown> = {
	__internal__asyncIterable: AsyncIterable<Result>;
};

export type SubscriptionField<Expected, Result, Source, Context, Args, Info> = SubscriptionHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

export type SubscriptionMethods<
	Result,
	Source,
	Context,
	Args,
	Info,
	ModuleName extends string,
	FieldName extends string,
> = {
	$use: (
		middleware: Middleware<SubscriptionWrapper, Source, Context, Args, Info>,
	) => SubscriptionMethods<Result, Source, Context, Args, Info, ModuleName, FieldName>;
	subscribe: <T = Result>(
		fn: Resolver<Subscription<T>, Source, Context, Args, Info>,
	) => SubscriptionField<Result, T, T, Context, Args, Info>;
} & BaetaExtensions.SubscriptionExtensions<
	Result,
	Source,
	Context,
	Args,
	Info,
	ModuleName,
	FieldName
>;

export type SubscriptionHelpers<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

export type SubscriptionFieldWithMake<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
> = FieldHelpers<Expected, Result, Source, Context, Args, Info> & {
	__make: () => SubscriptionCompiler<Expected, Source, Context, Args, Info, SubscriptionSource>;
};
