/**
 * Based on graphql-scalars JSON scalar implementation
 * Sources:
 *  - https://github.com/graphql-hive/graphql-scalars/blob/master/src/scalars/json/JSON.ts
 *  - https://github.com/graphql-hive/graphql-scalars/blob/master/src/scalars/json/utils.ts
 * Copyright (c) 2020-present The Guild
 * Modified by Baeta developers
 */

import { GraphQLError, GraphQLScalarType, Kind, print, type ValueNode } from 'graphql';

const specifiedByURL = 'http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf';

export function createJSONScalar(name: string, description?: string) {
	return new GraphQLScalarType({
		name,
		description,
		serialize: identity,
		parseValue: identity,
		parseLiteral,
		specifiedByURL,
	});
}

function identity<T>(value: T): T {
	return value;
}

function parseObject(ast: ValueNode, variables: any): any {
	if (ast.kind !== Kind.OBJECT) {
		throw new GraphQLError(`JSONObject cannot represent non-object value: ${print(ast)}`, {
			nodes: ast,
		});
	}
	return Object.fromEntries(
		ast.fields.map((field) => [field.name.value, parseLiteral(field.value, variables)]),
	);
}

function parseLiteral(ast: ValueNode, variables: any): any {
	switch (ast.kind) {
		case Kind.STRING:
		case Kind.BOOLEAN:
			return ast.value;
		case Kind.INT:
		case Kind.FLOAT:
			return Number.parseFloat(ast.value);
		case Kind.OBJECT:
			return parseObject(ast, variables);
		case Kind.LIST:
			return ast.values.map((n) => parseLiteral(n, variables));
		case Kind.NULL:
			return null;
		case Kind.VARIABLE: {
			const name = ast.name.value;
			return variables ? variables[name] : undefined;
		}
	}
}
