import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
import { composeMiddlewares } from './middleware.ts';

export class FieldCompiler<Result = Any, Source = Any, Context = Any, Args = Any, Info = Any> {
	readonly type: string;
	readonly field: string;
	readonly store: Map<symbol, unknown>;
	readonly middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly initialMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		type: string,
		field: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<Result, Source, Context, Args, Info>>,
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) {
		this.type = type;
		this.field = field;
		this.store = store;
		this.middlewares = middlewares;
		this.initialMiddlewares = [];
		this.resolver = resolver;
	}

	useStore<T>(key: symbol) {
		return {
			get: () => this.store.get(key) as T | undefined,
			set: (value: Readonly<T>) => this.store.set(key, value),
		};
	}

	build(
		typeMiddlewares: Array<Middleware<Any, Any, Any, Any, Any>>,
	): GraphQLFieldResolver<Source, Context, Args, Result> {
		const resolver = composeMiddlewares(
			[...this.initialMiddlewares, ...typeMiddlewares, ...this.middlewares],
			this.resolver,
		);
		return (source: Source, args: Args, ctx: Context, info: GraphQLResolveInfo) => {
			return resolver({ source, args, ctx, info: info as Info });
		};
	}
}
