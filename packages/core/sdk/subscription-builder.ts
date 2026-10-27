import type { Resolver } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import {
	BuilderEditor,
	type BuilderContext,
	createEmptyBuilderContext,
} from './builder-context.ts';
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

export interface SubscriptionBuilderOptions<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Result,
	Source,
	Context,
	Args,
	Info,
	Name extends string = string,
> {
	field: Name;
	context: BuilderContext<Subscription<unknown>, Source, Context, Args, Info>;
}

export class SubscriptionBuilder<
	Result,
	Source,
	Context,
	Args,
	Info,
	Name extends string = string,
> {
	readonly #field: Name;
	readonly #context: BuilderContext<Subscription<unknown>, Source, Context, Args, Info>;

	constructor(options: SubscriptionBuilderOptions<Result, Source, Context, Args, Info, Name>) {
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
			SubscriptionBuilder<Result, Source, Context, Args, Info, Name>,
			SubscriptionMethods<Result, Source, Context, Args, Info, Name, Payload>
		>(
			this.#context as BuilderContext<
				Subscription<Or<Payload, unknown>>,
				Source,
				Context,
				Args,
				Info
			>,
			(nextContext) => {
				return new SubscriptionBuilder<Result, Source, Context, Args, Info, Name>({
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

	toMethods<Payload = never>(): SubscriptionMethods<
		Result,
		Source,
		Context,
		Args,
		Info,
		Name,
		Payload
	> {
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
				return new SubscriptionResolveBuilder<
					Result,
					Or<Payload, T>,
					Source,
					Context,
					Args,
					Info,
					Name
				>({
					field: this.#field,
					subscribeContext: this.#context as BuilderContext<
						Subscription<Or<Payload, T>>,
						Source,
						Context,
						Args,
						Info
					>,
					subscribe: fn,
					resolveContext: createEmptyBuilderContext(),
				}).toMethods();
			},
		};
	}
}

interface SubscriptionResolveBuilderOptions<
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
	Name extends string,
> {
	field: Name;
	subscribeContext: BuilderContext<Subscription<Source>, ParentSource, Context, Args, Info>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveContext: BuilderContext<Result, Source, Context, Args, Info>;
}

class SubscriptionResolveBuilder<
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
	Name extends string,
> {
	readonly #field: Name;
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
		options: SubscriptionResolveBuilderOptions<
			Result,
			Source,
			ParentSource,
			Context,
			Args,
			Info,
			Name
		>,
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
		return new BuilderEditor(this.#resolveContext, (nextContext) => {
			return new SubscriptionResolveBuilder<
				Result,
				Source,
				ParentSource,
				Context,
				Args,
				Info,
				Name
			>({
				field: this.#field,
				subscribeContext: this.#subscribeContext,
				subscribe: this.#subscribe,
				resolveContext: nextContext,
			});
		});
	}

	toMethods(): SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info, Name> {
		const make = <T>(resolver: Resolver<T, Source, Context, Args, Info>) => {
			return createSubscriptionFieldWithMake<
				Result,
				T,
				Source,
				ParentSource,
				Context,
				Args,
				Info,
				Name
			>({
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
	Name extends string,
> {
	field: Name;
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
	Name extends string,
>(
	options: SubscriptionFieldWithMakeOptions<
		Expected,
		Result,
		Source,
		ParentSource,
		Context,
		Args,
		Info,
		Name
	>,
): SubscriptionField<Expected, Result, ParentSource, Context, Args, Info, Name, Source> {
	const prefix = `Subscription.${options.field}`;
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) => {
		return createSubscriptionFieldWithMake<
			Expected,
			R,
			Source,
			ParentSource,
			Context,
			Args,
			Info,
			Name
		>({
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
			new SubscriptionCompiler<Expected, Source, ParentSource, Context, Args, Info, Name>({
				field: options.field,
				subscribeContext: options.subscribeContext,
				subscribe: options.subscribe,
				resolveContext: options.resolveContext,
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
}
