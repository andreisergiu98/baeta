import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { SubscriptionCompiler } from './subscription-compiler.ts';
import type {
	Subscription,
	SubscriptionFieldWithMake,
	SubscriptionHelpers,
	SubscriptionMethods,
	SubscriptionWrapper,
} from './subscription-methods.ts';

export interface SubscriptionBuilderOptions<Source, Context, Args, Info> {
	field: string;
	extensions: ReadonlyArray<Extension>;
	store: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<SubscriptionWrapper, Source, Context, Args, Info>>;
}

export class SubscriptionBuilder<Result, Source, Context, Args, Info> {
	readonly #field: string;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #middlewares: ReadonlyArray<
		Middleware<SubscriptionWrapper, Source, Context, Args, Info>
	>;

	constructor(options: SubscriptionBuilderOptions<Source, Context, Args, Info>) {
		this.#field = options.field;
		this.#extensions = options.extensions;
		this.#store = new Map(options.store);
		this.#middlewares = [...options.middlewares];
	}

	get field() {
		return this.#field;
	}

	edit() {
		const draftStore = new Map(this.#store);
		const draftMiddlewares = [...this.#middlewares];
		const session = {
			field: this.#field,
			addMiddleware: (middleware: Middleware<SubscriptionWrapper, Source, Context, Args, Info>) => {
				draftMiddlewares.push(middleware);
				return session;
			},
			useStore: <T>(key: symbol) => {
				return {
					get: () => draftStore.get(key) as T | undefined,
					set: (value: Readonly<T>) => {
						draftStore.set(key, value);
					},
				};
			},
			setStore: (key: symbol, value: Readonly<unknown>) => {
				draftStore.set(key, value);
				return session;
			},
			commit: () =>
				new SubscriptionBuilder<Result, Source, Context, Args, Info>({
					field: this.#field,
					extensions: this.#extensions,
					store: draftStore,
					middlewares: draftMiddlewares,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): SubscriptionMethods<Result, Source, Context, Args, Info> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getSubscriptionExtensions(this),
		) as unknown as BaetaExtensions.SubscriptionExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			SubscriptionBuilder<Result, Source, Context, Args, Info>
		>;
		return {
			...extensions,
			$use: (middleware) => {
				nameFunction(middleware, `Subscription.${this.#field}.use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
			subscribe: <Payload = Result>(
				fn: Resolver<Subscription<Payload>, Source, Context, Args, Info>,
			) => {
				nameFunction(fn, `Subscription.${this.#field}.subscribe`);
				const subscribe = (params: ResolverParams<Source, Context, Args, Info>) => {
					return mapMaybePromise(fn(params), (iterator) => ({
						__internal__asyncIterable: iterator,
					}));
				};
				return createSubscriptionFieldWithMake<
					Result,
					Payload,
					Payload,
					Context,
					Args,
					Info,
					Source
				>({
					field: this.#field,
					extensions: this.#extensions,
					store: this.#store,
					middlewares: this.#middlewares as Middleware<
						SubscriptionWrapper<Payload>,
						Source,
						Context,
						Args,
						Info
					>[],
					subscribe,
					resolver: (params) => params.source,
				});
			},
		};
	}
}

interface SubscriptionFieldWithMakeOptions<
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
> {
	field: string;
	extensions: ReadonlyArray<Extension>;
	store: ReadonlyMap<symbol, Readonly<unknown>>;
	middlewares: ReadonlyArray<
		Middleware<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>
	>;
	subscribe: Resolver<SubscriptionWrapper<Source>, SubscriptionSource, Context, Args, Info>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

function createSubscriptionFieldWithMake<
	Expected,
	Result,
	Source,
	Context,
	Args,
	Info,
	SubscriptionSource,
>(
	options: SubscriptionFieldWithMakeOptions<
		Result,
		Source,
		Context,
		Args,
		Info,
		SubscriptionSource
	>,
): SubscriptionHelpers<Expected, Result, Source, Context, Args, Info> {
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) =>
		createSubscriptionFieldWithMake<Expected, R, Source, Context, Args, Info, SubscriptionSource>({
			field: options.field,
			extensions: options.extensions,
			store: options.store,
			middlewares: options.middlewares,
			subscribe: options.subscribe,
			resolver,
		});

	const chain = <T>(
		fn: (params: ResolverParams<Result, Context, Args, Info>) => T | PromiseLike<T>,
	) => {
		const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
			const result = options.resolver(params);
			return mapMaybePromise(result, (res) =>
				fn({ source: res, args: params.args, ctx: params.ctx, info: params.info }),
			);
		};
		return resolver;
	};

	const fnNamespace = `Subscription.${options.field}`;

	const helpers: SubscriptionFieldWithMake<
		Expected,
		Result,
		Source,
		Context,
		Args,
		Info,
		SubscriptionSource
	> = {
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
		__make: () =>
			new SubscriptionCompiler<Expected, Source, Context, Args, Info, SubscriptionSource>({
				field: options.field,
				store: new Map(options.store),
				middlewares: [...options.middlewares],
				subscribe: options.subscribe,
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
	return helpers;
}
