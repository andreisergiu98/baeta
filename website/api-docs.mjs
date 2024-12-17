import fs from 'node:fs/promises';
import * as TypeDoc from 'typedoc';

const noRm = process.argv.includes('--no-rm');

async function generateDocs() {
	if (!noRm) {
		await fs.rm('./docs/api', { recursive: true, force: true });
	}

	const packagesDir = await fs.readdir('../packages', { withFileTypes: true });
	const dirs = packagesDir.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

	const app = await TypeDoc.Application.bootstrapWithPlugins({
		out: './docs/api',
		entryFileName: 'index.md',
		entryPoints: dirs.map((dir) => `../packages/${dir}/`),
		entryPointStrategy: 'packages',
		plugin: ['typedoc-plugin-markdown'],
		outputFileStrategy: 'modules',
		readme: 'none',
		hidePageHeader: true,
		hideBreadcrumbs: true,
		excludeExternals: true,
		excludeScopesInPaths: true,
		disableSources: true,
		formatWithPrettier: true,
		parametersFormat: 'htmlTable',
		propertiesFormat: 'htmlTable',
		typeDeclarationFormat: 'htmlTable',
		enumMembersFormat: 'htmlTable',
		pageTitleTemplates: {
			index: (args) => args.projectName,
			member: (args) => args.name,
			module: (args) => args.name,
		},
	});

	const project = await app.convert();

	if (!project) {
		throw new Error('Failed to convert project');
	}

	await app.generateOutputs(project);
}

generateDocs().catch(console.error);
