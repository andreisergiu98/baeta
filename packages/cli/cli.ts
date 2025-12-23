import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createGenerateCommand } from './commands/generate/index.ts';
import { loadConfig } from './lib/config-loader.ts';
import { version } from './package.json';

process.on('exit', () => {
	const fixCursor = '\x1B[?25h';
	process.stdout.write(fixCursor);
});

async function run() {
	const config = await loadConfig();
	await yargs(hideBin(process.argv))
		.scriptName('baeta')
		.command(createGenerateCommand(config))
		.demandCommand()
		.version(version)
		.strict()
		.help()
		.parseAsync();
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
