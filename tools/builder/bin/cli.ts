#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildCommand } from '../commands/build.ts';
import { checkCircularCommand } from '../commands/check-circular.ts';
import { prepareCommand } from '../commands/prepare.ts';
import { printResolvedVersionsCommand } from '../commands/print-resolved-versions.ts';
import { printTagCommand } from '../commands/print-tag.ts';
import { releaseCommand } from '../commands/release.ts';
import { testCommand } from '../commands/test.ts';

await yargs(hideBin(process.argv))
	.scriptName('builder')
	.command(buildCommand)
	.command(checkCircularCommand)
	.command(prepareCommand)
	.command(printResolvedVersionsCommand)
	.command(printTagCommand)
	.command(releaseCommand)
	.command(testCommand)
	.demandCommand()
	.help()
	.version(false)
	.parseAsync();
