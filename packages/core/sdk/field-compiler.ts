import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
import { composeMiddlewares } from './middleware.ts';

export class FieldCompiler<Result = Any, Source = Any, Context = Any, Args = Any, Info = Any> {
	readonly #type: string;
	readonly #field: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #initialMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(
		type: string,
		field: string,
		store: Map<symbol, unknown>,
		middlewares: Array<Middleware<Result, Source, Context, Args, Info>>,
		resolver: Resolver<Result, Source, Context, Args, Info>,
	) {
		this.#type = type;
		this.#field = field;
		this.#store = store;
		this.#middlewares = middlewares;
		this.#initialMiddlewares = [];
		this.#resolver = resolver;
	}

	get type() {
		return this.#type;
	}

	get field() {
		return this.#field;
	}

	addMiddleware(middleware: Middleware<Result, Source, Context, Args, Info>) {
		this.#middlewares.push(middleware);
	}

	addInitialMiddleware(middleware: Middleware<Result, Source, Context, Args, Info>) {
		this.#initialMiddlewares.push(middleware);
	}

	useStore<T>(key: symbol) {
		const get = () => this.#store.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#store.set(key, value);
		return { get, set };
	}

	build(
		typeMiddlewares: Array<Middleware<Any, Any, Any, Any, Any>>,
	): GraphQLFieldResolver<Source, Context, Args, Result> {
		const allMiddlewares = [...this.#initialMiddlewares, ...typeMiddlewares, ...this.#middlewares];
		const resolver = composeMiddlewares(allMiddlewares, this.#resolver);
		const resolverAdapter = (
			source: Source,
			args: Args,
			ctx: Context,
			info: GraphQLResolveInfo,
		) => {
			return resolver({ source, args, ctx, info: info as Info });
		};
		return resolverAdapter;
	}
}
