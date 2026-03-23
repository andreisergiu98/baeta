import madge from 'madge';
import ora from 'ora';
import type { CommandModule } from 'yargs';
import { loadPackageJson } from '../lib/package-json.ts';

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const checkCircularCommand: CommandModule<{}, {}> = {
	command: 'check-circular',
	describe: 'Test package for circular dependencies',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const pkg = await loadPackageJson();
		const spinner = ora(`Checking package ${pkg.name} for circular dependencies...`).start();

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
		const circularMessages = results.map(
			(items) => ` - Circular imports found in: ${items.join(' -> ')}`,
		);

		if (circularMessages.length > 0) {
			spinner.fail(
				`Circular dependencies found in package ${pkg.name}: \n${circularMessages.join('\n')}`,
			);
			process.exit(1);
		} else {
			spinner.succeed(`No circular dependencies found in package ${pkg.name}`);
		}
	},
};
