import type { Source } from '@graphql-tools/utils';
import {
	type DocumentNode,
	type EnumTypeDefinitionNode,
	type InputObjectTypeDefinitionNode,
	type InterfaceTypeDefinitionNode,
	type ObjectTypeDefinitionNode,
	type ScalarTypeDefinitionNode,
	type UnionTypeDefinitionNode,
	visit,
} from 'graphql';

export type DefinitionsMap = ReturnType<typeof createRegistry>;

function createRegistry() {
	return {
		scalarTypeMap: new Map<string, ScalarTypeDefinitionNode>(),
		enumTypeMap: new Map<string, EnumTypeDefinitionNode>(),
		objectTypeMap: new Map<string, ObjectTypeDefinitionNode>(),
		inputObjectTypeMap: new Map<string, InputObjectTypeDefinitionNode>(),
		unionTypeMap: new Map<string, UnionTypeDefinitionNode>(),
		interfaceTypeMap: new Map<string, InterfaceTypeDefinitionNode>(),
	};
}

export function createDefinitionsMapFromSources(sources: Source[]) {
	const registry = createRegistry();
	for (const source of sources) {
		if (source.document) {
			collectTypesFromDocument(source.document, registry, ['Query', 'Mutation', 'Subscription']);
		}
	}
	return registry;
}

export function createDefinitionsMapFromDocument(document: DocumentNode) {
	const registry = createRegistry();
	collectTypesFromDocument(document, registry);
	return registry;
}

function collectTypesFromDocument(
	document: DocumentNode,
	registry: DefinitionsMap,
	filterObjectTypes: string[] = [],
) {
	visit(document, {
		ScalarTypeDefinition(node) {
			if (registry.scalarTypeMap.has(node.name.value)) {
				throw new Error(`Scalar type ${node.name.value} already exists`);
			}
			registry.scalarTypeMap.set(node.name.value, node);
		},
		EnumTypeDefinition(node) {
			if (registry.enumTypeMap.has(node.name.value)) {
				throw new Error(`Enum type ${node.name.value} already exists, use 'extend' instead!`);
			}
			registry.enumTypeMap.set(node.name.value, node);
		},
		ObjectTypeDefinition(node) {
			if (filterObjectTypes.includes(node.name.value)) {
				return;
			}
			if (registry.objectTypeMap.has(node.name.value)) {
				throw new Error(`Object type ${node.name.value} already exists, use 'extend' instead!`);
			}
			registry.objectTypeMap.set(node.name.value, node);
		},
		InputObjectTypeDefinition(node) {
			if (registry.inputObjectTypeMap.has(node.name.value)) {
				throw new Error(`Input type ${node.name.value} already exists. Use 'extend' instead!`);
			}
			registry.inputObjectTypeMap.set(node.name.value, node);
		},
		UnionTypeDefinition(node) {
			if (registry.unionTypeMap.has(node.name.value)) {
				throw new Error(`Union type ${node.name.value} already exists, use 'extend' instead!`);
			}
			registry.unionTypeMap.set(node.name.value, node);
		},
		InterfaceTypeDefinition(node) {
			if (registry.interfaceTypeMap.has(node.name.value)) {
				throw new Error(`Interface type ${node.name.value} already exists. Use 'extend' instead!`);
			}
			registry.interfaceTypeMap.set(node.name.value, node);
		},
	});
}
