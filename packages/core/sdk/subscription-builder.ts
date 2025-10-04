import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { SubscriptionCompiler } from './subscription-compiler.ts';
import type {
	Subscription,
	SubscriptionFieldWithMake,
	SubscriptionHelpers,
	SubscriptionMethods,
	WrappedSubscribe,
} from './subscription-methods.ts';

export class SubscriptionBuilder<Result, Source, Context, Args, Info> {
	readonly #field: string;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #middlewares: ReadonlyArray<Middleware<WrappedSubscribe, Source, Context, Args, Info>>;

	constructor(
		field: string,
		extensions: ReadonlyArray<Extension>,
		store: Map<symbol, Readonly<unknown>>,
		middlewares: Array<Middleware<WrappedSubscribe, Source, Context, Args, Info>>,
	) {
		this.#field = field;
		this.#extensions = [...extensions];
		this.#store = new Map(store);
		this.#middlewares = [...middlewares];
	}

	get field() {
		return this.#field;
	}

	edit() {
		const draftStore = new Map(this.#store);
		const draftMiddlewares = [...this.#middlewares];
		const session = {
			field: this.#field,
			addMiddleware: (middleware: Middleware<WrappedSubscribe, Source, Context, Args, Info>) => {
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
				new SubscriptionBuilder<Result, Source, Context, Args, Info>(
					this.#field,
					this.#extensions,
					draftStore,
					draftMiddlewares,
				),
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
			use: (middleware) => {
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
			subscribe: <T = Result>(fn: Resolver<Subscription<T>, Source, Context, Args, Info>) => {
				const subscribe = (params: ResolverParams<Source, Context, Args, Info>) => {
					return Promise.resolve(fn(params)).then((iterator) => ({
						__internal__getAsyncIterable: () => iterator,
					}));
				};
				return createSubscriptionFieldWithMake<Result, T, T, Context, Args, Info>(
					this.#field,
					this.#extensions,
					this.#store,
					this.#middlewares,
					subscribe,
					(params) => params.source,
				);
			},
		};
	}
}

function createSubscriptionFieldWithMake<Expected, Result, Source, Context, Args, Info>(
	field: string,
	extensions: ReadonlyArray<Extension>,
	store: ReadonlyMap<symbol, Readonly<unknown>>,
	middlewares: ReadonlyArray<Middleware<WrappedSubscribe<unknown>, Any, Context, Args, Info>>,
	subscribe: Resolver<WrappedSubscribe<Any>, Any, Context, Args, Info>,
	currentResolver: Resolver<Result, Source, Context, Args, Info>,
): SubscriptionHelpers<Expected, Result, Source, Context, Args, Info> {
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) =>
		createSubscriptionFieldWithMake<Expected, R, Source, Context, Args, Info>(
			field,
			extensions,
			store,
			middlewares,
			subscribe,
			resolver,
		);
	const map = <R>(fn: Resolver<R, Result, Context, Args, Info>) => {
		const resolver = async (p: ResolverParams<Source, Context, Args, Info>) => {
			const res = await currentResolver(p);
			return fn({ source: res, args: p.args, ctx: p.ctx, info: p.info });
		};
		return make(resolver);
	};
	const helpers: SubscriptionFieldWithMake<Expected, Result, Source, Context, Args, Info> = {
		map,
		resolve: map,
		key: (key) => {
			const resolver = async (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = await currentResolver(params);
				return result[key];
			};
			return make(resolver);
		},
		to: (fn) => {
			const resolver = async (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = await currentResolver(params);
				return fn(result);
			};
			return make(resolver);
		},
		withDefault: (value) => {
			const resolver = async (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = await currentResolver(params);
				return result ?? value;
			};
			return make(resolver);
		},
		undefinedAsNull: () => {
			const resolver = async (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = await currentResolver(params);
				return (result ?? null) as Result extends undefined ? NonNullable<Result> | null : Result;
			};
			return make(resolver);
		},
		__make: () =>
			new SubscriptionCompiler<Expected, Source, Context, Args, Info>(
				field,
				new Map(store),
				[...middlewares],
				subscribe,
				currentResolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			),
	};
	return helpers;
}
