import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import type { Any } from '../types/any.ts';
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

export class SubscriptionBuilder<Result, Source, Context, Args, Info> {
	readonly #field: string;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #middlewares: ReadonlyArray<
		Middleware<SubscriptionWrapper, Source, Context, Args, Info>
	>;

	constructor(
		field: string,
		extensions: ReadonlyArray<Extension>,
		store: Map<symbol, Readonly<unknown>>,
		middlewares: Array<Middleware<SubscriptionWrapper, Source, Context, Args, Info>>,
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
				nameFunction(middleware, `Subscription.${this.#field}.use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
			subscribe: <T = Result>(fn: Resolver<Subscription<T>, Source, Context, Args, Info>) => {
				nameFunction(fn, `Subscription.${this.#field}.subscribe`);
				const subscribe = (params: ResolverParams<Source, Context, Args, Info>) => {
					return mapMaybePromise(fn(params), (iterator) => ({
						__internal__asyncIterable: iterator,
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
	middlewares: ReadonlyArray<Middleware<SubscriptionWrapper, Any, Context, Args, Info>>,
	subscribe: Resolver<SubscriptionWrapper<Any>, Any, Context, Args, Info>,
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
	const helpers: SubscriptionFieldWithMake<Expected, Result, Source, Context, Args, Info> = {
		map: <R>(fn: Resolver<R, Result, Context, Args, Info>) => {
			nameFunction(fn, `Subscription.${field}.map`);
			const resolver = (p: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(p);
				return mapMaybePromise(result, (res) =>
					fn({ source: res, args: p.args, ctx: p.ctx, info: p.info }),
				);
			};
			return make(resolver);
		},
		resolve: (fn) => {
			nameFunction(fn, `Subscription.${field}.resolve`);
			const resolver = (p: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(p);
				return mapMaybePromise(result, (res) =>
					fn({ source: res, args: p.args, ctx: p.ctx, info: p.info }),
				);
			};
			return make(resolver);
		},
		key: (key) => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(params);
				return mapMaybePromise(result, (res) => res[key]);
			};
			return make(resolver);
		},
		to: (fn) => {
			nameFunction(fn, `Subscription.${field}.to`);
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(params);
				return mapMaybePromise(result, fn);
			};
			return make(resolver);
		},
		withDefault: (value) => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(params);
				return mapMaybePromise(result, (res) => res ?? value);
			};
			return make(resolver);
		},
		undefinedAsNull: () => {
			const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(params);
				return mapMaybePromise(
					result,
					(res) => (res ?? null) as Result extends undefined ? NonNullable<Result> | null : Result,
				);
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
