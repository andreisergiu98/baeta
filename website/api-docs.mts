import fs from 'node:fs/promises';
import type { TypeDocOptions } from 'typedoc';
import * as TypeDoc from 'typedoc';
import type { PluginOptions as DocusaurusThemePluginOptions } from 'typedoc-docusaurus-theme';
import { load as loadDocusaurusTheme } from 'typedoc-docusaurus-theme';
import type { PluginOptions as MarkdownPluginOptions } from 'typedoc-plugin-markdown';
import { load as loadMarkdownPlugin } from 'typedoc-plugin-markdown';

const noRm = process.argv.includes('--no-rm');

export async function generateDocs() {
	if (!noRm) {
		await fs.rm('./docs/api', { recursive: true, force: true });
	}

	const packagesDir = await fs.readdir('../packages', { withFileTypes: true });
	const dirs = packagesDir.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

	const plugin = [loadMarkdownPlugin, loadDocusaurusTheme] as unknown as TypeDocOptions['plugin'];

	const options: TypeDocOptions & MarkdownPluginOptions & DocusaurusThemePluginOptions = {
		out: './docs/api',
		entryPoints: dirs.map((dir) => `../packages/${dir}/`),
		entryPointStrategy: 'packages',
		plugin,
		readme: 'none',
		excludeExternals: true,
		disableSources: true,
		entryFileName: 'index.md',
		hidePageHeader: true,
		hideBreadcrumbs: true,
		excludeScopesInPaths: true,
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
		sidebar: {
			pretty: true,
			typescript: true,
			autoConfiguration: true,
			deprecatedItemClassName: 'typedoc-sidebar-item-deprecated',
		},
	};

	const app = await TypeDoc.Application.bootstrapWithPlugins(options);

	const project = await app.convert();

	if (!project) {
		throw new Error('Failed to convert project');
	}

	await app.generateOutputs(project);
}
