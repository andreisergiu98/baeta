import {
	type FieldDefinitionNode,
	Kind,
	type ObjectTypeDefinitionNode,
	type ObjectTypeExtensionNode,
	type TypeNode,
} from 'graphql';
import hash from 'murmurhash';

export type TypeHash = {
	hash: string;
	fieldsHashes: Record<string, string>;
};

export function getObjectTypeHash(
	node: ObjectTypeDefinitionNode | ObjectTypeExtensionNode,
): TypeHash {
	const fieldNames = buildFieldsNames(node.fields);
	const typeFields = fieldNames
		.map(([fieldName, fieldType]) => `${fieldName}:${fieldType}`)
		.join(',');

	const fieldMap: Record<string, string> = {};

	for (const [fieldName, fieldType] of fieldNames) {
		fieldMap[fieldName] = hash.v3(fieldType).toString(36);
	}

	return {
		hash: hash.v3(typeFields).toString(36),
		fieldsHashes: fieldMap,
	};
}

function buildFieldsNames(fields: readonly FieldDefinitionNode[] = []) {
	if (fields.length === 0) {
		return [];
	}

	const fieldsNames: Array<[string, string]> = [];

	for (const field of fields) {
		const fieldName = field.name.value;
		const fieldType = buildTypeName(field.type);
		fieldsNames.push([fieldName, fieldType]);
	}

	return fieldsNames.sort(([a], [b]) => a.localeCompare(b));
}

function buildTypeName(node: TypeNode): string {
	if (node.kind === Kind.NAMED_TYPE) {
		return node.name.value;
	}

	if (node.kind === Kind.LIST_TYPE) {
		return `[${buildTypeName(node.type)}]`;
	}

	if (node.kind === Kind.NON_NULL_TYPE) {
		return `${buildTypeName(node.type)}!`;
	}

	return '';
}
