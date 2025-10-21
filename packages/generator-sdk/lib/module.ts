import { pascalCase } from 'change-case-all';

export function getModuleExportName(name: string) {
	return `${pascalCase(name)}Module`;
}
