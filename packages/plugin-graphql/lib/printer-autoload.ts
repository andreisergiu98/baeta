import { camelCase, pascalCase } from 'change-case';

interface AutoloadPrinterConfig {
	moduleDefinitionName: string;
	importExtension: '.ts' | '.js' | '';
}

export function printAutoload(config: AutoloadPrinterConfig, modules: string[]) {
	return [printImports(config, modules), printExport(modules)].join('\n\n');
}

function printImports(config: AutoloadPrinterConfig, modules: string[]) {
	const dependencyImports = [
		'import type { ModuleCompilerFactory } from "@baeta/core/sdk";',
		`import type { Ctx, Info } from "./types${config.importExtension}"`,
	];
	const moduleTypeImports = modules.map(
		(module) =>
			`import type { BaetaModuleTypes as ${pascalCase(module)}ModuleTypes } from "./${module}/${config.moduleDefinitionName}${config.importExtension}"`,
	);
	const moduleImports = modules.flatMap(
		(module) => `import ${camelCase(module)} from "./${module}/index${config.importExtension}"`,
	);
	return [...dependencyImports, ...moduleTypeImports, ...moduleImports].join('\n');
}

function printExport(modules: string[]) {
	return `export default [\n${modules.map(printModuleWithSatisfies).join(',\n')}\n];`;
}

function printModuleWithSatisfies(module: string) {
	return `    ${camelCase(module)} satisfies ModuleCompilerFactory<Ctx, Info, ${pascalCase(module)}ModuleTypes["Factories"]>`;
}
