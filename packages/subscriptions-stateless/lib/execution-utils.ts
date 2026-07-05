import {
	Kind,
	type ValidatedSubscriptionArgs,
	GraphQLError,
	type SelectionSetNode,
	type FieldNode,
	type GraphQLField,
} from 'graphql';

export function isValidationErrorList(
	value: readonly GraphQLError[] | ValidatedSubscriptionArgs,
): value is readonly GraphQLError[] {
	return Array.isArray(value);
}

export type SubscriptionRootField = {
	fieldDef: GraphQLField;
	fieldNode: FieldNode;
};

export function getSubscriptionRootField(args: ValidatedSubscriptionArgs): SubscriptionRootField {
	const rootType = args.schema.getSubscriptionType();
	if (rootType == null) {
		throw new Error('Schema does not define a subscription root type.');
	}

	const fieldNode = findFirstFieldNode(
		args.operation.selectionSet,
		args.fragmentDefinitions,
		new Set(),
	);
	if (fieldNode == null) {
		throw new GraphQLError('Subscription operation must select a root field.', {
			nodes: args.operation,
		});
	}

	const fieldDef = args.schema.getField(rootType, fieldNode.name.value);
	if (fieldDef == null) {
		throw new GraphQLError(`The subscription field "${fieldNode.name.value}" is not defined.`, {
			nodes: fieldNode,
		});
	}

	return { fieldNode, fieldDef };
}

function findFirstFieldNode(
	selectionSet: SelectionSetNode,
	fragmentDefinitions: ValidatedSubscriptionArgs['fragmentDefinitions'],
	visitedFragments: Set<string>,
): FieldNode | undefined {
	for (const selection of selectionSet.selections) {
		switch (selection.kind) {
			case Kind.FIELD:
				return selection;
			case Kind.INLINE_FRAGMENT: {
				const field = findFirstFieldNode(
					selection.selectionSet,
					fragmentDefinitions,
					visitedFragments,
				);
				if (field != null) {
					return field;
				}
				break;
			}
			case Kind.FRAGMENT_SPREAD: {
				const name = selection.name.value;
				if (visitedFragments.has(name)) {
					break;
				}
				visitedFragments.add(name);
				const fragment = fragmentDefinitions[name];
				if (fragment == null) {
					break;
				}
				const field = findFirstFieldNode(
					fragment.selectionSet,
					fragmentDefinitions,
					visitedFragments,
				);
				if (field != null) {
					return field;
				}
				break;
			}
		}
	}
	return undefined;
}
