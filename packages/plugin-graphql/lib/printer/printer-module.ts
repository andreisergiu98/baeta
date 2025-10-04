import { join, relative } from '@baeta/util-path';
import { pascalCase } from 'change-case-all';
import type { DocumentNode } from 'graphql';
import type { FieldInfoMap } from '../visitors/field-info.ts';
import type { ModuleRegistry } from '../visitors/module-registry.ts';
import { buildBlock, buildCodeBlock } from './printer-utils.ts';

export interface ModulePrinterConfig {
	registry: ModuleRegistry;
	fieldInfo: FieldInfoMap;
	typesDir: string;
	modulesDir: string;
	importExtension: '.ts' | '.js' | '';
}

export function printModuleImports(config: ModulePrinterConfig, moduleName: string) {
	const typesDir = relative(join(config.modulesDir, moduleName), config.typesDir);
	return [
		'import type { DocumentNode, GraphQLScalarType } from "graphql";',
		'import * as Baeta from "@baeta/core/sdk";',
		`import extensions from "../extensions${config.importExtension}";`,
		`import type {Ctx, Info} from "../types${config.importExtension}";`,
		`import * as Types from "${typesDir}/types${config.importExtension}";`,
	].join('\n');
}

export function printModuleMetadata(name: string, doc: DocumentNode) {
	return buildCodeBlock({
		name: 'const moduleMetadata =',
		lines: [
			`id: '${name}'`,
			`dirname: './${name}'`,
			`typedef: ${JSON.stringify(doc)} as unknown as DocumentNode`,
		],
	});
}

export function printBaetaModuleTypes(config: ModulePrinterConfig) {
	return buildBlock({
		name: 'interface BaetaModuleTypes',
		lines: [
			buildBlock({
				name: 'Builders:',
				lines: printBaetaModuleTypesForFields(config, false),
			}),
			buildBlock({
				name: 'Factories:',
				lines: [
					...printBaetaModuleTypesForFields(config, true),
					...printBaetaModuleTypesScalars(config),
				],
			}),
		],
	});
}

function printBaetaModuleTypesForFields(config: ModulePrinterConfig, isFactory: boolean) {
	return config.registry.defined.objects
		.map((typeName) =>
			printObjectTypeModuleType(typeName, config.registry.picks.objects, isFactory),
		)
		.filter(Boolean);
}

function printObjectTypeModuleType(
	typeName: string,
	objects: Record<string, string[] | undefined>,
	isFactory: boolean,
) {
	const object = objects[typeName];
	if (!object) {
		return '';
	}
	const parentType = getParentType(typeName);
	const contextType = getContextType();
	const infoType = getInfoType();
	if (isFactory) {
		return `${typeName}: Baeta.TypeCompilerFactory<${parentType}, ${contextType}, ${infoType}, BaetaModuleObjectTypeFields['${typeName}']['Factory']>`;
	}
	return `${typeName}: Baeta.TypeMethods<${parentType}, ${contextType}, ${infoType}, BaetaModuleObjectTypeFields['${typeName}']['Builder'], BaetaModuleObjectTypeFields['${typeName}']['Factory']>`;
}

function printBaetaModuleTypesScalars(config: ModulePrinterConfig) {
	return config.registry.defined.scalars.map((scalar) => `${scalar}: GraphQLScalarType`);
}

export function printModuleObjectTypeFields(config: ModulePrinterConfig) {
	const objects = config.registry.defined.objects
		.map((typeName) => printObjectTypeFields(config, typeName, config.registry.picks.objects))
		.filter(Boolean);
	return buildBlock({
		name: 'interface BaetaModuleObjectTypeFields',
		lines: objects,
	});
}

function printObjectTypeFields(
	config: ModulePrinterConfig,
	typeName: string,
	objects: Record<string, string[] | undefined>,
) {
	const fields = objects[typeName];
	if (!fields || fields.length === 0) {
		return '';
	}
	const fieldsBuilders = fields.map((field) =>
		printObjectTypeFieldBuilders(config, typeName, field),
	);
	const fieldsFactories = fields.map((field) =>
		printObjectTypeFieldFactories(config, typeName, field),
	);
	return buildBlock({
		name: `${typeName}:`,
		lines: [
			buildBlock({
				name: 'Builder:',
				lines: fieldsBuilders,
			}),
			buildBlock({
				name: 'Factory:',
				lines: fieldsFactories,
			}),
		],
	});
}

