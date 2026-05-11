import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { PluginId } from './app-plugin.ts';
import type { FieldHelpers } from './field-methods.ts';
import type { SubscriptionCompiler } from './subscription-compiler.ts';

export type Subscription<Result = unknown> = AsyncIterable<Result>;

export type SubscriptionField<Expected, Result, Source, Context, Args, Info> = FieldHelpers<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info
>;

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
	) => SubscriptionResolveMethods<Result, Or<Payload, T>, Context, Args, Info>;
};

export type SubscriptionUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info,
	FieldKind extends 'subscribe' | 'resolve',
> = {
	buildPlugin: (options: {
		type: string;
		field: string;
		kind: 'field';
		subscriptionFieldKind: FieldKind;
	}) => {
		id: PluginId;
		middleware?: Middleware<Result, Source, Context, Args, Info>;
		meta?: Map<symbol, unknown>;
	};
};

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

export type SubscriptionResolveMethods<Result, Source, Context, Args, Info> = {
	$use: (
		input: SubscriptionFieldUseInput<Result, Source, Context, Args, Info, 'resolve'>,
	) => SubscriptionResolveMethods<Result, Source, Context, Args, Info>;
	map: <T = Result>(
		resolver: Resolver<T, Source, Context, Args, Info>,
	) => SubscriptionField<Result, T, Source, Context, Args, Info>;
	resolve: (
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) => SubscriptionField<Result, Result, Source, Context, Args, Info>;
};

export type SubscriptionFieldWithMake<Expected, Result, Source, Context, Args, Info, ParentSource> =
	FieldHelpers<Expected, Result, Source, Context, Args, Info> & {
		__make: () => SubscriptionCompiler<Expected, Source, ParentSource, Context, Args, Info>;
	};
