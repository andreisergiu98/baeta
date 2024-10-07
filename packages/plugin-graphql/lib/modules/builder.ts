import type { BaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import { pascalCase } from 'change-case-all';
import {
	type DocumentNode,
	type EnumTypeDefinitionNode,
	type EnumTypeExtensionNode,
	type GraphQLSchema,
	type InputObjectTypeDefinitionNode,
	type InputObjectTypeExtensionNode,
	type InterfaceTypeDefinitionNode,
	type InterfaceTypeExtensionNode,
	Kind,
	type ObjectTypeDefinitionNode,
	type ObjectTypeExtensionNode,
	type TypeDefinitionNode,
	type TypeExtensionNode,
	type UnionTypeDefinitionNode,
	isInterfaceType,
	isScalarType,
	isUnionType,
	visit,
} from 'graphql';
import type { ModulesConfig } from './config.ts';
import { type TypeHash, getObjectTypeHash } from './hashes.ts';
import {
	buildBlock,
	collectUsedTypes,
	concatByKey,
	createObject,
	indent,
	pushUnique,
	unique,
	uniqueByKey,
	withQuotes,
} from './utils.ts';

type RegistryKeys = 'objects' | 'inputs' | 'interfaces' | 'scalars' | 'unions' | 'enums';
type Registry = Record<RegistryKeys, string[]>;
const registryKeys: RegistryKeys[] = [
	'objects',
	'inputs',
	'interfaces',
	'scalars',
	'unions',
	'enums',
];
const resolverKeys: Extract<RegistryKeys, 'objects' | 'enums' | 'scalars'>[] = [
	'scalars',
	'objects',
	'enums',
];

export function buildModule(
	name: string,
	doc: DocumentNode,
	{
		importNamespace,
		importPath,
		encapsulate,
		requireRootResolvers,
		shouldDeclare,
		rootTypes,
		schema,
		baseVisitor,
		fieldTypes,
		fieldArguments,
		extensionsPath,
	}: {
		importNamespace: string;
		importPath: string;
		encapsulate: ModulesConfig['encapsulateModuleTypes'];
		requireRootResolvers: ModulesConfig['requireRootResolvers'];
		shouldDeclare: boolean;
		rootTypes: string[];
		baseVisitor: BaseVisitor;
		schema?: GraphQLSchema;
		useGraphQLModules: boolean;
		fieldTypes: Record<string, Record<string, string>>;
		fieldArguments: Record<string, Record<string, boolean>>;
		extensionsPath?: string;
	},
): string {
	const picks: Record<RegistryKeys, Record<string, string[]>> = createObject(
		registryKeys,
		() => ({}),
	);
	const defined: Registry = createObject(registryKeys, () => []);
	const extended: Registry = createObject(registryKeys, () => []);

	const hashes: Record<string, TypeHash> = {};

	// List of types used in objects, fields, arguments etc
	const usedTypes = collectUsedTypes(doc);

	visit(doc, {
		ObjectTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		ObjectTypeExtension(node) {
			collectTypeExtension(node);
		},
		InputObjectTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		InputObjectTypeExtension(node) {
			collectTypeExtension(node);
		},
		InterfaceTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		InterfaceTypeExtension(node) {
			collectTypeExtension(node);
		},
		ScalarTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		UnionTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		UnionTypeExtension(node) {
			collectTypeExtension(node);
		},
		EnumTypeDefinition(node) {
			collectTypeDefinition(node);
		},
		EnumTypeExtension(node) {
			collectTypeExtension(node);
		},
	});

	// Defined and Extended types
	const visited: Registry = createObject(registryKeys, (key) =>
		concatByKey(defined, extended, key),
	);

	// Types that are not defined or extended in a module, they come from other modules
	const external: Registry = createObject(registryKeys, (key) =>
		uniqueByKey(extended, defined, key),
	);

	//
	//
	//
	// Prints
	//
	//
	//

	// An actual output
	const imports = [
		`import * as ${importNamespace} from "${importPath}";`,
		'import type { DocumentNode } from "graphql";',
		'import * as Baeta from "@baeta/core/sdk";',
	];

	if (extensionsPath) {
		imports.push(`import baetaExtensions from "${extensionsPath}";`);
	}

	imports.push('\n');

	let content = [
		printDefinedFields(),
		printDefinedEnumValues(),
		printDefinedInputFields(),
		printSchemaTypes(usedTypes),
		printMetadata(),
	]
		.filter(Boolean)
		.join('\n\n');

	const moduleNamespace = baseVisitor.convertName(name, {
		suffix: 'Module',
		useTypesPrefix: false,
		useTypesSuffix: false,
	});

	if (encapsulate === 'namespace') {
		content = `${shouldDeclare ? 'declare' : 'export'} namespace ${baseVisitor.convertName(name, {
			suffix: 'Module',
			useTypesPrefix: false,
			useTypesSuffix: false,
		})} {\n${shouldDeclare ? `${indent(2)(imports.join('\n'))}\n` : ''}${indent(2)(content)}\n}`;
	}

	return [...(shouldDeclare ? [] : imports), content, printFactoryMethod()]
		.filter(Boolean)
		.join('\n');

	function printMetadata() {
		return `export namespace ModuleMetadata {
  export const id = '${name}';
  export const dirname = './${name}';
  export const hashes = ${JSON.stringify(hashes)};
  export const typedef = ${JSON.stringify(doc)} as unknown as DocumentNode;
  ${printBaetaManager()}
}`;
	}

	/**
	 * A dictionary of fields to pick from an object
	 */
	function printDefinedFields() {
		return buildBlock({
			name: 'interface DefinedFields',
			lines: [...visited.objects, ...visited.interfaces].map(
				(typeName) =>
					`${typeName}: ${printPicks(typeName, {
						...picks.objects,
						...picks.interfaces,
					})};`,
			),
		});
	}

	function printFactoryMethod() {
		const name = moduleNamespace.slice(0, moduleNamespace.length - 6);
		const createModuleFn = `create${name}Module`;
		const getModuleFn = `get${name}Module`;
		const extensionsArg = extensionsPath ? ', baetaExtensions' : '';

		return `
export const ${createModuleFn} = () => Baeta.createModuleManager(ModuleMetadata${extensionsArg});
export const ${getModuleFn} = Baeta.createSingletonModule(${createModuleFn});
`;
	}

	/**
	 * Baeta manager
	 */

	function printObjectFieldResolverBuilder(typeName: string, field: string) {
		const parentType = getParentType(typeName);
		const resultType = getResultType(typeName, field);
		const argumentsType = getArgsType(typeName, field);
		const contextType = getContextType();
		return `${field}: module.createResolverBuilder<${resultType}, ${parentType}, ${contextType}, ${argumentsType}>("${typeName}", "${field}"),`;
	}

	function printObjectResolverBuilder(typeName: string, objects: Record<string, string[]>) {
		const fields =
			objects[typeName]
				?.filter(unique)
				.map((field) => printObjectFieldResolverBuilder(typeName, field)) ?? [];

		if (fields.length === 0) {
			return '';
		}

		const parentType = getParentType(typeName);
		const contextType = getContextType();

		const addons = [`...module.createTypeMethods<${parentType}, ${contextType}>("${typeName}"),`];
		const contentBody = [...addons, ...fields].map(indent(2)).join('\n');
		const content = `{\n${contentBody}\n}`;
		return `${typeName}: ${content},`;
	}

	function printSubscriptionFieldBuilder(field: string) {
		const parentType = getParentType('Subscription');
		const resultType = getResultType('Subscription', field);
		const argumentsType = getArgsType('Subscription', field);
		const contextType = getContextType();
		return `${field}: module.createSubscriptionBuilder<${resultType}, ${parentType}, ${contextType}, ${argumentsType}>("${field}"),`;
	}

	function printSubscriptionObjectBuilder() {
		const subscriptions = picks.objects.Subscription?.filter(unique) ?? [];

		if (subscriptions.length === 0) {
			return '';
		}

		const fields = subscriptions.map((subscription) => printSubscriptionFieldBuilder(subscription));

		const parentType = getParentType('Subscription');
		const contextType = getContextType();
		const addons = [`...module.createSubscriptionMethods<${parentType}, ${contextType}>(),`];
		const contentBody = [...addons, ...fields].map(indent(2)).join('\n');

		const content = `{\n${contentBody}\n}`;
		return `Subscription: ${content},`;
	}

	function printScalarBuilder() {
		const scalars = visited.scalars;
		if (scalars.length === 0) {
			return '';
		}

		const fields = scalars.map((scalar) => `${scalar}: module.createScalarBuilder("${scalar}"),`);
		const content = fields.map(indent(2)).join('\n');
		return `Scalar: {\n${content}\n},`;
	}

	function printTypenameResolverBuilder(
		name: string,
		resultNamespace: string,
		valueNamespace: string,
	) {
		const resultType = `${importNamespace}.${resultNamespace}["${name}"]`;
		const valueType = `${importNamespace}.${valueNamespace}["${name}"]`;
		const contextType = getContextType();
		const resolver = `$resolveType: module.createResolveType<${resultType}, ${valueType}, ${contextType}>("${name}"),`;
		return `${name}: {\n${indent(2)(resolver)}\n},`;
	}

	function printInterfaceBuilder() {
		const interfaces = defined.interfaces;

		if (interfaces.length === 0) {
			return '';
		}

		return interfaces
			.map((interfaceName) =>
				printTypenameResolverBuilder(
					interfaceName,
					'DefinedInterfacesResults',
					'DefinedInterfacesWithoutExtensions',
				),
			)
			.join('\n');
	}

	function printUnionBuilder() {
		const unions = defined.unions;

		if (unions.length === 0) {
			return '';
		}

		return unions
			.map((unionName) =>
				printTypenameResolverBuilder(
					unionName,
					'DefinedUnionsResults',
					'DefinedUnionsWithoutExtensions',
				),
			)
			.join('\n');
	}

	function printBaetaManager() {
		const objects = visited.objects
			.filter((type) => type !== 'Subscription')
			.map((typeName) => printObjectResolverBuilder(typeName, picks.objects))
			.filter(Boolean);

		const contextType = getContextType();
		const addons = [`...module.createModuleMethods<${contextType}>(),`];

		const bodyFields = [
			...addons,
			...objects,
			printScalarBuilder(),
			printSubscriptionObjectBuilder(),
			printInterfaceBuilder(),
			printUnionBuilder(),
		];

		const body = bodyFields.filter(Boolean).map(indent(6)).join('\n');
		const content = `{\n${body}\n    }`;

		return `
  export function createManager(module: Baeta.ModuleBuilder) {
    return ${content};
  }`;
	}

	/**
	 * A dictionary of values to pick from an enum
	 */
	function printDefinedEnumValues() {
		return buildBlock({
			name: 'interface DefinedEnumValues',
			lines: visited.enums.map((typeName) => `${typeName}: ${printPicks(typeName, picks.enums)};`),
		});
	}

	function encapsulateTypeName(typeName: string): string {
		if (encapsulate === 'prefix') {
			return `${pascalCase(name)}_${typeName}`;
		}

		return typeName;
	}

	/**
	 * A dictionary of fields to pick from an input
	 */
	function printDefinedInputFields() {
		return buildBlock({
			name: 'interface DefinedInputFields',
			lines: visited.inputs.map(
				(typeName) => `${typeName}: ${printPicks(typeName, picks.inputs)};`,
			),
		});
	}

	/**
	 * Prints signatures of schema types with picks
	 */
	function printSchemaTypes(types: string[]) {
		return types
			.filter((type) => !visited.scalars.includes(type))
			.map(printExportType)
			.join('\n');
	}

	function printPicks(typeName: string, records: Record<string, string[]>): string {
		return records[typeName].filter(unique).map(withQuotes).join(' | ');
	}

	function printTypeBody(typeName: string): string {
		const normalizedTypeName = baseVisitor.convertName(typeName, {
			useTypesSuffix: true,
			useTypesPrefix: true,
		});

		const coreType = `${importNamespace}.${normalizedTypeName}`;

		if (external.enums.includes(typeName) || external.objects.includes(typeName)) {
			if (schema && isScalarType(schema.getType(typeName))) {
				return `${importNamespace}.Scalars['${typeName}']`;
			}

			return `Pick<${coreType}, ${importNamespace}.DefinedFieldsWithoutExtensions["${typeName}"]>`;
		}

		if (external.unions.includes(typeName)) {
			return `${importNamespace}.DefinedUnionsWithoutExtensions["${typeName}"]`;
		}

		if (external.interfaces.includes(typeName)) {
			return `Pick<${coreType}, ${importNamespace}.DefinedFieldsWithoutExtensions["${typeName}"]>`;
		}

		if (defined.enums.includes(typeName) && picks.enums[typeName]) {
			return `DefinedEnumValues['${typeName}']`;
		}

		if (defined.unions.includes(typeName) && picks.unions[typeName]) {
			return `${importNamespace}.DefinedUnionsWithoutExtensions["${typeName}"]`;
		}

		if (defined.objects.includes(typeName) && picks.objects[typeName]) {
			return `Pick<${coreType}, DefinedFields['${typeName}']>`;
		}

		if (defined.interfaces.includes(typeName) && picks.interfaces[typeName]) {
			return `${importNamespace}.DefinedInterfacesWithoutExtensions["${typeName}"]`;
		}

		if (defined.inputs.includes(typeName) && picks.inputs[typeName]) {
			return `Pick<${coreType}, DefinedInputFields['${typeName}']>`;
		}

		if (isScalarType(schema?.getType(typeName))) {
			return coreType;
		}

		if (isInterfaceType(schema?.getType(typeName))) {
			return `${importNamespace}.DefinedInterfacesWithoutExtensions["${typeName}"]`;
		}

		if (isUnionType(schema?.getType(typeName))) {
			return `${importNamespace}.DefinedUnionsWithoutExtensions["${typeName}"]`;
		}

		return `Pick<${coreType}, ${importNamespace}.DefinedFieldsWithoutExtensions["${typeName}"]>`;
	}

	function printExportType(typeName: string): string {
		return `export type ${encapsulateTypeName(typeName)} = ${printTypeBody(typeName)};`;
	}

	//
	//
	//
	// Utils
	//
	//
	//

	function collectFields(
		node:
			| ObjectTypeDefinitionNode
			| ObjectTypeExtensionNode
			| InterfaceTypeDefinitionNode
			| InterfaceTypeExtensionNode
			| InputObjectTypeDefinitionNode
			| InputObjectTypeExtensionNode,
		picksObj: Record<string, string[]>,
	) {
		const name = node.name.value;

		if (node.fields) {
			if (!picksObj[name]) {
				picksObj[name] = [];
			}

			for (const field of node.fields) {
				picksObj[name].push(field.name.value);
			}
		}
	}

	function collectValuesFromEnum(node: EnumTypeDefinitionNode | EnumTypeExtensionNode) {
		const name = node.name.value;

		if (node.values) {
			if (!picks.enums[name]) {
				picks.enums[name] = [];
			}

			for (const field of node.values) {
				picks.enums[name].push(field.name.value);
			}
		}
	}

	function collectUnionTypes(node: UnionTypeDefinitionNode) {
		const name = node.name.value;

		if (node.types) {
			if (!picks.unions[name]) {
				picks.unions[name] = [];
			}

			for (const type of node.types) {
				picks.unions[name].push(type.name.value);
			}
		}
	}

	function collectTypeDefinition(node: TypeDefinitionNode) {
		const name = node.name.value;

		switch (node.kind) {
			case Kind.OBJECT_TYPE_DEFINITION: {
				defined.objects.push(name);
				collectFields(node, picks.objects);
				hashes[name] = getObjectTypeHash(node);
				break;
			}

			case Kind.ENUM_TYPE_DEFINITION: {
				defined.enums.push(name);
				collectValuesFromEnum(node);
				break;
			}

			case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
				defined.inputs.push(name);
				collectFields(node, picks.inputs);
				break;
			}

			case Kind.SCALAR_TYPE_DEFINITION: {
				defined.scalars.push(name);
				break;
			}

			case Kind.INTERFACE_TYPE_DEFINITION: {
				defined.interfaces.push(name);
				collectFields(node, picks.interfaces);
				break;
			}

			case Kind.UNION_TYPE_DEFINITION: {
				defined.unions.push(name);
				collectUnionTypes(node);
				break;
			}
		}
	}

	function collectTypeExtension(node: TypeExtensionNode) {
		const name = node.name.value;

		switch (node.kind) {
			case Kind.OBJECT_TYPE_EXTENSION: {
				collectFields(node, picks.objects);
				hashes[name] = getObjectTypeHash(node);

				// Do not include root types as extensions
				// so we can use them in DefinedFields
				if (rootTypes.includes(name)) {
					pushUnique(defined.objects, name);
					return;
				}

				pushUnique(extended.objects, name);

				break;
			}

			case Kind.ENUM_TYPE_EXTENSION: {
				collectValuesFromEnum(node);
				pushUnique(extended.enums, name);
				break;
			}

			case Kind.INPUT_OBJECT_TYPE_EXTENSION: {
				collectFields(node, picks.inputs);
				pushUnique(extended.inputs, name);
				break;
			}

			case Kind.INTERFACE_TYPE_EXTENSION: {
				collectFields(node, picks.interfaces);
				pushUnique(extended.interfaces, name);
				break;
			}

			case Kind.UNION_TYPE_EXTENSION: {
				pushUnique(extended.unions, name);
				break;
			}
		}
	}

	function getParentType(type: string) {
		if (['Query', 'Mutation', 'Subscription'].includes(type)) {
			return '{ }';
		}
		return type;
	}

	function getResultType(type: string, field: string) {
		return fieldTypes?.[type]?.[field] || '{ }';
	}

	function getArgsType(type: string, field: string) {
		const hasArgs = fieldArguments?.[type]?.[field] ?? false;
		if (!hasArgs) {
			return '{ }';
		}
		const fieldUpper = field[0].toUpperCase() + field.slice(1);
		return `Types.${type}${fieldUpper}Args`;
	}

	function getContextType() {
		return 'Types.ContextType';
	}
}
