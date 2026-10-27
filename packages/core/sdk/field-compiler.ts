import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { PluginId } from './app-plugin.ts';
import type { BuilderContext } from './builder-context.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';

export interface FieldCompilerOptions<
	Result,
	Source,
	Context,
	Args,
	Info,
	Type extends string = string,
	Name extends string = string,
> {
	type: Type;
	field: Name;
	context: BuilderContext<Result, Source, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

export class FieldCompiler<
	Result,
	Source,
	Context,
	Args,
	Info,
	Type extends string = string,
	Name extends string = string,
> {
	readonly kind = 'Field';
	readonly #type: Type;
	readonly #field: Name;
	readonly #state: ReadonlyMap<symbol, unknown>;
	readonly #middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #topLevelMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: FieldCompilerOptions<Result, Source, Context, Args, Info, Type, Name>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#state = new Map(options.context.state);
		this.#middlewares = [...options.context.middlewares];
		this.#requiredPluginIds = new Set(options.context.requiredPluginIds);
		this.#topLevelMiddlewares = [];
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

	addTopLevelMiddleware(middleware: Middleware<Result, Source, Context, Args, Info>) {
		this.#topLevelMiddlewares.push(middleware);
	}

	hasPluginState(pluginId: PluginId) {
		return this.#state.has(pluginId.key);
	}

	getPluginState<T>(pluginId: PluginId<T>): Readonly<T> | undefined {
		return this.#state.get(pluginId.key) as Readonly<T> | undefined;
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
