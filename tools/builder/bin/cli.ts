#! /usr/bin/env node

import symbols from 'log-symbols';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildCommand } from '../commands/build.ts';
import { checkDepsCommand } from '../commands/check-deps.ts';
import { prepareCommand } from '../commands/prepare.ts';
import { printResolvedVersionsCommand } from '../commands/print-resolved-versions.ts';
import { printTagCommand } from '../commands/print-tag.ts';
import { releaseCommand } from '../commands/release.ts';
import { testCommand } from '../commands/test.ts';

const argv = hideBin(process.argv);

await yargs(argv)
	.scriptName('builder')
	.option('verbose', {
		describe: 'Show stack traces and verbose error output',
		type: 'boolean',
		default: false,
		global: true,
	})
	.command(buildCommand)
	.command(checkDepsCommand)
	.command(prepareCommand)
	.command(printResolvedVersionsCommand)
	.command(printTagCommand)
	.command(releaseCommand)
	.command(testCommand)
	.fail((msg, err, yargs) => {
		if (err) {
			yargs.showHelp();
			console.error(`${symbols.error} ${err.message}`);
			if (argv.includes('--verbose') || argv.includes('--verbose=true')) {
				console.error(err);
			}
			process.exit(1);
		}
		yargs.showHelp();
		console.error(`${symbols.error} ${msg}`);
		process.exit(1);
	})
	.demandCommand()
	.help()
	.version(false)
	.parseAsync();
