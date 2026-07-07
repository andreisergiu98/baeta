import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createGenerateCommand } from './commands/generate/index.ts';
import { loadConfig } from './lib/config-loader.ts';
import pkg from './package.json' with { type: 'json' };
import { makeErrorMessage } from './sdk/errors.tsx';

export async function run() {
	try {
		const config = await loadConfig();
		await yargs(hideBin(process.argv))
			.scriptName('baeta')
			.command(createGenerateCommand(config))
			.demandCommand()
			.version(pkg.version)
			.strict()
			.help()
			.parseAsync();
	} catch (err) {
		console.error(makeErrorMessage('Command failed.'), err);
		process.exitCode = 1;
	} finally {
		if (process.stdout.isTTY) {
			const fixCursor = '\x1B[?25h';
			process.stdout.write(fixCursor);
		}
	}
}
