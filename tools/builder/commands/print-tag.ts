import type { CommandModule } from 'yargs';
import { getPreReleaseTag } from '../lib/release-tag.ts';

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const printTagCommand: CommandModule<{}, {}> = {
	command: 'print-tag',
	describe: 'Print the release tag',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const tag = await getPreReleaseTag();
		process.stdout.write(tag);
	},
};
