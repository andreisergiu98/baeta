import path from 'node:path';
import { pathToFileURL } from 'node:url';
import symbols from 'log-symbols';
import type { CommandModule } from 'yargs';
import { applyRules, type GenerateRule } from '../lib/generate.ts';

interface GenerateArgs {
	config: string;
}

export const generateCommand: CommandModule<{}, GenerateArgs> = {
	command: 'generate <config>',
	describe: 'Apply a generate-rules config to sync fixtures and write generated files',
	builder: (yargs) => {
		return yargs.positional('config', {
			describe: 'Path to a module that default-exports an array of generate rules',
			type: 'string',
			demandOption: true,
		});
	},
	handler: async (args) => {
		const configPath = path.resolve(process.cwd(), args.config);
		const imported: { default?: unknown } = await import(pathToFileURL(configPath).href);
		const rules = imported.default;
		if (!Array.isArray(rules)) {
			throw new Error(`${args.config} must default-export an array of generate rules`);
		}
		await applyRules(rules as GenerateRule[]);
		console.log(`${symbols.success} Generated from ${args.config}`);
	},
};
