import type { Middleware } from '../lib/middleware.ts';
import type { Resolver, ResolverParams } from '../lib/resolver.ts';
import { nameFunction } from '../utils/functions.ts';
import { mapMaybePromise } from '../utils/promise.ts';
import type { PluginId } from './app-plugin.ts';
import { FieldCompiler } from './field-compiler.ts';
import type { Field, FieldMethods } from './field-methods.ts';
import { makePluginSymbol, makeSymbol } from './symbols.ts';

export interface FieldBuilderOptions<Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	metadata: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	requiredPluginIds: Set<PluginId>;
}

export class FieldBuilder<Result, Source, Context, Args, Info> {
	readonly #type: string;
	readonly #field: string;
	readonly #metadata: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: FieldBuilderOptions<Result, Source, Context, Args, Info>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#metadata = new Map(options.metadata);
		this.#middlewares = [...options.middlewares];
		this.#requiredPluginIds = new Set(options.requiredPluginIds);
	}

	get type() {
		return this.#type;
	}

	get field() {
		return this.#field;
	}

	#withMake<T>(resolver: Resolver<T, Source, Context, Args, Info>) {
		return createFieldWithMake({
			type: this.#type,
			field: this.#field,
			metadata: this.#metadata,
			middlewares: this.#middlewares,
			requiredPluginIds: this.#requiredPluginIds,
			resolver,
		});
	}

	edit() {
		const draftMetadata = new Map(this.#metadata);
		const draftMiddlewares = [...this.#middlewares];
		const draftRequiredPluginIds = new Set(this.#requiredPluginIds);
		const session = {
			type: this.#type,
			field: this.#field,
			addMiddleware: (mw: Middleware<Result, Source, Context, Args, Info>) => {
				draftMiddlewares.push(mw);
				return session;
			},
			mergeMeta: (meta: Map<symbol, unknown>) => {
				for (const [key, value] of meta) {
					draftMetadata.set(key, value as Readonly<unknown>);
				}
				return session;
			},
			addRequiredPluginId: (id: PluginId) => {
				draftRequiredPluginIds.add(id);
				return session;
			},
			commit: () =>
				new FieldBuilder({
					type: this.#type,
					field: this.#field,
					metadata: draftMetadata,
					middlewares: draftMiddlewares,
					requiredPluginIds: draftRequiredPluginIds,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): FieldMethods<Result, Source, Context, Args, Info> {
		return {
			$use: (input) => {
				if (typeof input === 'function') {
					nameFunction(input, `${this.#type}.${this.#field}.use`);
					return this.edit().addMiddleware(input).commitToMethods();
				}
				const result = input[makePluginSymbol]({
					type: this.#type,
					field: this.#field,
					kind: 'field',
				});
				const session = this.edit().addRequiredPluginId(result.id);
				if (result.middleware) {
					nameFunction(result.middleware, `${this.#type}.${this.#field}.use`);
					session.addMiddleware(result.middleware);
				}
				if (result.meta) {
					session.mergeMeta(result.meta);
				}
				return session.commitToMethods();
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

interface FieldWithMakeOptions<Expected, Result, Source, Context, Args, Info> {
	type: string;
	field: string;
	metadata: ReadonlyMap<symbol, Readonly<unknown>>;
	middlewares: ReadonlyArray<Middleware<Expected, Source, Context, Args, Info>>;
	requiredPluginIds: ReadonlySet<PluginId>;
	resolver: Resolver<Result, Source, Context, Args, Info>;
}

function createFieldWithMake<Expected, Result, Source, Context, Args, Info>(
	options: FieldWithMakeOptions<Expected, Result, Source, Context, Args, Info>,
): Field<Expected, Result, Source, Context, Args, Info> {
	const make = <R>(resolver: Resolver<R, Source, Context, Args, Info>) =>
		createFieldWithMake<Expected, R, Source, Context, Args, Info>({
			type: options.type,
			field: options.field,
			metadata: options.metadata,
			middlewares: options.middlewares,
			requiredPluginIds: options.requiredPluginIds,
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

	const fnNamespace = `${options.type}.${options.field}`;

	const helpers: Field<Expected, Result, Source, Context, Args, Info> = {
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
			new FieldCompiler<Expected, Source, Context, Args, Info>({
				type: options.type,
				field: options.field,
				metadata: new Map(options.metadata),
				middlewares: [...options.middlewares],
				requiredPluginIds: new Set(options.requiredPluginIds),
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
	return helpers;
}
