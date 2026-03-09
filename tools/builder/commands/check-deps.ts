import { styleText } from 'node:util';
import ora from 'ora';
import type { CommandModule } from 'yargs';
import { type CheckDepsIssue, checkDependencies, scanPackageImports } from '../lib/check-deps.ts';
import { loadPackageJson } from '../lib/package-json.ts';

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const checkDepsCommand: CommandModule<{}, {}> = {
	command: 'check-deps',
	describe: 'Check that package dependencies match source imports',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const pkg = await loadPackageJson();
		const spinner = ora(
			`Checking dependencies for package ${styleText('bold', pkg.name)}...`,
		).start();
		const { sourceImports, testImports, hasNodeImport } = await scanPackageImports(process.cwd());
		const issues = checkDependencies(pkg, sourceImports, testImports, hasNodeImport);

		if (issues.length === 0) {
			spinner.succeed(`Dependencies are in sync for ${styleText('bold', pkg.name)}`);
			return;
		}

		spinner.fail(`Dependency issues in ${styleText('bold', pkg.name)}:\n`);

		for (const issue of issues) {
			console.log(`  ${formatIssueLabel(issue.type)} ${issue.message}`);
		}

		console.log();
		process.exit(1);
	},
};

function formatIssueLabel(type: CheckDepsIssue['type']): string {
	switch (type) {
		case 'missing-dependency':
		case 'missing-dev-dependency':
			return styleText('red', 'missing');
		case 'unused-dependency':
		case 'unused-dev-dependency':
			return styleText('yellow', 'unused');
		case 'wrong-type-should-be-dev':
		case 'wrong-type-should-be-dep':
			return styleText('magenta', 'wrong-type');
		case 'stale-override':
			return styleText('red', 'stale-override');
		default:
			return type satisfies never;
	}
}
