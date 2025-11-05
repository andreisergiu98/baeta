import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';
import type { SubscriptionWrapper } from './subscription-methods.ts';

export class SubscriptionCompiler<
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
	SubscriptionPayload,
> {
	readonly #field: string;
	readonly #store: Map<symbol, unknown>;
	readonly #initialMiddlewares: Array<
		Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>
	>;
	readonly #middlewares: Array<
		Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>
	>;
	readonly #subscribe: Resolver<SubscriptionPayload, SubscriptionSource, Context, Args, Info>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		field: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>>,
		subscribe: Resolver<SubscriptionPayload, SubscriptionSource, Context, Args, Info>,
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) {
		this.#field = field;
		this.#store = store;
		this.#initialMiddlewares = [];
		this.#middlewares = middlewares;
		this.#subscribe = subscribe;
		this.#resolver = resolver;
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
		middleware: Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>,
	) {
		this.#middlewares.push(middleware);
	}

	addInitialMiddleware(
		middleware: Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>,
	) {
		this.#initialMiddlewares.push(middleware);
	}

	build(typeMiddlewares: Middleware<unknown, SubscriptionSource, Context, unknown, Info>[]) {
		const allMiddlewares = concatMiddlewares(
			this.#initialMiddlewares,
			typeMiddlewares as Middleware<SubscriptionPayload, SubscriptionSource, Context, Args, Info>[],
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
				}) as SubscriptionWrapper<unknown>;
				return mapMaybePromise(wrappedSubscription, (wrapped) => wrapped.__internal__asyncIterable);
			},
			resolve: (source: Source, args: Args, ctx: Context, info: Info) => {
				return this.#resolver({ source, args, ctx, info });
			},
		};
	}
}
