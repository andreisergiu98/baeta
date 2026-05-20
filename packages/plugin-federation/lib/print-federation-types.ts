import { relative } from '@baeta/util-path';
import {
	type GraphQLInterfaceType,
	GraphQLList,
	GraphQLNonNull,
	type GraphQLObjectType,
	type GraphQLSchema,
	isEnumType,
	isInterfaceType,
	isObjectType,
	isScalarType,
	Kind,
	parse,
	type SelectionSetNode,
} from 'graphql';
import type { FederationInfo } from './federation-info.ts';
import { namespace } from './namespace.ts';

interface PrintFederationTypesOptions {
	extension: '' | '.ts' | '.js';
	modulesDir: string;
	typesDir: string;
}

export function printFederationTypes(
	schema: GraphQLSchema,
	federationInfo: FederationInfo,
	options: PrintFederationTypesOptions,
) {
	const hasEntities = federationInfo.resolvableEntitiesMap.size > 0;
	const entitiesRepresentations = [...federationInfo.resolvableEntitiesMap.entries()].map(
		([typeName, fields]) => buildRepresentationForType(schema, typeName, fields),
	);
	const entityHandlerTypes = [...federationInfo.resolvableEntitiesMap.keys()].map((typeName) =>
		buildEntityHandlerTypeForType(typeName),
	);
	const entityRepresentationUnion =
		[...federationInfo.resolvableEntitiesMap.keys()]
			.map((typeName) => `${typeName}EntityRepresentation`)
			.join(' | ') || 'never';

	const relativeModulesDir = relative(options.typesDir, options.modulesDir);

	return [
		hasEntities
			? `import type * as ${namespace.globalTypes} from "./types${options.extension}";`
			: '',
		hasEntities
			? `import type * as ${namespace.userTypes} from "${relativeModulesDir}/types${options.extension}";`
			: '',
		'',
		hasEntities ? 'type Result<T> = T | PromiseLike<T>;' : '',
		'',
		entitiesRepresentations.join('\n\n'),
		'',
		entityHandlerTypes.join('\n\n'),
		'',
		`export type EntityRepresentation = ${entityRepresentationUnion};\n`,
		hasEntities
			? `export type EntityHandlerMap = { ${[...federationInfo.resolvableEntitiesMap.keys()].map((typeName) => `"${typeName}": ${typeName}EntityHandler`).join('; ')} };`
			: 'export type EntityHandlerMap = { }',
	]
		.filter((el) => (hasEntities ? true : el !== ''))
		.join('\n');
}

function buildEntityHandlerTypeForType(typeName: string) {
	return `export type ${typeName}EntityHandler = (representation: ${typeName}EntityRepresentation, ctx: ${namespace.userTypes}.Ctx, info: ${namespace.userTypes}.Info) => Result<${namespace.globalTypes}.${typeName} & {__typename: "${typeName}"} | null>`;
}

function buildRepresentationForType(schema: GraphQLSchema, typeName: string, fields: Set<string>) {
	const objectType = schema.getType(typeName);
	if (!objectType || !isObjectType(objectType)) {
		throw new Error(`Type "${typeName}" not found or is not an object type`);
	}
	const shapes = [...fields].map((fieldSet) => buildShape(objectType, fieldSet));
	return `export type ${typeName}EntityRepresentation = { __typename: "${typeName}" } & (${shapes.join(' | ')})`;
}

function buildShape(type: GraphQLObjectType, keyFields: string): string {
	const doc = parse(`{ ${keyFields} }`);
	const selectionSet =
		doc.definitions[0].kind === Kind.OPERATION_DEFINITION ? doc.definitions[0].selectionSet : null;

	if (!selectionSet) throw new Error('Invalid key fields');

	return selectionSetToTS(selectionSet, type);
}

function selectionSetToTS(
	selectionSet: SelectionSetNode,
	parentType: GraphQLObjectType | GraphQLInterfaceType,
): string {
	const fields = parentType.getFields();
	const parts: string[] = [];

	for (const selection of selectionSet.selections) {
		if (selection.kind !== Kind.FIELD) continue;
		const name = selection.name.value;
		const field = fields[name];
		if (!field) throw new Error(`Field "${name}" not found on ${parentType.name}`);
		const naked = unwrap(field.type);
		if (isScalarType(naked) || isEnumType(naked)) {
			parts.push(`${name}: ${scalarToTS(naked.name)}`);
		} else if ((isObjectType(naked) || isInterfaceType(naked)) && selection.selectionSet) {
			const nested = selectionSetToTS(selection.selectionSet, naked);
			parts.push(`${name}: ${nested}`);
		}
	}
	return `{ ${parts.join('; ')} }`;
}

function unwrap(type: any): any {
	if (type instanceof GraphQLNonNull || type instanceof GraphQLList) {
		return unwrap(type.ofType);
	}
	return type;
}

function scalarToTS(name: string): string {
	return `${namespace.globalTypes}.Scalars["${name}"]`;
}
