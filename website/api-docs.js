const TypeDoc = require('typedoc');
const fs = require('node:fs/promises');
const process = require('node:process');
const fg = require('fast-glob');

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

function injectTypeDocSidebar(items) {
	return items.map((item) => {
		if (item?.link?.id !== 'api/README') {
			return item;
		}

		item.label = 'API';
		item.items = item.items.map((item) => {
			if (!item.link) {
				return item;
			}

			const pattern = /api\/([^\/]+)\/README/;
			const match = item.link.id.match(pattern);
			const dir = match[1];
			item.label = dir;

			item.items = item.items.map((item) => {
				if (!item.link) {
					return item;
				}
				const pattern = /api\/[^\/]+\/([^\/]+)\/README/;
				const match = item.link.id.match(pattern);
				const file = match[1];
				item.label = file;
				return item;
			});

			return item;
		});

		return item;
	});
}

module.exports = {
	injectTypeDocSidebar,
};

if (process.argv.includes('--generate')) {
	generateDocs().catch(console.error);
}
