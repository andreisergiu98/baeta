import test from '@baeta/testing';
import { concatAST, parse as gql } from 'graphql';
import { createTestSchema } from '../../__tests__/app.ts';
import { makeInvalidInputMacro, makeValidInputMacro } from '../../__tests__/macros.ts';
import { inputConstraints } from './input-validation.ts';

const typeDefs = gql(`
  input MinFieldsInput @constraints(minFields: 1) {
    id: ID
    email: String
  }

  input MaxFieldsInput @constraints(maxFields: 1) {
    id: ID
    email: String
  }

  input MinMaxFieldsInput @constraints(minFields: 1, maxFields: 1) {
    id: ID
    email: String
  }

  input EmptyOnlyInput @constraints(maxFields: 0) {
    id: ID
    email: String
  }

  ${inputConstraints.sdl}
`);

const validInputMacro = makeValidInputMacro(typeDefs, inputConstraints.directive);
const invalidInputMacro = makeInvalidInputMacro(typeDefs, inputConstraints.directive);

test(
	'min fields',
	validInputMacro,
	'MinFieldsInput!',
	gql(`
    query {
      value(input: { id: "1" })
    }
  `),
);

test(
	'max fields',
	validInputMacro,
	'MaxFieldsInput!',
	gql(`
    query {
      value(input: { id: "1" })
    }
  `),
);

test(
	'min max fields',
	validInputMacro,
	'MinMaxFieldsInput!',
	gql(`
    query {
      value(input: { id: "1" })
    }
  `),
);

test(
	'invalid min fields',
	invalidInputMacro,
	'MinFieldsInput!',
	gql(`
    query {
      value(input: {})
    }
  `),
);

test(
	'invalid max fields',
	invalidInputMacro,
	'MaxFieldsInput!',
	gql(`
    query {
      value(input: { id: "1", email: "test@test.com" })
    }
  `),
);

test(
	'invalid min max fields',
	invalidInputMacro,
	'MinMaxFieldsInput!',
	gql(`
    query {
      value(input: {})
    }
  `),
);

test(
	'invalid min max fields 2',
	invalidInputMacro,
	'MinMaxFieldsInput!',
	gql(`
    query {
      value(input: { id: "1", email: "test@test.com" })
    }
  `),
);

test(
	'max fields 0 allows empty input',
	validInputMacro,
	'EmptyOnlyInput!',
	gql(`
    query {
      value(input: {})
    }
  `),
);

test(
	'max fields 0 rejects populated input',
	invalidInputMacro,
	'EmptyOnlyInput!',
	gql(`
    query {
      value(input: { id: "1" })
    }
  `),
);

test('rejects validated arguments on fields without a Baeta resolver at startup', (t) => {
	t.throws(
		() =>
			createTestSchema({
				typeDefs: concatAST([
					typeDefs,
					gql('type Query { value(input: MaxFieldsInput!): Boolean }'),
				]),
				directives: [inputConstraints.directive],
				resolvers: { Query: {} },
			}),
		{ message: /Query\.value has arguments that use input directives, but no resolver/ },
	);
});
