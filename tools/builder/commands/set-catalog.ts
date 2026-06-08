import fs from 'node:fs/promises';
import path from 'node:path';
import symbols from 'log-symbols';
import { parseDocument } from 'yaml';
import type { CommandModule } from 'yargs';

interface SetCatalogArgs {
	name: string;
	version: string;
	catalog: string;
}

const yarnrcPath = path.join(process.cwd(), '.yarnrc.yml');

export const setCatalogCommand: CommandModule<{}, SetCatalogArgs> = {
	command: 'set-catalog <name> <version>',
	describe: 'Set a package version in a named catalog of .yarnrc.yml',
	builder: (yargs) => {
		return yargs
			.positional('name', {
				describe: 'Package name to update (e.g. graphql)',
				type: 'string',
				demandOption: true,
			})
			.positional('version', {
				describe: 'Version range to set (e.g. 16.6.0 or ^16.6.0)',
				type: 'string',
				demandOption: true,
			})
			.option('catalog', {
				describe: 'Named catalog to edit',
				type: 'string',
				default: 'dev',
			});
	},
	handler: async (args) => {
		const content = await fs.readFile(yarnrcPath, 'utf-8');
		const doc = parseDocument(content);

		const keyPath = ['catalogs', args.catalog, args.name];
		if (doc.getIn(keyPath) == null) {
			throw new Error(
				`No catalog entry for "${args.name}" in catalogs.${args.catalog} of .yarnrc.yml`,
			);
		}

		doc.setIn(keyPath, args.version);
		await fs.writeFile(yarnrcPath, doc.toString());

		console.info(`${symbols.success} Set catalogs.${args.catalog}.${args.name} to ${args.version}`);
	},
};
