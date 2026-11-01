import { BaetaErrorCode } from '@baeta/errors';
import test from '@baeta/testing';
import { concatAST, type DocumentNode, execute, type GraphQLError, parse as gql } from 'graphql';
import type { InputDirective } from '../lib/directive.ts';
import { createTestSchema } from './app.ts';

export function createAndExecute(
	typeDefs: DocumentNode,
	inputType: string,
	directive: InputDirective,
	query: DocumentNode,
) {
	const queryDef = gql(`
    type Query {
      value(input: ${inputType}): Boolean
    }
  `);

	const schema = createTestSchema({
		typeDefs: concatAST([typeDefs, queryDef]),
		directives: [directive],
		resolvers: {
			Query: {
				value: () => true,
			},
		},
	});

	return execute({
		schema,
		document: query,
	});
}

export function makeValidInputMacro(typeDefs: DocumentNode, directive: InputDirective) {
	return test.macro(async (t, inputType: string, query: DocumentNode) => {
		const result = await createAndExecute(typeDefs, inputType, directive, query);

		t.is(result.data?.value, true);
		t.truthy(result.errors == null);
	});
}

export function makeInvalidInputMacro(typeDefs: DocumentNode, directive: InputDirective) {
	return test.macro(async (t, inputType: string, query: DocumentNode) => {
		const result = await createAndExecute(typeDefs, inputType, directive, query);

		t.is(result.errors?.length, 1);
		t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
	});
}

export function makeAggregateErrorsInputMacro(typeDefs: DocumentNode, directive: InputDirective) {
	return test.macro(async (t, inputType: string, query: DocumentNode, expectedErrors: number) => {
		const result = await createAndExecute(typeDefs, inputType, directive, query);

		const errors = result.errors?.[0].extensions.errors as GraphQLError[] | undefined;

		t.is(result.errors?.length, 1);
		t.is(result.errors?.[0].extensions.code, BaetaErrorCode.AggregateError);
		t.is(errors?.length, expectedErrors);
		t.true(errors?.every((error) => error.extensions.code === BaetaErrorCode.BadUserInput));
	});
}

test('pass macros', (t) => {
	t.pass();
});
