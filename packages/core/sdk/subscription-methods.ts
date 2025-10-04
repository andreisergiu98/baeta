import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { FieldHelpers } from './field-methods.ts';
import type { SubscriptionBuilder } from './subscription-builder.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';

export type Subscription<Result> = AsyncIterable<Result> | AsyncIterator<Result>;

export type WrappedSubscribe<Result = unknown> = {
	__internal__getAsyncIterable: () => Subscription<Result> | PromiseLike<Subscription<Result>>;
};

export type SubscriptionField<Expected, Result, Source, Context, Args, Info> = SubscriptionHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

export type SubscriptionMethods<Result, Source, Context, Args, Info> = {
	use: (
		middleware: Middleware<WrappedSubscribe, Source, Context, Args, Info>,
	) => SubscriptionMethods<Result, Source, Context, Args, Info>;
	subscribe: <T = Result>(
		fn: Resolver<Subscription<T>, Source, Context, Args, Info>,
	) => SubscriptionField<Result, T, T, Context, Args, Info>;
} & BaetaExtensions.SubscriptionExtensions<
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionBuilder<Result, Source, Context, Args, Info>
>;

export type SubscriptionHelpers<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

export type SubscriptionFieldWithMake<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
> & {
	__make: () => SubscriptionCompiler<Expected, Source, Context, Args, Info>;
};
