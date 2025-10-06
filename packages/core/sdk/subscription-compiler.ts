import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
import { lift } from '../utils/lift.ts';
import { composeMiddlewares } from './middleware.ts';
import type { SubscriptionWrapper } from './subscription-methods.ts';

export class SubscriptionCompiler<
	Result = Any,
	Source = Any,
	Context = Any,
	Args = Any,
	Info = Any,
	SubSource = Any,
	Event = Any,
> {
	readonly field: string;
	readonly store: Map<symbol, unknown>;
	readonly initialMiddlewares: Array<
		Middleware<SubscriptionWrapper<Event>, SubSource, Context, Args, Info>
	>;
	readonly middlewares: Array<
		Middleware<SubscriptionWrapper<Event>, SubSource, Context, Args, Info>
	>;
	readonly subscribe: Resolver<SubscriptionWrapper<Event>, SubSource, Context, Args, Info>;
	readonly resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		field: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<SubscriptionWrapper<Event>, SubSource, Context, Args, Info>>,
		subscribe: Resolver<SubscriptionWrapper<Event>, SubSource, Context, Args, Info>,
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) {
		this.field = field;
		this.store = store;
		this.initialMiddlewares = [];
		this.middlewares = middlewares;
		this.subscribe = subscribe;
		this.resolver = resolver;
	}

	useStore<T>(key: symbol) {
		return {
			get: () => this.store.get(key) as T | undefined,
			set: (value: Readonly<T>) => this.store.set(key, value),
		};
	}

	build(typeMiddlewares: Middleware<Any, Any, Any, Any, Any>[]) {
		const getWrappedSubscription = composeMiddlewares<
			SubscriptionWrapper<Event>,
			SubSource,
			Context,
			Args,
			Info
		>([...this.initialMiddlewares, ...typeMiddlewares, ...this.middlewares], this.subscribe);
		return {
			subscribe: (source: SubSource, args: Args, ctx: Context, info: Info) => {
				const wrappedSubscription = getWrappedSubscription({
					source,
					args,
					ctx,
					info: info as Info,
				});
				return lift(wrappedSubscription, (wrapped) => wrapped.__internal__getAsyncIterable());
			},
			resolve: (source: Source, args: Args, ctx: Context, info: Info) => {
				return this.resolver({ source, args, ctx, info: info as Info });
			},
		};
	}
}
