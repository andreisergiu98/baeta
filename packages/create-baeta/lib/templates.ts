import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { logger } from '@docusaurus/logger';
import fs from 'fs-extra';
import prompts, { type Choice } from 'prompts';
import apolloPackageJson from '../templates/apollo/package.json';
import yogaPackageJson from '../templates/yoga/package.json';
import dependenciesVersions from '../versions.json';
import { gitignoreUrl } from './constants.ts';
import { createTsconfig } from './tsconfig.ts';

const recommendedTemplate = 'yoga';
const templatesDir = fileURLToPath(new URL('../templates', import.meta.url));

type Template = {
	name: string;
	path: string;
	packageJson?: string;
};

function createPackageJSON(
	appName: string,
	packageJson: {
		name: string;
		dependencies: Record<string, string>;
		devDependencies: Record<string, string>;
	},
) {
	const meta = structuredClone(packageJson);

	for (const [dep, version] of Object.entries(dependenciesVersions)) {
		if (dep in meta.dependencies) {
			meta.dependencies[dep] = version;
		} else if (dep in packageJson.devDependencies) {
			meta.devDependencies[dep] = version;
		}
	}

	meta.name = appName;

	return JSON.stringify(meta, null, 2);
}

function getPackageJson(appName: string, templateName: string) {
	if (templateName === 'yoga') {
		return createPackageJSON(appName, yogaPackageJson);
	}

	if (templateName === 'apollo') {
		return createPackageJSON(appName, apolloPackageJson);
	}
}

async function readTemplates(appName: string): Promise<Template[]> {
	const dirContents = await fs.readdir(templatesDir);

	const templates = dirContents
		.filter((template) => template !== 'shared')
		.map((template) => ({
			name: template,
			path: path.join(templatesDir, template),
			packageJson: getPackageJson(appName, template),
		}));

	return templates.sort(
		(a, b) => Number(a.name !== recommendedTemplate) - Number(b.name !== recommendedTemplate),
	);
}

function createTemplateChoices(templates: Template[]): Choice[] {
	function makeNameAndValueChoice(value: string | Template): Choice {
		if (typeof value === 'string') {
			return { title: value, value };
		}
		return { title: value.name, value };
	}

	return templates.map((template) => makeNameAndValueChoice(template));
}

async function askTemplateChoice({
	templates,
}: {
	templates: Template[];
}) {
	return prompts(
		{
			type: 'select',
			name: 'template',
			message: 'Select a template below...',
			choices: createTemplateChoices(templates),
		},
		{
			onCancel() {
				logger.error('A choice is required.');
				process.exit(1);
			},
		},
	).then((result) => {
		return (result as { template: Template }).template;
	});
}
async function fetchGitignore() {
	try {
		const response = await fetch(gitignoreUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch gitignore: ${response.statusText}`);
		}

		return response.text();
	} catch (error) {}
}

export async function getTemplate(appName: string, reqTemplate: string | undefined) {
	const templates = await readTemplates(appName);

	const userProvided = reqTemplate ? templates.find((t) => t.name === reqTemplate) : null;
	const template = userProvided ?? (await askTemplateChoice({ templates }));

	if (!template) {
		throw new Error('Template not found');
	}

	return template;
}

export async function copyTemplate(template: Template, dest: string) {
	await fs.copy(path.join(templatesDir, 'shared'), dest);

	await fs.copy(template.path, dest, {
		filter: async (filePath) => !(await fs.lstat(filePath)).isSymbolicLink(),
	});

	if (template.packageJson) {
		await fs.writeFile(join(dest, 'package.json'), template.packageJson);
	}

	await fs.writeFile(join(dest, 'tsconfig.json'), JSON.stringify(createTsconfig(), null, 2));

	const gitignore = await fetchGitignore();
	if (gitignore) {
		await fs.writeFile(join(dest, '.gitignore'), gitignore);
	}
}
