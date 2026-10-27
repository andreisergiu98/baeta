import type { Resolver } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { BuilderEditor, type BuilderContext, createBuilderContext } from './builder-context.ts';
import {
	chainKeyResolver,
	chainMapResolver,
	chainToResolver,
	chainUndefinedAsNullResolver,
	chainWithDefaultResolver,
} from './resolver-chain.ts';
import { SubscriptionCompiler } from './subscription-compiler.ts';
import type {
	Or,
	Subscription,
	SubscriptionField,
	SubscriptionFieldUseInput,
	SubscriptionMethods,
	SubscriptionResolveMethods,
} from './subscription-methods.ts';
import { makeSymbol } from './symbols.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface SubscriptionBuilderOptions<Result, Source, Context, Args, Info> {
	field: string;
	context: BuilderContext<Subscription<unknown>, Source, Context, Args, Info>;
}

export class SubscriptionBuilder<Result, Source, Context, Args, Info> {
	readonly #field: string;
	readonly #context: BuilderContext<Subscription<unknown>, Source, Context, Args, Info>;

	constructor(options: SubscriptionBuilderOptions<Result, Source, Context, Args, Info>) {
		this.#field = options.field;
		this.#context = options.context;
	}

	get field() {
		return this.#field;
	}

	edit<Payload = never>() {
		return new BuilderEditor<
			Subscription<Or<Payload, unknown>>,
			Source,
			Context,
			Args,
			Info,
			SubscriptionMethods<Result, Source, Context, Args, Info, Payload>,
			SubscriptionBuilder<Result, Source, Context, Args, Info>
		>(
			this.#context as BuilderContext<
				Subscription<Or<Payload, unknown>>,
				Source,
				Context,
				Args,
				Info
			>,
			(nextContext) => {
				return new SubscriptionBuilder<Result, Source, Context, Args, Info>({
					field: this.#field,
					context: nextContext as BuilderContext<
						Subscription<unknown>,
						Source,
						Context,
						Args,
						Info
					>,
				});
			},
		);
	}

	toMethods<Payload = never>(): SubscriptionMethods<Result, Source, Context, Args, Info, Payload> {
		return {
			$use: <T = Payload>(
				input: SubscriptionFieldUseInput<
					Subscription<Or<Or<Payload, T>, unknown>>,
					Source,
					Context,
					Args,
					Info,
					'subscribe'
				>,
			) => {
				return this.edit<Or<Payload, T>>()
					.use(input, `Subscription.${this.#field}.subscribe.use`, {
						kind: 'subscription',
						phase: 'subscribe',
						type: 'Subscription',
						field: this.#field,
					})
					.commitToMethods();
			},

			subscribe: <T = Result>(
				fn: Resolver<Subscription<Or<Payload, T>>, Source, Context, Args, Info>,
			) => {
				nameFunction(fn, `Subscription.${this.#field}.subscribe`);
				return new SubscriptionResolveBuilder<Result, Or<Payload, T>, Source, Context, Args, Info>({
					field: this.#field,
					subscribeContext: this.#context as BuilderContext<
						Subscription<Or<Payload, T>>,
						Source,
						Context,
						Args,
						Info
					>,
					subscribe: fn,
					resolveContext: createBuilderContext({
						state: new Map(),
						middlewares: [],
						requiredPluginIds: new Set(),
					}),
				}).toMethods();
			},
		};
	}
}

interface SubscriptionResolveBuilderOptions<Result, Source, ParentSource, Context, Args, Info> {
	field: string;
	subscribeContext: BuilderContext<Subscription<Source>, ParentSource, Context, Args, Info>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveContext: BuilderContext<Result, Source, Context, Args, Info>;
}

class SubscriptionResolveBuilder<Result, Source, ParentSource, Context, Args, Info> {
	readonly #field: string;
	readonly #subscribeContext: BuilderContext<
		Subscription<Source>,
		ParentSource,
		Context,
		Args,
		Info
	>;
	readonly #subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	readonly #resolveContext: BuilderContext<Result, Source, Context, Args, Info>;

	constructor(
		options: SubscriptionResolveBuilderOptions<Result, Source, ParentSource, Context, Args, Info>,
	) {
		this.#field = options.field;
		this.#subscribeContext = options.subscribeContext;
		this.#subscribe = options.subscribe;
		this.#resolveContext = options.resolveContext;
	}

	get field() {
		return this.#field;
	}

	edit() {
		return new BuilderEditor<
			Result,
			Source,
			Context,
			Args,
			Info,
			SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info>,
			SubscriptionResolveBuilder<Result, Source, ParentSource, Context, Args, Info>
		>(this.#resolveContext, (nextContext) => {
			return new SubscriptionResolveBuilder<Result, Source, ParentSource, Context, Args, Info>({
				field: this.#field,
				subscribeContext: this.#subscribeContext,
				subscribe: this.#subscribe,
				resolveContext: nextContext,
			});
		});
	}

	toMethods(): SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info> {
		const make = <T>(resolver: Resolver<T, Source, Context, Args, Info>) => {
			return createSubscriptionFieldWithMake<Result, T, Source, ParentSource, Context, Args, Info>({
				field: this.#field,
				subscribeContext: this.#subscribeContext,
				subscribe: this.#subscribe,
				resolveContext: this.#resolveContext,
				resolver,
			});
		};
		return {
			$use: (input) => {
				return this.edit()
					.use(input, `Subscription.${this.#field}.resolve.use`, {
						kind: 'subscription',
						phase: 'resolve',
						type: 'Subscription',
						field: this.#field,
					})
					.commitToMethods();
			},
			map: (resolver) => {
				nameFunction(resolver, `Subscription.${this.#field}.map`);
				return make(resolver);
			},
			resolve: (resolver) => {
				nameFunction(resolver, `Subscription.${this.#field}.resolve`);
				return make(resolver);
			},
		};
	}
}

interface SubscriptionFieldWithMakeOptions<
	Expected,
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
> {
	field: string;
	subscribeContext: BuilderContext<Subscription<Source>, ParentSource, Context, Args, Info>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveContext: BuilderContext<Expected, Source, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

function createSubscriptionFieldWithMake<
	Expected,
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
>(
	options: SubscriptionFieldWithMakeOptions<
		Expected,
		Result,
		Source,
		ParentSource,
		Context,
		Args,
		Info
	>,
): SubscriptionField<Expected, Result, ParentSource, Context, Args, Info, Source> {
	const prefix = `Subscription.${options.field}`;
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) => {
		return createSubscriptionFieldWithMake<Expected, R, Source, ParentSource, Context, Args, Info>({
			field: options.field,
			subscribeContext: options.subscribeContext,
			subscribe: options.subscribe,
			resolveContext: options.resolveContext,
			resolver,
		});
	};
	return {
		map: (fn) => make(chainMapResolver(`${prefix}.map`, options.resolver, fn)),
		resolve: (fn) => make(chainMapResolver(`${prefix}.resolve`, options.resolver, fn)),
		key: (key) => make(chainKeyResolver(options.resolver, key)),
		to: (fn) => make(chainToResolver(`${prefix}.to`, options.resolver, fn)),
		withDefault: (value) => make(chainWithDefaultResolver(options.resolver, value)),
		undefinedAsNull: () => make(chainUndefinedAsNullResolver(options.resolver)),
		[makeSymbol]: () =>
			new SubscriptionCompiler<Expected, Source, ParentSource, Context, Args, Info>({
				field: options.field,
				subscribeContext: options.subscribeContext,
				subscribe: options.subscribe,
				resolveContext: options.resolveContext,
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
}
