import { camelCase } from 'change-case-all';

interface AutoloadPrinterConfig {
	importExtension: '.ts' | '.js' | '';
}

export function printAutoload(config: AutoloadPrinterConfig, modules: string[]) {
	return [printImports(config, modules), printExport(modules)].join('\n\n');
}

function printImports(config: AutoloadPrinterConfig, modules: string[]) {
	return modules
		.map(
			(module) => `import ${camelCase(module)} from "./${module}/index${config.importExtension}"`,
		)
		.join('\n');
}

function printExport(modules: string[]) {
	return `export default [${modules.map((m) => camelCase(m)).join(', ')}];`;
}
