import type { Middleware } from '../lib/middleware.ts';
import { nameFunction } from '../utils/functions.ts';
import type { PluginId, UsePlugin } from './app-plugin.ts';
import { makePluginSymbol } from './symbols.ts';

export interface BuilderContext<Result, Source, Context, Args, Info> {
	state: ReadonlyMap<symbol, unknown>;
	middlewares: ReadonlyArray<Middleware<Result, Source, Context, Args, Info>>;
	requiredPluginIds: ReadonlySet<PluginId>;
}

export function createBuilderContext<Result, Source, Context, Args, Info>(
	context: BuilderContext<Result, Source, Context, Args, Info>,
): BuilderContext<Result, Source, Context, Args, Info> {
	return {
		state: new Map(context.state),
		middlewares: [...context.middlewares],
		requiredPluginIds: new Set(context.requiredPluginIds),
	};
}

export function createEmptyBuilderContext<Result, Source, Context, Args, Info>(): BuilderContext<
	Result,
	Source,
	Context,
	Args,
	Info
> {
	return {
		state: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
	};
}

export class BuilderEditor<
	Result,
	Source,
	Context,
	Args,
	Info,
	Builder extends { toMethods: () => Methods },
	Methods = ReturnType<Builder['toMethods']>,
> {
	#draftState: Map<symbol, unknown>;
	#draftMiddlewares: Array<Middleware<Result, Source, Context, Args, Info>>;
	#draftRequiredPluginIds: Set<PluginId>;
	#underlyingCommit: (context: BuilderContext<Result, Source, Context, Args, Info>) => Builder;

	constructor(
		context: BuilderContext<Result, Source, Context, Args, Info>,
		commit: (context: BuilderContext<Result, Source, Context, Args, Info>) => Builder,
	) {
		this.#draftState = new Map(context.state);
		this.#draftMiddlewares = [...context.middlewares];
		this.#draftRequiredPluginIds = new Set(context.requiredPluginIds);
		this.#underlyingCommit = commit;
	}

	addMiddleware(middleware: Middleware<Result, Source, Context, Args, Info>) {
		this.#draftMiddlewares.push(middleware);
		return this;
	}

	addRequiredPluginId(id: PluginId) {
		this.#draftRequiredPluginIds.add(id);
		return this;
	}

	use<Kind extends 'field' | 'type' | 'module' | 'subscription', Extra>(
		input:
			| Middleware<Result, Source, Context, Args, Info>
			| UsePlugin<Kind, Result, Source, Context, Args, Info, Extra>,
		name: string,
		metadata: NoInfer<{ kind: Kind } & Extra>,
	) {
		if (typeof input === 'function') {
			nameFunction(input, name);
			return this.addMiddleware(input);
		}
		const plugin = input[makePluginSymbol];
		plugin.make(this.addRequiredPluginId(plugin.id), metadata);
		return this;
	}

	hasPluginState(pluginId: PluginId) {
		return this.#draftState.has(pluginId.key);
	}

	getPluginState<T>(pluginId: PluginId<T>) {
		return this.#draftState.get(pluginId.key) as Readonly<T> | undefined;
	}

	setPluginState<T>(pluginId: PluginId<T>, value: Readonly<T>) {
		this.#draftState.set(pluginId.key, value);
		return this;
	}

	unsetPluginState<T>(pluginId: PluginId<T>) {
		this.#draftState.delete(pluginId.key);
		return this;
	}

	commit() {
		return this.#underlyingCommit(
			createBuilderContext({
				state: this.#draftState,
				middlewares: this.#draftMiddlewares,
				requiredPluginIds: this.#draftRequiredPluginIds,
			}),
		);
	}

	commitToMethods() {
		return this.commit().toMethods();
	}
}
