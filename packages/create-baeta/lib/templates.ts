import path from 'node:path';
import { logger } from '@docusaurus/logger';
import fs from 'fs-extra';
import prompts, { type Choice } from 'prompts';
import { makeApolloTemplate } from '../templates/apollo.ts';
import { makeYogaTemplate } from '../templates/yoga.ts';
import { type JavaScriptRuntime, type Template, templates } from './constants.ts';

function createTemplateChoices(): Choice[] {
	return templates.map((template) => ({ title: template, value: template }));
}

async function askTemplateChoice() {
	return prompts(
		{
			type: 'select',
			name: 'template',
			message: 'Select a template below...',
			choices: createTemplateChoices(),
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

	const promises = files.map((file) => {
		const filePath = path.join(dest, file.relativePath);
		return fs.ensureDir(path.dirname(filePath)).then(() => fs.writeFile(filePath, file.content));
	});

	await Promise.all(promises);
}
