import type { Middleware } from '../lib/middleware.ts';
import { nameFunction } from '../utils/functions.ts';
import type { PluginId } from './app-plugin.ts';
import { makePluginSymbol, makeSymbol } from './symbols.ts';
import { TypeCompiler } from './type-compiler.ts';
import type { FieldsBuildersMap, FieldsResolversMap, TypeMethods } from './type-methods.ts';

export interface TypeBuilderOptions<
	Source,
	Context,
	Info,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
> {
	type: string;
	fieldBuilders: Readonly<FieldsBuilders>;
	state: ReadonlyMap<symbol, unknown>;
	middlewares: Array<Middleware<unknown, Source, Context, unknown, Info>>;
	requiredPluginIds: Set<PluginId>;
}

export class TypeBuilder<
	Source,
	Context,
	Info,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = any,
> {
	readonly #type: string;
	readonly #state: ReadonlyMap<symbol, unknown>;
	readonly #fieldBuilders: Readonly<FieldsBuilders>;
	readonly #middlewares: ReadonlyArray<Middleware<unknown, Source, Context, unknown, Info>>;
	readonly requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: TypeBuilderOptions<Source, Context, Info, FieldsBuilders>) {
		this.#type = options.type;
		this.#fieldBuilders = options.fieldBuilders;
		this.#state = new Map(options.state);
		this.#middlewares = [...options.middlewares];
		this.requiredPluginIds = new Set(options.requiredPluginIds);
	}

	get type() {
		return this.#type;
	}

	edit() {
		const draftState = new Map(this.#state);
		const draftMiddlewares = [...this.#middlewares];
		const draftRequiredPluginIds = new Set(this.requiredPluginIds);
		const session = {
			type: this.#type,
			addMiddleware: (middleware: Middleware<unknown, Source, Context, unknown, Info>) => {
				draftMiddlewares.push(middleware);
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
				new TypeBuilder({
					type: this.#type,
					fieldBuilders: this.#fieldBuilders,
					state: draftState,
					middlewares: draftMiddlewares,
					requiredPluginIds: draftRequiredPluginIds,
				}),
			commitToMethods: () => session.commit().toMethods(),
		} as const;
		return session;
	}

	toMethods(): TypeMethods<Source, Context, Info, FieldsBuilders, FieldsResolvers> {
		return {
			...this.#fieldBuilders,
			$fields: (fields: FieldsResolvers) => ({
				[makeSymbol]: () =>
					new TypeCompiler({
						type: this.#type,
						state: new Map(this.#state),
						middlewares: [...this.#middlewares],
						fieldsMap: fields,
						requiredPluginIds: new Set(this.requiredPluginIds),
					}),
			}),
			$use: (input) => {
				if (typeof input === 'function') {
					nameFunction(input, `${this.#type}.use`);
					return this.edit().addMiddleware(input).commitToMethods();
				}
				const plugin = input[makePluginSymbol];
				const session = this.edit().addRequiredPluginId(plugin.id);
				plugin.make(session, {
					kind: 'type',
					type: this.#type,
				});
				return session.commitToMethods();
			},
		};
	}
}
