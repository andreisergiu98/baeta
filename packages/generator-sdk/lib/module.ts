import { pascalCase } from 'change-case';

export function getModuleExportName(name: string) {
	return `${pascalCase(name)}Module`;
}
