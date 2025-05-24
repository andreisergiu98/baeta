import test from '@baeta/testing';
import {
	execute,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	type GraphQLResolveInfo,
	GraphQLSchema,
	GraphQLString,
	parse,
} from 'graphql';
import { calculateComplexity } from './complexity-calculator.ts';
import { ComplexityError } from './complexity-errors.ts';
import type { FieldSettingsMap } from './field-settings.ts';

const createTestSchema = () => {
	const NestedType = new GraphQLObjectType({
		name: 'Nested',
		fields: {
			field1: { type: GraphQLString },
			field2: { type: GraphQLString },
			deepNested: {
				type: new GraphQLObjectType({
					name: 'DeepNested',
					fields: {
						deep1: { type: GraphQLString },
						deep2: { type: GraphQLString },
					},
				}),
			},
		},
	});

	const ListType = new GraphQLObjectType({
		name: 'List',
		fields: {
			items: { type: new GraphQLList(GraphQLString) },
		},
	});

	const queryType = new GraphQLObjectType({
		name: 'Query',
		fields: {
			simple: {
				type: GraphQLString,
				resolve: () => 'test',
			},
			nested: {
				type: NestedType,
				resolve: () => ({ field1: 'test', field2: 'test' }),
			},
			list: {
				type: ListType,
				resolve: () => ({ items: ['a', 'b', 'c'] }),
			},
			optionalList: {
				type: new GraphQLList(GraphQLString),
				resolve: () => ['a', 'b', 'c'],
			},
			nonNullList: {
				type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
				resolve: () => ['a', 'b', 'c'],
			},
		},
	});

	return new GraphQLSchema({
		query: queryType,
	});
};

// Create mock info
const createMockInfo = (schema: GraphQLSchema, query: string) => {
	const document = parse(query);
	const result = execute({
		schema,
		document,
		rootValue: {},
		contextValue: {},
		variableValues: {},
	});

	if (result instanceof Promise) {
		throw new Error('Unexpected promise result');
	}

	if (result.errors) {
		throw result.errors[0];
	}

	return {
		schema,
		operation: document.definitions[0],
		variableValues: {},
		fragments: {},
	} as GraphQLResolveInfo;
};

test('calculateComplexity should calculate complexity of simple query', (t) => {
	const schema = createTestSchema();
	const query = `
    query {
      simple
    }
  `;

	const mockInfo = createMockInfo(schema, query);
	const fieldSettingsMap: FieldSettingsMap = {};
	const defaults = { complexity: 1, multiplier: 10 };

	const result = calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);

	t.is(result.depth, 1);
	t.is(result.breadth, 1);
	t.is(result.complexity, 1);
});

test('calculateComplexity should calculate complexity of nested query', (t) => {
	const schema = createTestSchema();
	const query = `
    query {
      nested {
        field1
        field2
      }
    }
  `;

	const mockInfo = createMockInfo(schema, query);
	const fieldSettingsMap = {};
	const defaults = { complexity: 1, multiplier: 10 };

	const result = calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);

	t.is(result.depth, 2);
	t.is(result.breadth, 3);
	t.is(result.complexity, 3);
});

test('calculateComplexity should calculate complexity of deeply nested query', (t) => {
	const schema = createTestSchema();
	const query = `
    query {
      nested {
        field1
        deepNested {
          deep1
          deep2
        }
      }
    }
  `;

	const mockInfo = createMockInfo(schema, query);
	const fieldSettingsMap = {};
	const defaults = { complexity: 1, multiplier: 10 };

	const result = calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);

	t.is(result.depth, 3);
	t.is(result.breadth, 5);
	t.is(result.complexity, 5);
});

test('calculateComplexity should apply multiplier to list fields', (t) => {
	const schema = createTestSchema();
	const query = `
    query {
      list {
        items
      }
    }
  `;

	const mockInfo = createMockInfo(schema, query);
	const fieldSettingsMap = {};
	const defaults = { complexity: 1, multiplier: 10 };

	const result = calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);

	t.is(result.complexity, 11);
});

test('calculateComplexity should use custom field settings', (t) => {
	const schema = createTestSchema();
	const query = `
    query {
      simple
    }
  `;

	const mockInfo = createMockInfo(schema, query);

	const fieldSettingsMap = {
		Query: {
			simple: () => ({ complexity: 5 }),
		},
	};

	const defaults = { complexity: 1, multiplier: 10 };

	const result = calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);

	t.is(result.complexity, 5);
});

test('calculateComplexity should throw for unsupported operation', (t) => {
	const schema = createTestSchema();

	const mockInfo = {
		schema,
		operation: {
			operation: 'invalid',
		},
	} as unknown as GraphQLResolveInfo;

	const fieldSettingsMap = {};
	const defaults = { complexity: 1, multiplier: 10 };

	t.throws(
		() => {
			calculateComplexity({}, mockInfo, fieldSettingsMap, defaults);
		},
		{ instanceOf: ComplexityError, message: /Unsupported operation/ },
	);
});
