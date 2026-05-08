import fs from 'node:fs/promises';
import { join } from 'node:path';
import ora from 'ora';
import { build } from 'tsdown';
import type { CommandModule } from 'yargs';
import { loadPackageJson } from '../lib/package-json.ts';

export const buildCommand: CommandModule<{}, {}> = {
	command: 'build',
	describe: 'Build package for publishing',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const pkg = await loadPackageJson();

		const buildSpinner = ora(`Building package ${pkg.name}...`).start();
		await build({
			logLevel: 'warn',
		})
			.then(() => {
				buildSpinner.succeed(`Package ${pkg.name} built successfully`);
			})
			.catch((error) => {
				buildSpinner.fail(`Package ${pkg.name} build failed`);
				throw error;
			});

		const checkSpinner = ora(`Checking export files for package ${pkg.name}...`).start();
		await checkExportFilesExist()
			.then(() => {
				checkSpinner.succeed(`Export files for package ${pkg.name} are valid`);
			})
			.catch((error) => {
				checkSpinner.fail(`Export file check failed for package ${pkg.name}`);
				throw error;
			});
	},
};

async function checkExportFilesExist() {
	const pkg = await loadPackageJson();
	const exports = pkg.publishConfig?.exports ?? {};
	const bin = pkg.publishConfig?.bin || pkg.bin;

	const promises: Promise<void>[] = [];

	const checkFile = async (path: string) => {
		const promise = fs
			.stat(join(process.cwd(), path))
			.then((res) => {
				if (!res.isFile()) {
					throw new Error(`Dist file is not a file: ${path} in package ${pkg.name}`);
				}
			})
			.catch(() => {
				throw new Error(`Dist file not found: ${path} in package ${pkg.name}`);
			});
		promises.push(promise);
	};

	for (const entry in exports) {
		const entryExport = exports[entry];
		for (const condition in entryExport) {
			const conditionExport = entryExport[condition as keyof typeof entryExport];
			if (conditionExport == null) {
				throw new Error(
					`Export entry ${entry} is missing condition ${condition} in package ${pkg.name}`,
				);
			}
			if (condition === 'require') {
				throw new Error(
					`Export entry ${entry} has a 'require' condition, which is not supported in package ${pkg.name}.`,
				);
			}
			promises.push(checkFile(conditionExport));
		}
	}

	if (typeof bin === 'string') {
		promises.push(checkFile(bin));
	} else {
		for (const name in bin) {
			const filePath = bin[name];
			promises.push(checkFile(filePath));
		}
	}

	const mandatoryFiles = ['dist', 'package.json'];
	const missingFiles = mandatoryFiles.filter((file) => !pkg.files?.includes(file));
	if (missingFiles.length > 0) {
		throw new Error(`Missing files inclusion in package ${pkg.name}: ${missingFiles.join(', ')}`);
	}
	await Promise.all(promises);
}
