import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { PluginId } from './app-plugin.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';

export interface FieldCompilerOptions<Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	metadata: Map<symbol, unknown>;
	middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	requiredPluginIds: Set<PluginId>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

export class FieldCompiler<Result, Source, Context, Args, Info> {
	readonly kind = 'Field';
	readonly #type: string;
	readonly #field: string;
	readonly #metadata: Map<symbol, unknown>;
	readonly #middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #topLevelMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: FieldCompilerOptions<Result, Source, Context, Args, Info>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#metadata = options.metadata;
		this.#middlewares = options.middlewares;
		this.#topLevelMiddlewares = [];
		this.#resolver = options.resolver;
		this.#requiredPluginIds = options.requiredPluginIds;
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

	addTopLevelMiddleware(middleware: Middleware<Result, Source, Context, Args, Info>) {
		this.#topLevelMiddlewares.push(middleware);
	}

	useMetadata<T>(key: symbol) {
		const get = () => this.#metadata.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#metadata.set(key, value);
		return { get, set };
	}

	build(typeMiddlewares: Middleware<unknown, Source, Context, unknown, Info>[]) {
		const allMiddlewares = concatMiddlewares(
			this.#topLevelMiddlewares,
			typeMiddlewares as Middleware<Result, Source, Context, Args, Info>[],
			this.#middlewares,
		);
		const resolver = composeMiddlewares(allMiddlewares, this.#resolver);
		const resolverAdapter: GraphQLFieldResolver<
			Source,
			Context,
			Args,
			Result | PromiseLike<Result>
		> = (source: Source, args: Args, ctx: Context, info: GraphQLResolveInfo) => {
			return resolver({ source, args, ctx, info: info as Info });
		};
		return {
			resolver: resolverAdapter,
			requiredPluginIds: this.#requiredPluginIds,
		};
	}
}
