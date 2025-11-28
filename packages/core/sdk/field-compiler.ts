import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';

export interface FieldCompilerOptions<Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	store: Map<symbol, unknown>;
	middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

export class FieldCompiler<Result, Source, Context, Args, Info> {
	readonly #type: string;
	readonly #field: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #initialMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;

	constructor(options: FieldCompilerOptions<Result, Source, Context, Args, Info>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#store = new Map(options.store);
		this.#middlewares = [...options.middlewares];
		this.#initialMiddlewares = [];
		this.#resolver = options.resolver;
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
		typeMiddlewares: Middleware<unknown, Source, Context, unknown, Info>[],
	): GraphQLFieldResolver<Source, Context, Args, Result | PromiseLike<Result>> {
		const allMiddlewares = concatMiddlewares(
			this.#initialMiddlewares,
			typeMiddlewares as Middleware<Result, Source, Context, Args, Info>[],
			this.#middlewares,
		);
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
