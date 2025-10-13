import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { FieldCompiler } from './field-compiler.ts';
import type { FieldHelpers, FieldMethods, FieldWithMake } from './field-methods.ts';

export class FieldBuilder<Result, Source, Context, Args, Info> {
	readonly #type: string;
	readonly #field: string;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	readonly #extensions: ReadonlyArray<Extension>;

	constructor(
		type: string,
		field: string,
		extensions: ReadonlyArray<Extension>,
		store: Map<symbol, Readonly<unknown>>,
		middlewares: Array<Middleware<Result, Source, Context, Args, Info>>,
	) {
		this.#type = type;
		this.#field = field;
		this.#extensions = [...extensions];
		this.#store = new Map(store);
		this.#middlewares = [...middlewares];
	}

	get type() {
		return this.#type;
	}

	get field() {
		return this.#field;
	}

	edit() {
		const draftStore = new Map(this.#store);
		const draftMiddlewares = [...this.#middlewares];
		const session = {
			type: this.#type,
			field: this.#field,
			addMiddleware: (middleware: Middleware<Result, Source, Context, Args, Info>) => {
				draftMiddlewares.push(middleware);
				return session;
			},
			useStore: <T>(key: symbol) => {
				const get = () => draftStore.get(key) as T | undefined;
				const set = (value: Readonly<T>) => {
					draftStore.set(key, value);
				};
				return { get, set };
			},
			setStore: (key: symbol, value: Readonly<unknown>) => {
				draftStore.set(key, value);
				return session;
			},
			commit: () => {
				return new FieldBuilder(
					this.#type,
					this.#field,
					this.#extensions,
					draftStore,
					draftMiddlewares,
				);
			},
			commitToMethods: () => {
				return session.commit().toMethods();
			},
		} as const;
		return session;
	}

	#withMake<T>(resolver: Resolver<T, Source, Context, Args, Info>) {
		return createFieldWithMake(
			this.#type,
			this.#field,
			this.#extensions,
			this.#store,
			this.#middlewares,
			resolver,
		);
	}

	toMethods(): FieldMethods<Result, Source, Context, Args, Info> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getFieldExtensions(this),
		) as unknown as BaetaExtensions.FieldExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			FieldBuilder<Result, Source, Context, Args, Info>
		>;
		return {
			...extensions,
			use: (middleware) => {
				nameFunction(middleware, `${this.#type}.${this.#field}.use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
			key: <K extends keyof Source>(key: K) => {
				const resolver = (params: ResolverParams<Source, Context, Args, Info>) => {
					return params.source[key];
				};
				return this.#withMake(resolver);
			},
			map: (resolver) => {
				nameFunction(resolver, `${this.#type}.${this.#field}.map`);
				return this.#withMake(resolver);
			},
			resolve: (resolver) => {
				nameFunction(resolver, `${this.#type}.${this.#field}.resolve`);
				return this.#withMake(resolver);
			},
		};
	}
}

function createFieldWithMake<Expected, Result, Source, Context, Args, Info>(
	type: string,
	field: string,
	extensions: ReadonlyArray<Extension>,
	store: ReadonlyMap<symbol, Readonly<unknown>>,
	middlewares: ReadonlyArray<Middleware<Expected, Source, Context, Args, Info>>,
	currentResolver: Resolver<Result, Source, Context, Args, Info>,
): FieldHelpers<Expected, Result, Source, Context, Args, Info> {
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) =>
		createFieldWithMake<Expected, R, Source, Context, Args, Info>(
			type,
			field,
			extensions,
			store,
			middlewares,
			resolver,
		);
	const helpers: FieldWithMake<Expected, Result, Source, Context, Args, Info> = {
		map: (fn) => {
			nameFunction(fn, `${type}.${field}.map`);
			const resolver = (p: ResolverParams<Source, Context, Args, Info>) => {
				const result = currentResolver(p);
				return mapMaybePromise(result, (res) =>
					fn({ source: res, args: p.args, ctx: p.ctx, info: p.info }),
				);
			};
			return make(resolver);
		},
		resolve: (fn) => {
			nameFunction(fn, `${type}.${field}.resolve`);
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
			nameFunction(fn, `${type}.${field}.to`);
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
			new FieldCompiler<Expected, Source, Context, Args, Info>(
				type,
				field,
				new Map(store),
				[...middlewares],
				currentResolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			),
	};
	return helpers;
}
