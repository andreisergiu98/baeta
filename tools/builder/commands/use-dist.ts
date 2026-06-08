import type { CommandModule } from 'yargs';
import { applyDistLinks, restoreDistLinks } from '../lib/dist-link.ts';

interface UseDistArgs {
	restore?: boolean;
}

export const useDist: CommandModule<{}, UseDistArgs> = {
	command: 'use-dist',
	describe: 'Switch to dist exports for all packages',
	builder: (yargs) => {
		return yargs.option('restore', {
			describe: 'Restore the package to its state before use-dist',
			type: 'boolean',
			default: false,
		});
	},
	handler: async (args) => {
		if (args.restore) {
			await restoreDistLinks();
		} else {
			await applyDistLinks();
		}
	},
};
