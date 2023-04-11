import { addValidationToSchema } from '@baeta/core/lib/input-directive/input-schema';
import { BaetaErrorCode } from '@baeta/errors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import test from 'ava';
import { execute, GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { intValidation } from '../lib/int/int-validation';

const typeDefs = `
    ${intValidation.sdl}

    input MinInput {
        min: Int @validInt(min: 10)
    }

    input MaxInput {
        max: Int @validInt(max: 10)
    }

    input ExclusiveMinInput {
        exclusiveMin: Int @validInt(exclusiveMin: 10)
    }

    input ExclusiveMaxInput {
        exclusiveMax: Int @validInt(exclusiveMax: 10)
    }

    input MultipleOfInput {
        multipleOf: Int @validInt(multipleOf: 10)
    }

    input OneOfInput {
        oneOf: Int @validInt(oneOf: [10, 20, 30])
    }

    input NotOneOfInput {
        notOneOf: Int @validInt(notOneOf: [10, 20, 30])
    }

    input AggregateInput {
        min: Int @validInt(min: 10)
        max: Int @validInt(max: 10)
        exclusiveMin: Int @validInt(exclusiveMin: 10)
        exclusiveMax: Int @validInt(exclusiveMax: 10)
        multipleOf: Int @validInt(multipleOf: 10)
        oneOf: Int @validInt(oneOf: [10, 20, 30])
        notOneOf: Int @validInt(notOneOf: [10, 20, 30])
    }

    input BadTypeInput {
        badType: String @validInt(min: 10)
    }

    type Query {
        min(input: MinInput!): Int
        max(input: MaxInput!): Int
        exclusiveMin(input: ExclusiveMinInput!): Int
        exclusiveMax(input: ExclusiveMaxInput!): Int
        multipleOf(input: MultipleOfInput!): Int
        oneOf(input: OneOfInput!): Int
        notOneOf(input: NotOneOfInput!): Int
        aggregate(input: AggregateInput!): Int
        badType(input: BadTypeInput!): Int
    }
`;

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      min: () => 10,
      max: () => 10,
      exclusiveMin: () => 10,
      exclusiveMax: () => 10,
      multipleOf: () => 10,
      oneOf: () => 10,
      notOneOf: () => 10,
      aggregate: () => 10,
      badType: () => 10,
    },
  },
});

const schema = addValidationToSchema(intValidation.directive(executableSchema));

test('min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: 10 })
      }
    `,
  });

  t.is(result.data?.min, 10);
  t.is(result.errors, undefined);
});

test('max', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        max(input: { max: 10 })
      }
    `,
  });

  t.is(result.data?.max, 10);
  t.is(result.errors, undefined);
});

test('exclusiveMin', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMin(input: { exclusiveMin: 11 })
      }
    `,
  });

  t.is(result.data?.exclusiveMin, 10);
  t.is(result.errors, undefined);
});

test('exclusiveMax', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMax(input: { exclusiveMax: 9 })
      }
    `,
  });

  t.is(result.data?.exclusiveMax, 10);
  t.is(result.errors, undefined);
});

test('multipleOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        multipleOf(input: { multipleOf: 100 })
      }
    `,
  });

  t.is(result.data?.multipleOf, 10);
  t.is(result.errors, undefined);
});

test('oneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        oneOf(input: { oneOf: 10 })
      }
    `,
  });

  t.is(result.data?.oneOf, 10);
  t.is(result.errors, undefined);
});

test('notOneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        notOneOf(input: { notOneOf: 11 })
      }
    `,
  });

  t.is(result.data?.notOneOf, 10);
  t.is(result.errors, undefined);
});

test('aggregate', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        aggregate(
          input: {
            min: 10
            max: 10
            exclusiveMin: 11
            exclusiveMax: 9
            multipleOf: 100
            oneOf: 10
            notOneOf: 11
          }
        )
      }
    `,
  });

  t.is(result.data?.aggregate, 10);
  t.is(result.errors, undefined);
});

test('bad min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: 9 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad max', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        max(input: { max: 11 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad exclusiveMin', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMin(input: { exclusiveMin: 10 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad exclusiveMax', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMax(input: { exclusiveMax: 10 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad multipleOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        multipleOf(input: { multipleOf: 5 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad oneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        oneOf(input: { oneOf: 11 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad notOneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        notOneOf(input: { notOneOf: 10 })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad aggregate', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        aggregate(
          input: {
            min: 9
            max: 11
            exclusiveMin: 10
            exclusiveMax: 10
            multipleOf: 5
            oneOf: 11
            notOneOf: 10
          }
        )
      }
    `,
  });

  const errors = result.errors?.[0].extensions.errors as GraphQLError[] | undefined;

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.AggregateError);
  t.is(errors?.length, 7);
  t.true(errors?.every((error) => error.extensions.code === BaetaErrorCode.BadUserInput));
});

test('skip bad types', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        badType(input: { badType: "10" })
      }
    `,
  });

  t.is(result.data?.badType, 10);
  t.is(result.errors, undefined);
});
