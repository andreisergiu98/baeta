import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import { nameFunction } from '../utils/functions.ts';
import type { PluginId } from './app-plugin.ts';
import { ModuleCompiler } from './module-compiler.ts';
import type { ModuleMethods, TypesBuildersMap, TypesResolversMap } from './module-methods.ts';
import { makePluginSymbol, makeSymbol } from './symbols.ts';
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
	transformers: Array<SchemaTransformer>;
	state: Map<symbol, Readonly<unknown>>;
	middlewares: Array<Middleware<unknown, unknown, Context, unknown, Info>>;
	requiredPluginIds: Set<PluginId>;
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
	readonly #transformers: ReadonlyArray<SchemaTransformer>;
	readonly #state: ReadonlyMap<symbol, Readonly<unknown>>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, unknown, Context, unknown, Info>>;
	readonly requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: ModuleBuilderOptions<Context, Info, TypesBuilders>) {
		this.#name = options.name;
		this.#typedef = options.typedef;
		this.#typeBuilders = options.typeBuilders;
		this.#defaultResolvers = options.defaultResolvers;
		this.#transformers = [...options.transformers];
		this.#state = new Map(options.state);
		this.#middlewares = [...options.middlewares];
		this.requiredPluginIds = new Set(options.requiredPluginIds);
	}

	get name() {
		return this.#name;
	}

	edit() {
		const draftState = new Map(this.#state);
		const draftMiddlewares = [...this.#middlewares];
		const draftTransformers = [...this.#transformers];
		const draftRequiredPluginIds = new Set(this.requiredPluginIds);
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
			addRequiredPluginId: (id: PluginId) => {
				draftRequiredPluginIds.add(id);
				return session;
			},
			setPluginState: <T>(pluginId: PluginId<T>, value: T) => {
				draftState.set(pluginId.key, value as Readonly<unknown>);
				return session;
			},
			mergeState: (state: Map<symbol, unknown>) => {
				for (const [key, value] of state) {
					draftState.set(key, value as Readonly<unknown>);
				}
				return session;
			},
			commit: () =>
				new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
					name: this.#name,
					typedef: this.#typedef,
					typeBuilders: this.#typeBuilders,
					defaultResolvers: this.#defaultResolvers,
					transformers: draftTransformers,
					state: draftState,
					middlewares: draftMiddlewares,
					requiredPluginIds: draftRequiredPluginIds,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): ModuleMethods<Context, Info, TypesBuilders, TypesResolvers> {
		return {
			...this.#typeBuilders,
			$schema: (types: TypesResolvers) => ({
				[makeSymbol]: () =>
					new ModuleCompiler<Context, Info, TypesResolvers>({
						name: this.#name,
						state: new Map(this.#state),
						middlewares: [...this.#middlewares],
						typesMap: types,
						typedef: this.#typedef,
						defaultResolvers: this.#defaultResolvers,
						transformers: [...this.#transformers],
						requiredPluginIds: new Set(this.requiredPluginIds),
					}),
			}),
			$use: (input) => {
				if (typeof input === 'function') {
					nameFunction(input, `${this.#name}.use`);
					return this.edit().addMiddleware(input).commitToMethods();
				}
				const result = input[makePluginSymbol]({ name: this.#name, kind: 'module' });
				const session = this.edit().addRequiredPluginId(result.id);
				if (result.middleware) {
					nameFunction(result.middleware, `${this.#name}.use`);
					session.addMiddleware(result.middleware);
				}
				if (result.state) {
					session.setPluginState(result.id, result.state);
				}
				return session.commitToMethods();
			},
			$directive: (transformer) => {
				return this.edit().addTransformer(transformer).commitToMethods();
			},
		};
	}
}
