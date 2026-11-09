import { PluginType } from '@baeta/plugin';
import type { CliCommand } from './command.ts';

export const CliPluginVersion = {
	V1: 'v1',
} as const;

export type CliPluginVersion = (typeof CliPluginVersion)[keyof typeof CliPluginVersion];

export interface CliPluginV1Factory {
	name: string;
	commands: CliCommand[];
}

export interface CliPluginV1 {
	name: string;
	version: typeof CliPluginVersion.V1;
	type: typeof PluginType.Cli;
	commands: CliCommand[];
}

export function createCliPlugin(options: CliPluginV1Factory): CliPluginV1 {
	return {
		name: options.name,
		version: CliPluginVersion.V1,
		type: PluginType.Cli,
		commands: options.commands,
	};
}

export function isCliPlugin(plugin: { type: PluginType }): plugin is CliPluginV1 {
	return plugin.type === PluginType.Cli;
}

export function getCliPlugins(plugins?: Array<{ type: PluginType }>) {
	if (!plugins) {
		return [];
	}
	return plugins.filter(isCliPlugin);
}
