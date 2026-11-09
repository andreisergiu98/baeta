import { getCliPlugins, makeErrorMessage } from '@baeta/cli-sdk';
import tab from '@bomb.sh/tab/citty';
import { type CommandMeta, defineCommand, runMain, showUsage } from 'citty';
import { createGenerateCommand } from './commands/generate.ts';
import { createCittyCommand } from './lib/command.ts';
import { type ConfigResult, loadConfig } from './lib/config-loader.ts';
import { createGenerator } from './lib/generator.ts';
import pkg from './package.json' with { type: 'json' };
import { flattenArrays } from './utils/array.ts';

export async function run() {
	try {
		const config = await loadConfig();
		const ctx = { config, generator: createGenerator(config) };
		const meta: CommandMeta = { name: 'baeta', version: pkg.version, description: pkg.description };
		const commands = [createGenerateCommand(), ...getPluginCommands(config)];
		const main = defineCommand({
			meta,
			subCommands: Object.fromEntries(
				commands.map((command) => [command.name, createCittyCommand(command, ctx, { meta })]),
			),
		});
		await tab(main);
		await runMain(main, {
			showUsage: async (...args) => {
				await showUsage(...args);
				if (!config.ok) {
					console.error(describeConfigError(config.error));
				}
			},
		});
	} catch (err) {
		console.error(makeErrorMessage('Command failed.'), err);
		process.exitCode = 1;
	}
}

function getPluginCommands(config: ConfigResult) {
	if (!config.ok) {
		return [];
	}
	return getCliPlugins(flattenArrays(config.config.plugins ?? [])).flatMap(
		(plugin) => plugin.commands,
	);
}

function describeConfigError(error: Error) {
	const message = makeErrorMessage(`${error.message} Commands from CLI plugins are unavailable.`);
	return error.cause instanceof Error ? `${message}\n${error.cause.message}` : message;
}
