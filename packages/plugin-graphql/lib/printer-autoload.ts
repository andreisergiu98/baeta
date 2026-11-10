import type { RootTypes } from '@baeta/util-graphql';
import { makeRelativePathForImport } from '@baeta/util-path';
import { camelCase, pascalCase } from 'change-case';

interface AutoloadPrinterConfig {
	moduleDefinitionName: string;
	importExtension: '.ts' | '.js' | '';
	modulesDir: string;
	typesDir: string;
}

export function printAutoload(config: AutoloadPrinterConfig, modules: string[], roots: RootTypes) {
	return [printImports(config, modules), printExport(modules, roots)].join('\n\n');
}

function printImports(config: AutoloadPrinterConfig, modules: string[]) {
	const typesDir = makeRelativePathForImport(config.modulesDir, config.typesDir);
	const dependencyImports = [
		'import type { ModuleCompilerFactory } from "@baeta/core/sdk";',
		`import sdl from "${typesDir}/sdl${config.importExtension}";`,
		`import type { Ctx, Info } from "./types${config.importExtension}"`,
	];
	const moduleTypeImports = modules.map(
		(module) =>
			`import type { BaetaModuleTypes as ${pascalCase(module)}ModuleTypes } from "./${module}/${config.moduleDefinitionName}${config.importExtension}"`,
	);
	const moduleImports = modules.flatMap(
		(module) =>
			`import ${getModuleBinding(module)} from "./${module}/index${config.importExtension}"`,
	);
	return [...dependencyImports, ...moduleTypeImports, ...moduleImports].join('\n');
}

function printExport(modules: string[], roots: RootTypes) {
	return `export default {\n    sdl,\n    roots: ${printRoots(roots)},\n    modules: [\n${modules.map(printModuleWithSatisfies).join(',\n')}\n    ],\n};`;
}

function printRoots(roots: RootTypes) {
	const entries = Object.entries(roots).map(([operation, type]) => `${operation}: "${type}"`);
	return `{ ${entries.join(', ')} }`;
}

function printModuleWithSatisfies(module: string) {
	return `        ${getModuleBinding(module)} satisfies ModuleCompilerFactory<Ctx, Info, ${pascalCase(module)}ModuleTypes["Factories"]>`;
}

function getModuleBinding(module: string) {
	return `${camelCase(module)}Module`;
}
