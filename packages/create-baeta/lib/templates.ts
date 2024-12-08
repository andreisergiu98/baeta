import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { logger } from '@docusaurus/logger';
import fs from 'fs-extra';
import prompts, { type Choice } from 'prompts';
import { type JavaScriptRuntime, gitignoreUrl } from './constants.ts';
import { getPackageJson } from './package-json.ts';
import { createTsconfig } from './tsconfig.ts';

const recommendedTemplate = 'yoga';
const templatesDir = fileURLToPath(new URL('../templates', import.meta.url));

type Template = {
	name: string;
	path: string;
	packageJsn?: string;
};

async function readTemplates(): Promise<Template[]> {
	const dirContents = await fs.readdir(templatesDir);

	const templates = dirContents
		.filter((template) => template !== 'shared')
		.map((template) => ({
			name: template,
			path: path.join(templatesDir, template),
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

export async function getTemplate(reqTemplate: string | undefined) {
	const templates = await readTemplates();

	const userProvided = reqTemplate ? templates.find((t) => t.name === reqTemplate) : null;
	const template = userProvided ?? (await askTemplateChoice({ templates }));

	if (!template) {
		throw new Error('Template not found');
	}

	return template;
}

export async function copyTemplate(
	appName: string,
	runtime: JavaScriptRuntime,
	template: Template,
	dest: string,
) {
	await fs.copy(path.join(templatesDir, 'shared'), dest);

	await fs.copy(template.path, dest, {
		filter: async (filePath) => !(await fs.lstat(filePath)).isSymbolicLink(),
	});

	const packageJson = getPackageJson(appName, runtime, template.name);

	if (packageJson) {
		await fs.writeFile(join(dest, 'package.json'), packageJson);
	}

	await fs.writeFile(join(dest, 'tsconfig.json'), JSON.stringify(createTsconfig(), null, 2));

	const gitignore = await fetchGitignore();
	if (gitignore) {
		await fs.writeFile(join(dest, '.gitignore'), gitignore);
	}
}
