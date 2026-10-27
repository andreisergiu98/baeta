import type { GraphQLResolveInfo } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';
import type { PluginId } from './app-plugin.ts';
import type { BuilderContext } from './builder-context.ts';
import { composeMiddlewares, concatMiddlewares } from './middleware.ts';
import type { Subscription } from './subscription-methods.ts';

export interface SubscriptionCompilerOptions<
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
	Name extends string = string,
> {
	field: Name;
	subscribeContext: BuilderContext<Subscription<Source>, ParentSource, Context, Args, Info>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveContext: BuilderContext<Result, Source, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

export class SubscriptionCompiler<
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
	Name extends string = string,
> {
	readonly kind = 'Subscription';
	readonly #field: Name;
	readonly #subscribeState: ReadonlyMap<symbol, unknown>;
	readonly #subscribeMiddlewares: Array<
		Middleware<Subscription<Source>, ParentSource, Context, Args, Info>
	>;
	readonly #topLevelSubscribeMiddlewares: Array<
		Middleware<Subscription<Source>, ParentSource, Context, Args, Info>
	>;
	readonly #subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	readonly #resolveState: ReadonlyMap<symbol, unknown>;
	readonly #resolveMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #topLevelResolveMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	readonly #resolver: Resolver<Result, Source, Context, Args, Info>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(
		options: SubscriptionCompilerOptions<Result, Source, ParentSource, Context, Args, Info, Name>,
	) {
		this.#field = options.field;
		this.#subscribeState = new Map(options.subscribeContext.state);
		this.#subscribeMiddlewares = [...options.subscribeContext.middlewares];
		this.#topLevelSubscribeMiddlewares = [];
		this.#subscribe = options.subscribe;
		this.#resolveState = new Map(options.resolveContext.state);
		this.#resolveMiddlewares = [...options.resolveContext.middlewares];
		this.#topLevelResolveMiddlewares = [];
		this.#resolver = options.resolver;
		this.#requiredPluginIds = new Set([
			...options.subscribeContext.requiredPluginIds,
			...options.resolveContext.requiredPluginIds,
		]);
	}

	get type() {
		return 'Subscription' as const;
	}

	get field() {
		return this.#field;
	}

	readonly subscribe = {
		addMiddleware: (
			middleware: Middleware<Subscription<Source>, ParentSource, Context, Args, Info>,
		) => {
			this.#subscribeMiddlewares.push(middleware);
		},
		addTopLevelMiddleware: (
			middleware: Middleware<Subscription<Source>, ParentSource, Context, Args, Info>,
		) => {
			this.#topLevelSubscribeMiddlewares.push(middleware);
		},
		hasPluginState: (pluginId: PluginId) => {
			return this.#subscribeState.has(pluginId.key);
		},
		getPluginState: <T>(pluginId: PluginId<T>): Readonly<T> | undefined => {
			return this.#subscribeState.get(pluginId.key) as Readonly<T> | undefined;
		},
	};

	readonly resolve = {
		addMiddleware: (middleware: Middleware<Result, Source, Context, Args, Info>) => {
			this.#resolveMiddlewares.push(middleware);
		},
		addTopLevelMiddleware: (middleware: Middleware<Result, Source, Context, Args, Info>) => {
			this.#topLevelResolveMiddlewares.push(middleware);
		},
		hasPluginState: (pluginId: PluginId) => {
			return this.#resolveState.has(pluginId.key);
		},
		getPluginState: <T>(pluginId: PluginId<T>): Readonly<T> | undefined => {
			return this.#resolveState.get(pluginId.key) as Readonly<T> | undefined;
		},
	};

	build(typeSubscribeMiddlewares: Middleware<unknown, ParentSource, Context, unknown, Info>[]) {
		const allSubscribeMiddlewares = concatMiddlewares(
			this.#topLevelSubscribeMiddlewares,
			typeSubscribeMiddlewares as Middleware<
				Subscription<Source>,
				ParentSource,
				Context,
				Args,
				Info
			>[],
			this.#subscribeMiddlewares,
		);

		const allResolveMiddlewares = concatMiddlewares(
			this.#topLevelResolveMiddlewares,
			this.#resolveMiddlewares,
		);

		const wrappedSubscribe = composeMiddlewares(allSubscribeMiddlewares, this.#subscribe);
		const wrappedResolve = composeMiddlewares(allResolveMiddlewares, this.#resolver);

		return {
			resolver: {
				subscribe: (source: ParentSource, args: Args, ctx: Context, info: GraphQLResolveInfo) => {
					return wrappedSubscribe({ source, args, ctx, info: info as Info });
				},
				resolve: (source: Source, args: Args, ctx: Context, info: GraphQLResolveInfo) => {
					return wrappedResolve({ source, args, ctx, info: info as Info });
				},
			},
			requiredPluginIds: this.#requiredPluginIds,
		};
	}
}
