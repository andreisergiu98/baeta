import type { Middleware } from '../lib/middleware.ts';
import type { ModuleCompiler } from './module-compiler.ts';
import type { SetSchemaState } from './schema-state.ts';
import type { makePluginSymbol } from './symbols.ts';

export interface AppPlugin<State = unknown, SchemaState = undefined> {
	/**
	 * Unique id of the plugin
	 */
	id: PluginId<State>;

	/**
	 * Mutate function that receives the list of module compilers before they are built. This allows the plugin to modify the module compilers, for example by adding middlewares or transformers.
	 */
	mutate: (
		compilers: ModuleCompiler[],
	) => SchemaState extends undefined
		? { schemaState?: SetSchemaState<SchemaState> } | undefined
		: { schemaState: SetSchemaState<SchemaState> };
}

const stateTypeSymbol = Symbol.for('@baeta/core/app-plugin/state-type');

export type PluginId<State = unknown> = {
	key: symbol;
	name: string;
	definedIn: Error;
	[stateTypeSymbol]?: State;
};

export function createAppPluginId<State = unknown>(name: string): PluginId<State> {
	return {
		key: Symbol(name),
		name,
		definedIn: new Error(`Plugin "${name}" is not registered in the application.`),
	};
}

export type UsePlugin<
	Kind extends 'field' | 'type' | 'module' | 'subscription',
	Result,
	Source,
	Context,
	Args,
	Info,
	Extra,
	State = unknown,
> = {
	[makePluginSymbol]: {
		id: PluginId<State>;
		make: (
			session: MakePluginSession<Result, Source, Context, Args, Info>,
			metadata: { kind: Kind } & Extra,
		) => void;
	};
};

export type MakePluginSession<Result, Source, Context, Args, Info> = {
	addMiddleware: (
		middleware: Middleware<Result, Source, Context, Args, Info>,
	) => MakePluginSession<Result, Source, Context, Args, Info>;
	hasPluginState: (pluginId: PluginId) => boolean;
	getPluginState: <T>(pluginId: PluginId<T>) => Readonly<T> | undefined;
	setPluginState: <T>(
		pluginId: PluginId<T>,
		value: Readonly<T>,
	) => MakePluginSession<Result, Source, Context, Args, Info>;
	unsetPluginState: <T>(
		pluginId: PluginId<T>,
	) => MakePluginSession<Result, Source, Context, Args, Info>;
};
