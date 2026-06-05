#! /usr/bin/env node

import symbols from 'log-symbols';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildCommand } from './commands/build.ts';
import { checkDepsCommand } from './commands/check-deps.ts';
import { checkTsconfigCommand } from './commands/check-tsconfig.ts';
import { e2eCommand } from './commands/e2e.ts';
import { prepareCommand } from './commands/prepare.ts';
import { printTagCommand } from './commands/print-tag.ts';
import { releaseCommand } from './commands/release.ts';
import { testCommand } from './commands/test.ts';
import { writeVersionsManifestCommand } from './commands/write-versions-manifest.ts';

export async function run() {
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
		.command(checkTsconfigCommand)
		.command(e2eCommand)
		.command(prepareCommand)
		.command(printTagCommand)
		.command(releaseCommand)
		.command(testCommand)
		.command(writeVersionsManifestCommand)
		.fail((msg, err, yargs) => {
			if (err) {
				yargs.showHelp();
				console.error(`\n${symbols.error} ${err.message}`);
				if (argv.includes('--verbose') || argv.includes('--verbose=true')) {
					console.error(err);
				}
			} else {
				yargs.showHelp();
				console.error(`\n${symbols.error} ${msg}`);
			}
			process.exit(1);
		})
		.demandCommand()
		.help()
		.version(false)
		.parseAsync();
}
