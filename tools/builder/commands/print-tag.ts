import type { CommandModule } from 'yargs';
import { getReleaseTag } from '../lib/release-tag.ts';

export const printTagCommand: CommandModule<{}, {}> = {
	command: 'print-tag',
	describe: 'Print the release tag',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const tag = await getReleaseTag();
		process.stdout.write(tag);
	},
};
