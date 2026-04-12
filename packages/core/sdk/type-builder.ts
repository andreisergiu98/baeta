import type { Middleware } from '../lib/middleware.ts';
import { nameFunction } from '../utils/functions.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { TypeCompiler } from './type-compiler.ts';
import type { FieldsBuildersMap, FieldsResolversMap, TypeMethods } from './type-methods.ts';

export interface TypeBuilderOptions<
	Source,
	Context,
	Info,
	ModuleName extends string,
	TypeName extends string,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
> {
	module: ModuleName;
	type: TypeName;
	fieldBuilders: Readonly<FieldsBuilders>;
	extensions: ReadonlyArray<Extension>;
	store: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
}

export class TypeBuilder<
	Source,
	Context,
	Info,
	ModuleName extends string,
	TypeName extends string,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = any,
> {
	readonly #module: ModuleName;
	readonly #type: TypeName;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #fieldBuilders: Readonly<FieldsBuilders>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, Source, Context, unknown, Info>>;
	readonly #extensions: ReadonlyArray<Extension>;

	constructor(
		options: TypeBuilderOptions<Source, Context, Info, ModuleName, TypeName, FieldsBuilders>,
	) {
		this.#module = options.module;
		this.#type = options.type;
		this.#fieldBuilders = options.fieldBuilders;
		this.#extensions = options.extensions;
		this.#store = new Map(options.store);
		this.#middlewares = [...options.middlewares];
	}

	get module() {
		return this.#module;
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
				new TypeBuilder({
					module: this.#module,
					type: this.#type,
					fieldBuilders: this.#fieldBuilders,
					extensions: this.#extensions,
					store: draftStore,
					middlewares: draftMiddlewares,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): TypeMethods<
		Source,
		Context,
		Info,
		ModuleName,
		TypeName,
		FieldsBuilders,
		FieldsResolvers
	> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getTypeExtensions(this),
		) as unknown as BaetaExtensions.TypeExtensions<Source, Context, Info, ModuleName, TypeName>;
		return {
			...extensions,
			...this.#fieldBuilders,
			$fields: (fields: FieldsResolvers) => ({
				__make: () =>
					new TypeCompiler({
						type: this.#type,
						store: new Map(this.#store),
						middlewares: [...this.#middlewares],
						fieldsMap: fields,
					}),
			}),
			$use: (middleware) => {
				nameFunction(middleware, `${this.#type}.$use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
		};
	}
}
