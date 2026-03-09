import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import { nameFunction } from '../utils/functions.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { ModuleCompiler } from './module-compiler.ts';
import type { ModuleMethods, TypesBuildersMap, TypesResolversMap } from './module-methods.ts';
import type { SchemaTransformer } from './transformer.ts';

export interface ModuleBuilderOptions<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
> {
	name: string;
	typedef: Readonly<DocumentNode>;
	typeBuilders: Readonly<TypesBuilders>;
	defaultResolvers: Readonly<IResolvers>;
	extensions: ReadonlyArray<Extension>;
	transformers: Array<SchemaTransformer>;
	store: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<unknown, unknown, Context, unknown, Info>>;
}

export class ModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
	TypesResolvers extends TypesResolversMap<Context, Info> = any,
> {
	readonly #name: string;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #typeBuilders: Readonly<TypesBuilders>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #transformers: ReadonlyArray<SchemaTransformer>;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, unknown, Context, unknown, Info>>;

	constructor(options: ModuleBuilderOptions<Context, Info, TypesBuilders>) {
		this.#name = options.name;
		this.#typedef = options.typedef;
		this.#typeBuilders = options.typeBuilders;
		this.#defaultResolvers = options.defaultResolvers;
		this.#extensions = options.extensions;
		this.#transformers = [...options.transformers];
		this.#store = new Map(options.store);
		this.#middlewares = [...options.middlewares];
	}

	get name() {
		return this.#name;
	}

	edit() {
		const draftStore = new Map(this.#store);
		const draftMiddlewares = [...this.#middlewares];
		const draftTransformers = [...this.#transformers];
		const session = {
			addMiddleware: (middleware: Middleware<unknown, unknown, Context, unknown, Info>) => {
				draftMiddlewares.push(middleware);
				return session;
			},
			addTransformer: (transformer: SchemaTransformer | SchemaTransformer[]) => {
				if (Array.isArray(transformer)) {
					for (const t of transformer) {
						draftTransformers.push(t);
					}
				} else {
					draftTransformers.push(transformer);
				}
				return session;
			},
			useStore: <T>(key: symbol) => {
				return {
					get: () => draftStore.get(key) as T | undefined,
					set: (value: Readonly<T>) => draftStore.set(key, value),
				};
			},
			setStore: (key: symbol, value: Readonly<unknown>) => {
				draftStore.set(key, value);
				return session;
			},
			commit: () =>
				new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
					name: this.#name,
					typedef: this.#typedef,
					typeBuilders: this.#typeBuilders,
					defaultResolvers: this.#defaultResolvers,
					extensions: this.#extensions,
					transformers: draftTransformers,
					store: draftStore,
					middlewares: draftMiddlewares,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): ModuleMethods<Context, Info, TypesBuilders, TypesResolvers> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getModuleExtensions(this),
		) as unknown as BaetaExtensions.ModuleExtensions<Context, Info>;
		return {
			...extensions,
			...this.#typeBuilders,
			$schema: (types: TypesResolvers) => ({
				__make: () =>
					new ModuleCompiler<Context, Info, TypesResolvers>({
						name: this.#name,
						store: new Map(this.#store),
						middlewares: [...this.#middlewares],
						typesMap: types,
						typedef: this.#typedef,
						defaultResolvers: this.#defaultResolvers,
						extensions: this.#extensions,
						transformers: [...this.#transformers],
					}),
			}),
			$use: (middleware) => {
				nameFunction(middleware, `${this.#name}.$use`);
				return this.edit().addMiddleware(middleware).commitToMethods();
			},
			$directive: (transformer) => {
				return this.edit().addTransformer(transformer).commitToMethods();
			},
		};
	}
}
