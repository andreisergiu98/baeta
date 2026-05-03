import { GraphQLError, GraphQLScalarType, Kind, type ValueNode } from 'graphql';

export function createStringScalar(name: string, description?: string) {
	return new GraphQLScalarType<string, string>({
		name,
		description,
		serialize: validateValue,
		parseValue: validateValue,
		parseLiteral: (ast: ValueNode) => {
			if (ast.kind !== Kind.STRING) {
				throw new GraphQLError(`Can only parse strings but got a: ${ast.kind}`, {
					nodes: ast,
				});
			}
			return validateValue(ast.value, ast);
		},
	});
}

function validateValue(value: unknown, ast?: ValueNode): string {
	if (typeof value !== 'string') {
		throw new GraphQLError(`Value is not a string: ${value}`, {
			nodes: ast,
		});
	}
	return value;
}
