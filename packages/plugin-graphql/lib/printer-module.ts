import type { ModuleRegistry } from '@baeta/util-graphql';
import { join } from '@baeta/util-path';
import { pascalCase } from 'change-case';
import type { DocumentNode } from 'graphql';
import type { FieldInfoMap } from './field-info.ts';
import { namespace } from './namespace.ts';
import { buildBlock, buildCodeBlock, indent, makeRelativePathForImport } from './printer-utils.ts';

export interface ModulePrinterConfig {
	registry: ModuleRegistry;
	fieldInfo: FieldInfoMap;
	typesDir: string;
	modulesDir: string;
	moduleDefinitionName: string;
	importExtension: '.ts' | '.js' | '';
}

export function printModuleIndexStarter(config: ModulePrinterConfig, moduleName: string): string {
	const typeEntries = Object.entries(config.registry.picks.objects);
	const types = typeEntries.map(([typeName]) => typeName);

	return [
		printModuleIndexImports(config, moduleName),
		printModuleIndexDestructuredTypes(moduleName, types),
		...typeEntries.map(([typeName, fields]) => printModuleIndexType(typeName, fields)),
		printModuleIndexSchema(moduleName, types, config.registry.defined.scalars),
	]
		.filter((el) => el != null)
		.join('\n\n');
}

export function printModuleImports(config: ModulePrinterConfig, moduleName: string) {
	const typesDir = makeRelativePathForImport(join(config.modulesDir, moduleName), config.typesDir);
	const hasTypes = config.registry.defined.objects.length > 0;
	return [
		`import * as ${namespace.sdk} from "@baeta/core/sdk";`,
		`import type * as ${namespace.graphql} from "graphql";`,
		hasTypes
			? `import type * as ${namespace.globalTypes} from "${typesDir}/types${config.importExtension}";`
			: null,
		`import type * as ${namespace.userTypes} from "../types${config.importExtension}";`,
	]
		.filter((el) => el != null)
		.join('\n');
}

export function printModuleMetadata(name: string, doc: DocumentNode) {
	return buildCodeBlock({
		name: 'const moduleMetadata =',
		lines: [
			`id: '${name}'`,
			`typedef: ${JSON.stringify(doc)} as unknown as ${namespace.graphql}.DocumentNode`,
		],
	});
}

export function printBaetaModuleTypes(config: ModulePrinterConfig) {
	return buildBlock({
		name: 'export interface BaetaModuleTypes',
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

function printModuleIndexDestructuredTypes(moduleName: string, types: string[]) {
	return `const { ${types.join(', ')} } = ${pascalCase(moduleName)}Module;`;
}

function printModuleIndexImports(config: ModulePrinterConfig, moduleName: string) {
	const hasScalars = config.registry.defined.scalars.length > 0;
	const moduleImport = `import { ${pascalCase(moduleName)}Module } from "./${config.moduleDefinitionName}${config.importExtension}";`;
	if (!hasScalars) {
		return moduleImport;
	}
	return [`import { GraphQLScalarType } from "graphql";`, moduleImport].join('\n');
}

function printModuleIndexSchema(moduleName: string, types: string[], scalars: string[]) {
	const printedTypes = [
		...types.map((typeName) => `${typeName}: ${typeName}Resolver,`),
		...scalars.map(
			(scalarName) => `${scalarName}: new GraphQLScalarType({ name: '${scalarName}' }),`,
		),
	]
		.map(indent(2))
		.join('\n');

	return `export default ${pascalCase(moduleName)}Module.$schema({
${printedTypes}
});`;
}

function printModuleIndexType(typeName: string, fields: string[]) {
	const printedFields = fields
		.map((fieldName) => printModuleIndexTypeField(typeName, fieldName))
		.map(indent(2))
		.join('\n');

	return `const ${typeName}Resolver = ${typeName}.$fields({
${printedFields}
});`;
}

function printModuleIndexTypeField(typeName: string, fieldName: string) {
	if (typeName === 'Query' || typeName === 'Mutation') {
		return `${fieldName}: ${typeName}.${fieldName}.resolve((params) => {
  // Implement resolver logic here
}),`;
	}

	if (typeName === 'Subscription') {
		return `${fieldName}: ${typeName}.${fieldName}
  .subscribe((params) => {
    // Implement subscribe logic here
  })
  .resolve((params) => {
    // Implement resolver logic here
  }),`;
	}

	return `${fieldName}: ${typeName}.${fieldName}.key('${fieldName}'),`;
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
		return `${typeName}: ${namespace.sdk}.TypeCompilerFactory<${parentType}, ${contextType}, ${infoType}, BaetaModuleObjectTypeFields['${typeName}']['Factory']>`;
	}
	return `${typeName}: ${namespace.sdk}.TypeMethods<${parentType}, ${contextType}, ${infoType}, BaetaModuleObjectTypeFields['${typeName}']['Builder'], BaetaModuleObjectTypeFields['${typeName}']['Factory']>`;
}

function printBaetaModuleTypesScalars(config: ModulePrinterConfig) {
	return config.registry.defined.scalars.map(
		(scalar) => `${scalar}: ${namespace.graphql}.GraphQLScalarType`,
	);
}

export function printModuleObjectTypeFields(config: ModulePrinterConfig) {
	const objects = config.registry.defined.objects
		.map((typeName) => printObjectTypeFields(config, typeName, config.registry.picks.objects))
		.filter(Boolean);
	if (objects.length === 0) {
		return '';
	}
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
	const fieldType = typeName === 'Subscription' ? 'SubscriptionMethods' : 'FieldMethods';
	return `${field}: ${namespace.sdk}.${fieldType}<${resultType}, ${parentType}, ${contextType}, ${argumentsType}, ${infoType}>`;
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
	const fieldType = typeName === 'Subscription' ? 'SubscriptionField' : 'Field';
	return `${field}: ${namespace.sdk}.${fieldType}<${resultType}, ${resultType}, ${parentType}, ${contextType}, ${argumentsType}, ${infoType}>`;
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
		`export const ${pascalCase(moduleName)}Module = ${namespace.sdk}.createModuleBuilder<${contextType}, ${infoType}, BaetaModuleTypes['Builders'], BaetaModuleTypes['Factories']>(moduleMetadata.id, moduleMetadata.typedef,`,
		builders,
		',',
		typeNameResolvers,
		`);`,
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
	return `${typeName}: ${namespace.sdk}.createTypeBuilder("${typeName}",${content})`;
}

function printTypeNameResolver() {
	return '{ __resolveType: (source: {__typename: string}) => { return source.__typename; }}';
}

function getParentType(type: string) {
	if (['Query', 'Mutation', 'Subscription'].includes(type)) {
		return '{}';
	}
	return `${namespace.globalTypes}.${type}`;
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
	const fieldUpper = pascalCase(field);
	return `${namespace.globalTypes}.${type}${fieldUpper}Args`;
}

function printObjectTypeFieldBuilder(typeName: string, field: string) {
	if (typeName === 'Subscription') {
		return `${field}: ${namespace.sdk}.createSubscriptionBuilder("${field}")`;
	}
	return `${field}: ${namespace.sdk}.createFieldBuilder("${typeName}", "${field}")`;
}

function getContextType() {
	return `${namespace.userTypes}.Ctx`;
}

function getInfoType() {
	return `${namespace.userTypes}.Info`;
}
