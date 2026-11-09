import { makeRelativePathForImport } from '@baeta/util-path';
import { camelCase, pascalCase } from 'change-case';

interface AutoloadPrinterConfig {
	moduleDefinitionName: string;
	importExtension: '.ts' | '.js' | '';
	modulesDir: string;
	typesDir: string;
}

export function printAutoload(config: AutoloadPrinterConfig, modules: string[]) {
	return [printImports(config, modules), printExport(modules)].join('\n\n');
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

function printExport(modules: string[]) {
	return `export default {\n    sdl,\n    modules: [\n${modules.map(printModuleWithSatisfies).join(',\n')}\n    ],\n};`;
}

function printModuleWithSatisfies(module: string) {
	return `        ${getModuleBinding(module)} satisfies ModuleCompilerFactory<Ctx, Info, ${pascalCase(module)}ModuleTypes["Factories"]>`;
}

function getModuleBinding(module: string) {
	return `${camelCase(module)}Module`;
}
