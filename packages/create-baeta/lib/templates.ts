import path from 'node:path';
import { logger } from '@docusaurus/logger';
import select from '@inquirer/select';
import fs from 'fs-extra';
import { makeApolloTemplate } from '../templates/apollo.ts';
import { makeYogaTemplate } from '../templates/yoga.ts';
import { type JavaScriptRuntime, type Template, templates } from './constants.ts';

function createTemplateChoices() {
	return templates.map((template) => ({ name: template, value: template }));
}

async function askTemplateChoice() {
	try {
		return await select<Template>({
			message: 'Select a template below...',
			choices: createTemplateChoices(),
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			logger.error('A choice is required.');
			process.exit(1);
		}
		throw error;
	}
}

export async function getTemplate(reqTemplate: string | undefined) {
	const userProvided = reqTemplate ? templates.find((t) => t === reqTemplate) : null;
	const template = userProvided ?? (await askTemplateChoice());

	if (!template) {
		throw new Error('Template not found');
	}

	return template;
}

function getTemplateFiles(template: Template, appName: string, runtime: JavaScriptRuntime) {
	switch (template) {
		case 'yoga':
			return makeYogaTemplate(appName, runtime);
		case 'apollo':
			return makeApolloTemplate(appName, runtime);
		default:
			return [] satisfies never[];
	}
}

export async function copyTemplate(
	appName: string,
	runtime: JavaScriptRuntime,
	template: Template,
	dest: string,
) {
	const files = await getTemplateFiles(template, appName, runtime);
	const promises = files.map(async (file) => {
		const filePath = path.join(dest, file.relativePath);
		await fs.ensureDir(path.dirname(filePath));
		await fs.writeFile(filePath, file.content);
	});
	await Promise.all(promises);
}
