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
	state: ReadonlyMap<symbol, unknown>;
	middlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	requiredPluginIds: Set<PluginId>;
}

export class FieldBuilder<Result, Source, Context, Args, Info> {
	readonly #type: string;
	readonly #field: string;
	readonly #state: ReadonlyMap<symbol, unknown>;
	readonly #middlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: FieldBuilderOptions<Result, Source, Context, Args, Info>) {
		this.#type = options.type;
		this.#field = options.field;
		this.#state = new Map(options.state);
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
			state: this.#state,
			middlewares: this.#middlewares,
			requiredPluginIds: this.#requiredPluginIds,
			resolver,
		});
	}

	edit() {
		const draftState = new Map(this.#state);
		const draftMiddlewares = [...this.#middlewares];
		const draftRequiredPluginIds = new Set(this.#requiredPluginIds);
		const session = {
			type: this.#type,
			field: this.#field,
			addMiddleware: (mw: Middleware<Result, Source, Context, Args, Info>) => {
				draftMiddlewares.push(mw);
				return session;
			},
			addRequiredPluginId: (id: PluginId) => {
				draftRequiredPluginIds.add(id);
				return session;
			},
			hasPluginState: (pluginId: PluginId) => draftState.has(pluginId.key),
			getPluginState: <T>(pluginId: PluginId<T>) =>
				draftState.get(pluginId.key) as Readonly<T> | undefined,
			setPluginState: <T>(pluginId: PluginId<T>, value: Readonly<T>) => {
				draftState.set(pluginId.key, value);
				return session;
			},
			unsetPluginState: <T>(pluginId: PluginId<T>) => {
				draftState.delete(pluginId.key);
				return session;
			},
			commit: () =>
				new FieldBuilder({
					type: this.#type,
					field: this.#field,
					state: draftState,
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
				const plugin = input[makePluginSymbol];
				const session = this.edit().addRequiredPluginId(plugin.id);
				plugin.make(session, {
					kind: 'field',
					type: this.#type,
					field: this.#field,
				});
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
	state: ReadonlyMap<symbol, unknown>;
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
			state: options.state,
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
				state: new Map(options.state),
				middlewares: [...options.middlewares],
				requiredPluginIds: new Set(options.requiredPluginIds),
				resolver: options.resolver as unknown as Resolver<Expected, Source, Context, Args, Info>,
			}),
	};
	return helpers;
}
