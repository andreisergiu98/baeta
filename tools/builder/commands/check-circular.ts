import madge from 'madge';
import type { CommandModule } from 'yargs';

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const checkCircularCommand: CommandModule<{}, {}> = {
	command: 'check-circular',
	describe: 'Test package for circular dependencies',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const tester = await madge(process.cwd(), {
			fileExtensions: ['ts', 'tsx'],
			detectiveOptions: {
				ts: {
					skipTypeImports: true,
				},
				tsx: {
					skipTypeImports: true,
				},
			},
		});

		const results = await tester.circular();

		for (const items of results) {
			console.log(`Circular imports found in: ${items.join(' -> ')}`);
		}

		if (results.length > 0) {
			process.exit(1);
		}
	},
};
