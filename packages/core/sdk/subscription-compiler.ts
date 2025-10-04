import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
import { composeMiddlewares } from './middleware.ts';
import type { WrappedSubscribe } from './subscription-methods.ts';

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
	readonly middlewares: Array<Middleware<WrappedSubscribe<Event>, SubSource, Context, Args, Info>>;
	readonly subscribe: Resolver<WrappedSubscribe<Event>, SubSource, Context, Args, Info>;
	readonly resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		field: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<WrappedSubscribe<Event>, SubSource, Context, Args, Info>>,
		subscribe: Resolver<WrappedSubscribe<Event>, SubSource, Context, Args, Info>,
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) {
		this.field = field;
		this.store = store;
		this.middlewares = middlewares;
		this.subscribe = subscribe;
		this.resolver = resolver;
	}

	build(typeMiddlewares: Middleware<Any, Any, Any, Any, Any>[]) {
		const getWrappedSubscription = composeMiddlewares<
			WrappedSubscribe<Event>,
			SubSource,
			Context,
			Args,
			Info
		>([...typeMiddlewares, ...this.middlewares], this.subscribe);
		return {
			subscribe: async (source: SubSource, args: Args, ctx: Context, info: Info) => {
				const wrapped = await getWrappedSubscription({ source, args, ctx, info: info as Info });
				return wrapped.__internal__getAsyncIterable();
			},
			resolve: (source: Source, args: Args, ctx: Context, info: Info) => {
				return this.resolver({ source, args, ctx, info: info as Info });
			},
		};
	}
}
