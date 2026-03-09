import fs from 'node:fs';
import path from 'node:path';
import type { PlopTypes } from '@turbo/gen';

function getExampleDirs(): string[] {
	const examplesDir = path.resolve(process.cwd(), 'examples');
	const entries = fs.readdirSync(examplesDir, { withFileTypes: true });

	return entries
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
		.map((entry) => entry.name)
		.sort();
}

function buildGraphqlrcTemplate(dirs: string[]): string {
	const lines: string[] = ['projects:'];

	for (const name of dirs) {
		lines.push(`  examples/${name}:`);
		lines.push('    schema:');
		lines.push(`      - "examples/${name}/src/modules/**/*.gql"`);
		lines.push('    include:');
		lines.push(`      - "examples/${name}/src/**/*.gql"`);
		lines.push('');
	}

	return lines.join('\n');
}

export function buildGraphqlrcAction(): PlopTypes.ActionType {
	const dirs = getExampleDirs();
	const template = buildGraphqlrcTemplate(dirs);

	return {
		type: 'add',
		path: '../../.graphqlrc.yml',
		template,
		force: true,
	};
}
