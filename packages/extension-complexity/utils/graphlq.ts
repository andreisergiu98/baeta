import { GraphQLList, GraphQLNonNull, type GraphQLOutputType } from 'graphql';

export function isListOrNullableList(type: GraphQLOutputType): boolean {
	if (type instanceof GraphQLList) {
		return true;
	}

	if (type instanceof GraphQLNonNull) {
		return isListOrNullableList(type.ofType);
	}

	return false;
}
