import { addValidationToSchema } from '@baeta/core';
import { BaetaErrorCode } from '@baeta/errors';
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import test from 'ava';
import { DocumentNode, execute, GraphQLError, GraphQLSchema } from 'graphql';
import { gql } from 'graphql-tag';

export function createAndExecute(
  typeDefs: DocumentNode,
  inputType: string,
  transformer: (schema: GraphQLSchema) => GraphQLSchema,
  query: DocumentNode,
  resolvers: IExecutableSchemaDefinition['resolvers'],
  returnType: string
) {
  const queryDef = gql`
    type Query {
      value(input: ${inputType}): ${returnType}
    }
  `;

  const executableSchema = makeExecutableSchema({
    typeDefs: [typeDefs, queryDef],
    resolvers,
  });

  const schema = addValidationToSchema(transformer(executableSchema));

  return execute({
    schema,
    document: query,
  });
}

export function makeValidInputMacro(
  typeDefs: DocumentNode,
  transformer: (schema: GraphQLSchema) => GraphQLSchema
) {
  return test.macro(async (t, inputType: string, query: DocumentNode) => {
    const result = await createAndExecute(
      typeDefs,
      inputType,
      transformer,
      query,
      {
        Query: {
          value: () => true,
        },
      },
      'Boolean'
    );

    t.is(result.data?.value, true);
    t.truthy(result.errors == null);
  });
}

export function makeInvalidInputMacro(
  typeDefs: DocumentNode,
  transformer: (schema: GraphQLSchema) => GraphQLSchema
) {
  return test.macro(async (t, inputType: string, query: DocumentNode) => {
    const result = await createAndExecute(
      typeDefs,
      inputType,
      transformer,
      query,
      {
        Query: {
          value: () => true,
        },
      },
      'Boolean'
    );

    t.is(result.errors?.length, 1);
    t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
  });
}

export function makeAggregateErrorsInputMacro(
  typeDefs: DocumentNode,
  transformer: (schema: GraphQLSchema) => GraphQLSchema
) {
  return test.macro(async (t, inputType: string, query: DocumentNode, expectedErrors: number) => {
    const result = await createAndExecute(
      typeDefs,
      inputType,
      transformer,
      query,
      {
        Query: {
          value: () => true,
        },
      },
      'Boolean'
    );

    const errors = result.errors?.[0].extensions.errors as GraphQLError[] | undefined;

    t.is(result.errors?.length, 1);
    t.is(result.errors?.[0].extensions.code, BaetaErrorCode.AggregateError);
    t.is(errors?.length, expectedErrors);
    t.true(errors?.every((error) => error.extensions.code === BaetaErrorCode.BadUserInput));
  });
}

export function makeQueryResolverMacro<T, R>(
  typeDefs: DocumentNode,
  transformer: (schema: GraphQLSchema) => GraphQLSchema,
  resolver: (args: T) => R,
  returnType: string
) {
  return test.macro(async (t, inputType: string, expect: R, query: DocumentNode) => {
    const resolvers = {
      Query: {
        value: (_: unknown, args: T) => resolver(args),
      },
    };

    const result = await createAndExecute(
      typeDefs,
      inputType,
      transformer,
      query,
      resolvers,
      returnType
    );

    t.is(result.data?.value, expect);
    t.is(result.errors, undefined);
  });
}

test('pass macros', (t) => {
  t.pass();
});
