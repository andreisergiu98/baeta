import fs from 'node:fs/promises';
import { join } from 'node:path';
import styles from 'ansi-styles';
import { loadPackageJson } from './package-json.ts';

export async function checkExportFilesExist() {
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
	console.log(`${styles.green.open}✔${styles.green.close} Export files exist for ${pkg.name}`);
}
