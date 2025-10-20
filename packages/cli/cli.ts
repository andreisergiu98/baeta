import yargs from 'yargs';
import { createGenerateCommand } from './commands/generate/index.ts';
import { loadConfig } from './lib/config-loader.ts';
import { version } from './package.json';

process.on('exit', () => {
	const fixCursor = '\x1B[?25h';
	process.stdout.write(fixCursor);
});

loadConfig().then((config) => {
	yargs(process.argv.slice(2))
		.scriptName('baeta')
		.command(createGenerateCommand(config))
		.demandCommand()
		.version(version)
		.help().argv;
});
