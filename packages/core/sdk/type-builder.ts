import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import { nameFunction } from '../utils/functions.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { TypeCompiler } from './type-compiler.ts';
import type { FieldsBuildersMap, FieldsResolversMap, TypeMethods } from './type-methods.ts';

export class TypeBuilder<
	Source,
	Context,
	Info,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = Any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = Any,
> {
	readonly #type: string;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #fieldBuilders: Readonly<FieldsBuilders>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, Source, Context, unknown, Info>>;
	readonly #extensions: ReadonlyArray<Extension>;

	constructor(
		type: string,
		fieldBuilders: Readonly<FieldsBuilders>,
		extensions: ReadonlyArray<Extension>,
		store: Map<symbol, Readonly<unknown>>,
		middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>,
	) {
		this.#type = type;
		this.#fieldBuilders = fieldBuilders;
		this.#extensions = extensions;
		this.#store = new Map(store);
		this.#middlewares = [...middlewares];
	}

	get type() {
		return this.#type;
	}

	edit() {
		const draftStore = new Map(this.#store);
		const draftMiddlewares = [...this.#middlewares];
		const session = {
			type: this.#type,
			addMiddleware: (middleware: Middleware<unknown, Source, Context, unknown, Info>) => {
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
				new TypeBuilder(
					this.#type,
					this.#fieldBuilders,
					this.#extensions,
					draftStore,
					draftMiddlewares,
				),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): TypeMethods<Source, Context, Info, FieldsBuilders, FieldsResolvers> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getTypeExtensions(this),
		) as unknown as BaetaExtensions.TypeExtensions<
			Source,
			Context,
			Info,
			TypeBuilder<Source, Context, Info, FieldsBuilders, FieldsResolvers>
		>;
		return {
			...extensions,
			...this.#fieldBuilders,
			$fields: (fields: FieldsResolvers) => ({
				__make: () =>
					new TypeCompiler(this.#type, new Map(this.#store), [...this.#middlewares], fields),
			}),
			$use: (middleware) => {
				nameFunction(middleware, `${this.#type}.$use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
		};
	}
}
