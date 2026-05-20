import fs from 'node:fs/promises';
import { join } from 'node:path';
import { SKIP_TSCONFIG_CHECK } from '@baeta/workspace-config';
import type { Workspace } from '@yarnpkg/core';
import symbols from 'log-symbols';
import ora from 'ora';
import type { CommandModule } from 'yargs';
import { buildLiteralSchema } from '../lib/literal-schema.ts';
import type { Pkg } from '../lib/package-json-schema.ts';
import { loadPackageJson } from '../lib/package-json.ts';
import { loadWorkspaceProject } from '../lib/workspace.ts';

interface CheckTsconfigArgs {
	'apply-fix': boolean;
}

export const checkTsconfigCommand: CommandModule<{}, CheckTsconfigArgs> = {
	command: 'check-tsconfig',
	describe: 'Validates tsconfig.json files in all workspaces',
	builder: (yargs) => {
		return yargs.option('apply-fix', {
			describe: 'Whether to apply fixes for common configuration issues',
			type: 'boolean',
			default: false,
		});
	},
	handler: async (args) => {
		const project = await loadWorkspaceProject();
		const errors: Error[] = [];
		for (const workspace of project.workspaces) {
			const result = await checkWorkspace(workspace, args);
			if (!result.success) {
				errors.push(result.error);
			}
		}

		if (errors.length > 0) {
			throw new Error(`Configuration issues found in workspaces`, {
				cause: new AggregateError(errors),
			});
		}
	},
};

async function checkWorkspace(workspace: Workspace, args: { applyFix: boolean }) {
	const pkg = await loadPackageJson(`${workspace.cwd}/package.json`);
	if (SKIP_TSCONFIG_CHECK.has(pkg.name)) {
		console.info(`${symbols.info} ${pkg.name}: skipping tsconfig check`);
		return { success: true } as const;
	}

	const spinner = ora(`${pkg.name}: checking tsconfig...`).start();

	const tsconfigPath = join(workspace.cwd, 'tsconfig.json');
	const tsconfig = await fs.readFile(tsconfigPath, 'utf-8').catch(() => {
		throw new Error(`${pkg.name}: tsconfig.json not found at ${tsconfigPath}`);
	});

	const withReact = hasDependency(pkg, 'react');
	const withNode = hasDependency(pkg, '@types/node');
	const withWorkers = hasDependency(pkg, '@cloudflare/workers-types');

	const expectedTypes = [
		withReact ? 'react' : null,
		withNode ? 'node' : null,
		withWorkers ? '@cloudflare/workers-types' : null,
	].filter((el) => el != null);

	const expectedTsconfig = {
		extends: '@baeta/tsconfig/tsconfig.json',
		compilerOptions: {
			rootDir: '.',
			jsx: withReact ? 'react-jsx' : undefined,
			types: expectedTypes.length > 0 ? expectedTypes : undefined,
			noUnusedLocals: pkg.name.startsWith('@baeta/e2e') ? false : undefined,
		},
		include: ['**/*.ts', withReact ? '**/*.tsx' : null].filter((el) => el != null),
		exclude: pkg.private ? undefined : ['dist'],
	};

	const tsconfigResult = buildLiteralSchema(expectedTsconfig).safeParse(JSON.parse(tsconfig));
	if (tsconfigResult.success) {
		spinner.succeed(`${pkg.name}: tsconfig is valid`);
		return { success: true } as const;
	}

	if (args.applyFix) {
		await fs.writeFile(tsconfigPath, JSON.stringify(expectedTsconfig, null, 2));
		spinner.stopAndPersist({
			symbol: symbols.warning,
			text: `${pkg.name}: tsconfig.json was invalid — applied fix`,
		});
		return { success: true } as const;
	}

	const errMessages = [
		`${pkg.name}: invalid tsconfig.json`,
		'Expected:',
		JSON.stringify(expectedTsconfig, null, 2),
		'Received:',
		tsconfig,
	].join('\n');

	spinner.fail(errMessages);

	return {
		success: false,
		error: new Error(`Invalid tsconfig.json in workspace ${pkg.name}`, {
			cause: tsconfigResult.error,
		}),
	};
}

function hasDependency(pkg: Pkg, depName: string): boolean {
	if (pkg.dependencies) {
		if (depName in pkg.dependencies) {
			return true;
		}
	}
	if (pkg.devDependencies) {
		if (depName in pkg.devDependencies) {
			return true;
		}
	}
	return false;
}
