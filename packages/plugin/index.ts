export const PluginType = {
	Generator: 'generator',
	Cli: 'cli',
} as const;

export type PluginType = (typeof PluginType)[keyof typeof PluginType];
