import {
	type DocumentNode,
	type InputObjectTypeDefinitionNode,
	type InputObjectTypeExtensionNode,
	type InterfaceTypeDefinitionNode,
	type InterfaceTypeExtensionNode,
	type ObjectTypeDefinitionNode,
	type ObjectTypeExtensionNode,
	type UnionTypeDefinitionNode,
	visit,
} from 'graphql';

export type RegistryKeys = 'objects' | 'interfaces' | 'unions' | 'scalars';
export type Registry = Record<RegistryKeys, string[]>;
export type Picks = Record<RegistryKeys, Record<string, string[]>>;

const registryKeys: RegistryKeys[] = ['objects', 'interfaces', 'unions', 'scalars'];

export type ModuleRegistry = {
	defined: Registry;
	picks: Picks;
};

export function createModuleRegistry(document: DocumentNode): ModuleRegistry {
	const picks: Record<RegistryKeys, Record<string, string[]>> = createObject(
		registryKeys,
		() => ({}),
	);
	const defined: Registry = createObject(registryKeys, () => []);

	visit(document, {
		ObjectTypeDefinition(node) {
			defined.objects.push(node.name.value);
			collectFields(node, picks.objects);
		},
		ObjectTypeExtension(node) {
			pushUnique(defined.objects, node.name.value);
			collectFields(node, picks.objects);
		},
		InterfaceTypeDefinition(node) {
			defined.interfaces.push(node.name.value);
			collectFields(node, picks.interfaces);
		},
		UnionTypeDefinition(node) {
			defined.unions.push(node.name.value);
			collectUnionTypes(node, picks);
		},
		ScalarTypeDefinition(node) {
			defined.scalars.push(node.name.value);
		},
	});

	return {
		defined,
		picks,
	};
}

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

function collectUnionTypes(node: UnionTypeDefinitionNode, picks: Picks) {
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

export function pushUnique<T>(list: T[], item: T): void {
	if (!list.includes(item)) {
		list.push(item);
	}
}

export function createObject<K extends string, T>(keys: K[], valueFn: (key: K) => T) {
	const obj: Record<K, T> = {} as Record<K, T>;
	for (const key of keys) {
		obj[key] = valueFn(key);
	}
	return obj;
}
