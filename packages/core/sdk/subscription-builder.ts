import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import type { PluginId } from './app-plugin.ts';
import { SubscriptionCompiler } from './subscription-compiler.ts';
import type {
	Or,
	Subscription,
	SubscriptionField,
	SubscriptionFieldUseInput,
	SubscriptionMethods,
	SubscriptionResolveMethods,
} from './subscription-methods.ts';
import { makePluginSymbol, makeSymbol } from './symbols.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface SubscriptionBuilderOptions<Result, Source, Context, Args, Info> {
	field: string;
	state: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<Subscription<unknown>, Source, Context, Args, Info>>;
	requiredPluginIds: Set<PluginId>;
}

export class SubscriptionBuilder<Result, Source, Context, Args, Info> {
	readonly #field: string;
	readonly #state: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<
		Middleware<Subscription<unknown>, Source, Context, Args, Info>
	>;
	readonly requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: SubscriptionBuilderOptions<Result, Source, Context, Args, Info>) {
		this.#field = options.field;
		this.#state = new Map(options.state);
		this.#middlewares = [...options.middlewares];
		this.requiredPluginIds = new Set(options.requiredPluginIds);
	}

	get field() {
		return this.#field;
	}

	edit() {
		const draftState = new Map(this.#state);
		const draftMiddlewares = [...this.#middlewares];
		const draftRequiredPluginIds = new Set(this.requiredPluginIds);
		const session = {
			field: this.#field,
			addMiddleware: (
				middleware: Middleware<Subscription<unknown>, Source, Context, Args, Info>,
			) => {
				draftMiddlewares.push(middleware);
				return session;
			},
			addRequiredPluginId: (id: PluginId) => {
				draftRequiredPluginIds.add(id);
				return session;
			},
			setPluginState: <T>(pluginId: PluginId<T>, value: T) => {
				draftState.set(pluginId.key, value as Readonly<unknown>);
				return session;
			},
			mergeState: (state: Map<symbol, unknown>) => {
				for (const [key, value] of state) {
					draftState.set(key, value as Readonly<unknown>);
				}
				return session;
			},
			commit: () =>
				new SubscriptionBuilder<Result, Source, Context, Args, Info>({
					field: this.#field,
					state: draftState,
					middlewares: draftMiddlewares,
					requiredPluginIds: draftRequiredPluginIds,
				}),
			commitToMethods: <P = never>() => session.commit().toMethods<P>(),
		} as const;
		return session;
	}

	toMethods<Payload = never>(): SubscriptionMethods<Result, Source, Context, Args, Info, Payload> {
		return {
			$use: <T = Payload>(
				input: SubscriptionFieldUseInput<
					Subscription<Or<Or<Payload, T>, unknown>>,
					Source,
					Context,
					Args,
					Info,
					'subscribe'
				>,
			) => {
				if (typeof input === 'function') {
					nameFunction(input, `Subscription.${this.#field}.subscribe.use`);
					return this.edit()
						.addMiddleware(input as Middleware<Subscription<unknown>, Source, Context, Args, Info>)
						.commitToMethods<Or<Payload, T>>();
				}
				const result = input[makePluginSymbol]({
					type: 'Subscription',
					field: this.#field,
					kind: 'field',
					subscriptionFieldKind: 'subscribe',
				});
				const session = this.edit().addRequiredPluginId(result.id);
				if (result.middleware) {
					nameFunction(result.middleware, `Subscription.${this.#field}.subscribe.use`);
					session.addMiddleware(
						result.middleware as Middleware<Subscription<unknown>, Source, Context, Args, Info>,
					);
				}
				if (result.state) {
					session.setPluginState(result.id, result.state);
				}
				return session.commitToMethods<Or<Payload, T>>();
			},

			subscribe: <T = Result>(
				fn: Resolver<Subscription<Or<Payload, T>>, Source, Context, Args, Info>,
			) => {
				nameFunction(fn, `Subscription.${this.#field}.subscribe`);
				return new SubscriptionResolveBuilder<Result, Or<Payload, T>, Source, Context, Args, Info>({
					field: this.#field,
					subscribeState: this.#state,
					subscribeMiddlewares: this.#middlewares as ReadonlyArray<
						Middleware<Subscription<Or<Payload, T>>, Source, Context, Args, Info>
					>,
					subscribe: fn,
					resolveState: new Map(),
					resolveMiddlewares: [],
					requiredPluginIds: this.requiredPluginIds,
				}).toMethods();
			},
		};
	}
}

interface SubscriptionResolveBuilderOptions<Result, Source, ParentSource, Context, Args, Info> {
	field: string;
	subscribeState: ReadonlyMap<symbol, Readonly<unknown>>;
	subscribeMiddlewares: ReadonlyArray<
		Middleware<Subscription<Source>, ParentSource, Context, Args, Info>
	>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveState: ReadonlyMap<symbol, Readonly<unknown>>;
	resolveMiddlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	requiredPluginIds: ReadonlySet<PluginId>;
}

class SubscriptionResolveBuilder<Result, Source, ParentSource, Context, Args, Info> {
	readonly #field: string;
	readonly #subscribeState: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #subscribeMiddlewares: ReadonlyArray<
		Middleware<Subscription<Source>, ParentSource, Context, Args, Info>
	>;
	readonly #subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	readonly #resolveState: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #resolveMiddlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	readonly requiredPluginIds: ReadonlySet<PluginId>;

	constructor(
		options: SubscriptionResolveBuilderOptions<Result, Source, ParentSource, Context, Args, Info>,
	) {
		this.#field = options.field;
		this.#subscribeState = options.subscribeState;
		this.#subscribeMiddlewares = options.subscribeMiddlewares;
		this.#subscribe = options.subscribe;
		this.#resolveState = new Map(options.resolveState);
		this.#resolveMiddlewares = [...options.resolveMiddlewares];
		this.requiredPluginIds = new Set(options.requiredPluginIds);
	}

	get field() {
		return this.#field;
	}

	edit() {
		const draftState = new Map(this.#resolveState);
		const draftMiddlewares = [...this.#resolveMiddlewares];
		const draftRequiredPluginIds = new Set(this.requiredPluginIds);
		const session = {
			field: this.#field,
			addMiddleware: (middleware: Middleware<Result, Source, Context, Args, Info>) => {
				draftMiddlewares.push(middleware);
				return session;
			},
			addRequiredPluginId: (id: PluginId) => {
				draftRequiredPluginIds.add(id);
				return session;
			},
			setPluginState: <T>(pluginId: PluginId<T>, value: T) => {
				draftState.set(pluginId.key, value as Readonly<unknown>);
				return session;
			},
			mergeState: (state: Map<symbol, unknown>) => {
				for (const [key, value] of state) {
					draftState.set(key, value as Readonly<unknown>);
				}
				return session;
			},
			commit: () =>
				new SubscriptionResolveBuilder<Result, Source, ParentSource, Context, Args, Info>({
					field: this.#field,
					subscribeState: this.#subscribeState,
					subscribeMiddlewares: this.#subscribeMiddlewares,
					subscribe: this.#subscribe,
					resolveState: draftState,
					resolveMiddlewares: draftMiddlewares,
					requiredPluginIds: draftRequiredPluginIds,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	#withMake<T>(resolver: Resolver<T, Source, Context, Args, Info>) {
		return createSubscriptionFieldWithMake<Result, T, Source, ParentSource, Context, Args, Info>({
			field: this.#field,
			subscribeState: this.#subscribeState,
			subscribeMiddlewares: this.#subscribeMiddlewares,
			subscribe: this.#subscribe,
			resolveState: this.#resolveState,
			resolveMiddlewares: this.#resolveMiddlewares,
			requiredPluginIds: this.requiredPluginIds,
			resolver,
		});
	}

	toMethods(): SubscriptionResolveMethods<Result, Source, ParentSource, Context, Args, Info> {
		return {
			$use: (input) => {
				if (typeof input === 'function') {
					nameFunction(input, `Subscription.${this.#field}.resolve.use`);
					return this.edit().addMiddleware(input).commitToMethods();
				}
				const result = input[makePluginSymbol]({
					type: 'Subscription',
					field: this.#field,
					kind: 'field',
					subscriptionFieldKind: 'resolve',
				});
				const session = this.edit().addRequiredPluginId(result.id);
				if (result.middleware) {
					nameFunction(result.middleware, `Subscription.${this.#field}.resolve.use`);
					session.addMiddleware(result.middleware);
				}
				if (result.state) {
					session.setPluginState(result.id, result.state);
				}
				return session.commitToMethods();
			},
			map: (resolver) => {
				nameFunction(resolver, `Subscription.${this.#field}.map`);
				return this.#withMake(resolver);
			},
			resolve: (resolver) => {
				nameFunction(resolver, `Subscription.${this.#field}.resolve`);
				return this.#withMake(resolver);
			},
		};
	}
}

interface SubscriptionFieldWithMakeOptions<
	Expected,
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
> {
	field: string;
	subscribeState: ReadonlyMap<symbol, Readonly<unknown>>;
	subscribeMiddlewares: ReadonlyArray<
		Middleware<Subscription<Source>, ParentSource, Context, Args, Info>
	>;
	subscribe: Resolver<Subscription<Source>, ParentSource, Context, Args, Info>;
	resolveState: ReadonlyMap<symbol, Readonly<unknown>>;
	resolveMiddlewares: ReadonlyArray<Middleware<Expected, Source, Context, Args, Info>>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
	requiredPluginIds: ReadonlySet<PluginId>;
}

function createSubscriptionFieldWithMake<
	Expected,
	Result,
	Source,
	ParentSource,
	Context,
	Args,
	Info,
>(
	options: SubscriptionFieldWithMakeOptions<
		Expected,
		Result,
		Source,
		ParentSource,
		Context,
		Args,
		Info
	>,
): SubscriptionField<Expected, Result, ParentSource, Context, Args, Info, Source> {
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) =>
		createSubscriptionFieldWithMake<Expected, R, Source, ParentSource, Context, Args, Info>({
			...options,
			resolver,
		});

	const chain = <T>(
		fn: (params: ResolverParams<Result, Context, Args, Info>) => T | PromiseLike<T>,
	) => {
		return (params: ResolverParams<Source, Context, Args, Info>) => {
			const result = options.resolver(params);
			return mapMaybePromise(result, (res) =>
				fn({ source: res, args: params.args, ctx: params.ctx, info: params.info }),
			);
		};
	};

	const fnNamespace = `Subscription.${options.field}`;

	return {
		map: (fn) => {
			nameFunction(fn, `${fnNamespace}.map`);
			return make(chain(fn));
		},
		resolve: (fn) => {
			nameFunction(fn, `${fnNamespace}.resolve`);
			return make(chain(fn));
		},
		key: (key) => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = options.resolver(params);
				return mapMaybePromise(result, (res) => res[key]);
			};
			return make(resolver);
		},
		to: (fn) => {
			nameFunction(fn, `${fnNamespace}.to`);
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = options.resolver(params);
				return mapMaybePromise(result, fn);
			};
			return make(resolver);
		},
		withDefault: (value) => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = options.resolver(params);
				return mapMaybePromise(result, (res) => res ?? value);
			};
			return make(resolver);
		},
		undefinedAsNull: () => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = options.resolver(params);
				return mapMaybePromise(
					result,
					(res) => (res ?? null) as Result extends undefined ? NonNullable<Result> | null : Result,
				);
			};
			return make(resolver);
		},
		[makeSymbol]: () =>
			new SubscriptionCompiler<Expected, Source, ParentSource, Context, Args, Info>({
				field: options.field,
				subscribeState: new Map(options.subscribeState),
				subscribeMiddlewares: [...options.subscribeMiddlewares],
				subscribe: options.subscribe,
				resolveState: new Map(options.resolveState),
				resolveMiddlewares: [...options.resolveMiddlewares] as Array<
					Middleware<Expected, Source, Context, Args, Info>
				>,
				requiredPluginIds: new Set(options.requiredPluginIds),
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
}
