import {
	FieldDefinitionNode,
	InputValueDefinitionNode,
	Kind,
	ObjectTypeDefinitionNode,
	ObjectTypeExtensionNode,
	TypeNode,
} from 'graphql';

export function getObjectTypeHash(node: ObjectTypeDefinitionNode | ObjectTypeExtensionNode) {
	const name = node.name.value;
	const fields = buildFieldsNames(node.fields);
	return `${name}${fields}`;
}

function buildFieldsNames(fields: readonly FieldDefinitionNode[] = []): string {
	if (fields.length === 0) {
		return '';
	}

	const fieldsNames: string[] = [];

	for (const field of fields) {
		const fieldName = field.name.value;
		const fieldType = buildTypeName(field.type);
		const argsNames = buildArgsNames(field.arguments);
		fieldsNames.push(`${fieldName}${argsNames}:${fieldType}`);
	}

	return `{${fieldsNames.join(',')}}`;
}

function buildArgsNames(args: readonly InputValueDefinitionNode[] = []): string {
	if (args.length === 0) {
		return '';
	}

	const argsNames: string[] = [];

	for (const arg of args) {
		const argName = arg.name.value;

		// console.log(arg);

		const argTypeName = buildTypeName(arg.type);
		argsNames.push(`${argName}:${argTypeName}`);
	}

	return `(${argsNames.join(',')})`;
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