function printObjectTypeFieldBuilders(
	config: ModulePrinterConfig,
	typeName: string,
	field: string,
) {
	const parentType = getParentType(typeName);
	const resultType = getResultType(config, typeName, field);
	const argumentsType = getArgsType(config, typeName, field);
	const contextType = getContextType();
	const infoType = getInfoType();
	const namespace = typeName === 'Subscription' ? 'SubscriptionMethods' : 'FieldMethods';
	return `${field}: Baeta.${namespace}<${resultType}, ${parentType}, ${contextType}, ${argumentsType}, ${infoType}>`;
}

function printObjectTypeFieldFactories(
	config: ModulePrinterConfig,
	typeName: string,
	field: string,
) {
	const parentType = getParentType(typeName);
	const resultType = getResultType(config, typeName, field);
	const argumentsType = getArgsType(config, typeName, field);
	const contextType = getContextType();
	const infoType = getInfoType();
	const namespace = typeName === 'Subscription' ? 'SubscriptionField' : 'Field';
	return `${field}: Baeta.${namespace}<${resultType}, ${resultType}, ${parentType}, ${contextType}, ${argumentsType}, ${infoType}>`;
}

export function printModuleBuilder(config: ModulePrinterConfig, moduleName: string) {
	const objectTypes = config.registry.defined.objects
		.map((typeName) => printObjectTypeBuilder(typeName, config.registry.picks.objects))
		.filter(Boolean);
	const builders = buildCodeBlock({
		name: '',
		lines: objectTypes,
	});
	const typeNameResolvers = buildCodeBlock({
		name: '',
		lines: [...config.registry.defined.unions, ...config.registry.defined.interfaces].map(
			(name) => `${name}: ${printTypeNameResolver()}`,
		),
	});
	const infoType = getInfoType();
	const contextType = getContextType();
	return [
		`export const ${pascalCase(moduleName)}Module = Baeta.createModuleBuilder<${contextType}, ${infoType}, BaetaModuleTypes['Builders'], BaetaModuleTypes['Factories']>(moduleMetadata.id, moduleMetadata.typedef,`,
		builders,
		',',
		typeNameResolvers,
		`, ${getExtensionsVar()});`,
	].join('');
}

function printObjectTypeBuilder(typeName: string, objects: Record<string, string[] | undefined>) {
	const fields = objects[typeName]?.map((field) => printObjectTypeFieldBuilder(typeName, field));
	if (fields == null || fields.length === 0) {
		return '';
	}
	const content = buildCodeBlock({
		name: '',
		lines: fields,
	});
	return `${typeName}: Baeta.createTypeBuilder("${typeName}",${content}, ${getExtensionsVar()})`;
}

function printTypeNameResolver() {
	return '{ __resolveType: (source: {__typename: string}) => { return source.__typename; }}';
}

function getParentType(type: string) {
	if (['Query', 'Mutation', 'Subscription'].includes(type)) {
		return '{}';
	}
	return `Types.${type}`;
}

function getResultType(config: ModulePrinterConfig, type: string, field: string) {
	const fieldType = config.fieldInfo.get(type)?.get(field)?.type;
	if (fieldType == null) {
		return '{}';
	}
	return fieldType;
}

function getArgsType(config: ModulePrinterConfig, type: string, field: string) {
	const hasArgs = config.fieldInfo.get(type)?.get(field)?.hasArguments ?? false;
	if (!hasArgs) {
		return '{}';
	}
	const fieldUpper = field[0].toUpperCase() + field.slice(1);
	return `Types.${type}${fieldUpper}Args`;
}

function printObjectTypeFieldBuilder(typeName: string, field: string) {
	if (typeName === 'Subscription') {
		return `${field}: Baeta.createSubscriptionBuilder("${field}", ${getExtensionsVar()})`;
	}
	return `${field}: Baeta.createFieldBuilder("${typeName}", "${field}", ${getExtensionsVar()})`;
}

function getContextType() {
	return 'Ctx';
}

function getInfoType() {
	return 'Info';
}

function getExtensionsVar() {
	return 'extensions';
}
