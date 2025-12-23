import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';
import type { SubscriptionWrapper } from './subscription-methods.ts';

export interface SubscriptionCompilerOptions<
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
> {
	field: string;
	store: Map<symbol, unknown>;
	middlewares: Array<
		Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>
	>;
	subscribe: Resolver<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

export class SubscriptionCompiler<Result, Source, Context, Args, Info, SubscriptionSource> {
	readonly #field: string;
	readonly #store: Map<symbol, unknown>;
	readonly #initialMiddlewares: Array<
		Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>
	>;
	readonly #middlewares: Array<
		Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>
	>;
	readonly #subscribe: Resolver<
		SubscriptionWrapper<Source>,
		SubscriptionSource,
		Context,
		Args,
		Info
	>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		options: SubscriptionCompilerOptions<Result, Source, Context, Args, Info, SubscriptionSource>,
	) {
		this.#field = options.field;
		this.#store = options.store;
		this.#initialMiddlewares = [];
		this.#middlewares = options.middlewares;
		this.#subscribe = options.subscribe;
		this.#resolver = options.resolver;
	}

	get type() {
		return 'Subscription';
	}

	get field() {
		return this.#field;
	}

	useStore<T>(key: symbol) {
		const get = () => this.#store.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#store.set(key, value);
		return { get, set };
	}

	addMiddleware(
		middleware: Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>,
	) {
		this.#middlewares.push(middleware);
	}

	addInitialMiddleware(
		middleware: Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>,
	) {
		this.#initialMiddlewares.push(middleware);
	}

	build(typeMiddlewares: Middleware<unknown, SubscriptionSource, Context, unknown, Info>[]) {
		const allMiddlewares = concatMiddlewares(
			this.#initialMiddlewares,
			typeMiddlewares as Middleware<
				SubscriptionWrapper<Source>,
				SubscriptionSource,
				Context,
				Args,
				Info
			>[],
			this.#middlewares,
		);
		const getWrappedSubscription = composeMiddlewares(allMiddlewares, this.#subscribe);
		return {
			subscribe: (source: SubscriptionSource, args: Args, ctx: Context, info: Info) => {
				const wrappedSubscription = getWrappedSubscription({
					source,
					args,
					ctx,
					info,
				});
				return mapMaybePromise(wrappedSubscription, (wrapped) => wrapped.__internal__asyncIterable);
			},
			resolve: (source: Source, args: Args, ctx: Context, info: Info) => {
				return this.#resolver({ source, args, ctx, info });
			},
		};
	}
}
