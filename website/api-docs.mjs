import fs from 'node:fs/promises';
import * as TypeDoc from 'typedoc';

async function cleanupDocs() {
	await fs.rm('./docs/api/_media', { recursive: true, force: true });
	await fs.unlink('./docs/api/README.md');
}

async function generateDocs() {
	await fs.rm('./docs/api', { recursive: true, force: true });

	const packagesDir = await fs.readdir('../packages', { withFileTypes: true });
	const dirs = packagesDir.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

	const app = await TypeDoc.Application.bootstrapWithPlugins({
		entryPoints: dirs.map((dir) => `../packages/${dir}/`),
		entryPointStrategy: 'packages',
		plugin: ['typedoc-plugin-markdown'],
		hidePageHeader: true,
		hideBreadcrumbs: true,
		excludeExternals: true,
		excludeScopesInPaths: true,
	});

	const project = await app.convert();

	if (!project) {
		throw new Error('Failed to convert project');
	}

	await app.generateDocs(project, './docs/api/');

	await cleanupDocs();

	await fs.rename('./docs/api/packages.md', './docs/api/README.md');
}

generateDocs().catch(console.error);
