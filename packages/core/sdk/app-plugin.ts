import type { ModuleCompiler } from './module-compiler.ts';

export interface AppPlugin {
	/**
	 * Unique id of the plugin
	 */
	id: PluginId;

	/**
	 * Name of the plugin, used for logging and debugging purposes.
	 */
	name: string;

	/**
	 * Mutate function that receives the list of module compilers before they are built. This allows the plugin to modify the module compilers, for example by adding middlewares or transformers.
	 */
	mutate: (compilers: ModuleCompiler[]) => void;
}

export type PluginId = {
	id: symbol;
	name: string;
	definedIn: Error;
};

export function createAppPluginId(name: string): PluginId {
	const id = Symbol(name);
	return {
		id,
		name,
		definedIn: new Error(`Plugin "${name}" is not registered in the application.`),
	};
}
