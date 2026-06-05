import { execa } from 'execa';
import type { CommandModule } from 'yargs';
import { applyDistLinks, restoreDistLinks } from '../lib/dist-link.ts';

export const e2eCommand: CommandModule<{}, {}> = {
	command: 'e2e',
	describe: 'Run the e2e suite against compiled packages',
	handler: async () => {
		await applyDistLinks();
		try {
			await execa('yarn', ['turbo', 'e2e', '--filter=./e2e/*'], { stdio: 'inherit' });
		} finally {
			await restoreDistLinks();
		}
	},
};
