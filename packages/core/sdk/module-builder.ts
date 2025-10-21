import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import { nameFunction } from '../utils/functions.ts';
import { type Extension, mergeExtensions } from './extension.ts';
import { ModuleCompiler } from './module-compiler.ts';
import type { ModuleMethods, TypesBuildersMap, TypesResolversMap } from './module-methods.ts';
import type { SchemaTransformer } from './transformer.ts';

export class ModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = Any,
	TypesResolvers extends TypesResolversMap<Context, Info> = Any,
> {
	readonly #name: string;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #typeBuilders: Readonly<TypesBuilders>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #transformers: Array<SchemaTransformer>;
	readonly #store: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, unknown, Context, unknown, Info>>;

	constructor(
		name: string,
		typedef: Readonly<DocumentNode>,
		typeBuilders: Readonly<TypesBuilders>,
		defaultResolvers: Readonly<IResolvers>,
		extensions: ReadonlyArray<Extension>,
		transformers: ReadonlyArray<SchemaTransformer>,
		store: Map<symbol, Readonly<unknown>>,
		middlewares: Array<Middleware<unknown, unknown, Context, unknown, Info>>,
	) {
		this.#name = name;
		this.#typedef = typedef;
		this.#typeBuilders = typeBuilders;
		this.#defaultResolvers = defaultResolvers;
		this.#extensions = extensions;
		this.#transformers = [...transformers];
		this.#store = new Map(store);
		this.#middlewares = [...middlewares];
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
					transformer.forEach((t) => {
						draftTransformers.push(t);
					});
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
			commit: () =>
				new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>(
					this.#name,
					this.#typedef,
					this.#typeBuilders,
					this.#defaultResolvers,
					this.#extensions,
					this.#transformers,
					draftStore,
					draftMiddlewares,
				),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): ModuleMethods<Context, Info, TypesBuilders, TypesResolvers> {
		const extensions = mergeExtensions(this.#extensions, (ext) =>
			ext.getModuleExtensions(this),
		) as unknown as BaetaExtensions.ModuleExtensions<
			Context,
			Info,
			ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>
		>;
		return {
			...extensions,
			...this.#typeBuilders,
			$schema: (types: TypesResolvers) => ({
				__make: () =>
					new ModuleCompiler(
						this.#name,
						new Map(this.#store),
						[...this.#middlewares],
						types,
						this.#typedef,
						this.#defaultResolvers,
						this.#extensions,
						[...this.#transformers],
					),
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
