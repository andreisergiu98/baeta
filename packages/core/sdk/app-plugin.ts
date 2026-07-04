import type { ModuleCompiler } from './module-compiler.ts';

export interface AppPlugin<State = unknown> {
	/**
	 * Unique id of the plugin
	 */
	id: PluginId<State>;

	/**
	 * Mutate function that receives the list of module compilers before they are built. This allows the plugin to modify the module compilers, for example by adding middlewares or transformers.
	 */
	mutate: (compilers: ModuleCompiler[]) => void;
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
