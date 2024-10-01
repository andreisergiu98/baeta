import { camelCase, pascalCase } from 'change-case-all';

export function getModuleGetName(name: string) {
	return `get${pascalCase(name)}Module`;
}

export function getModuleCreateName(name: string) {
	return `create${pascalCase(name)}Module`;
}

export function getModuleVariableName(name: string) {
	return camelCase(`${name}Module`);
}
