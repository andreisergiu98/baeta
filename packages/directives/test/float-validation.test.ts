import { addValidationToSchema } from '@baeta/core/lib/input-directive/input-schema';
import { BaetaErrorCode } from '@baeta/errors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import test from 'ava';
import { execute, GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import { floatValidation } from '../lib/float/float-validation';

const typeDefs = `
    ${floatValidation.sdl}

    input MinInput {
        min: Float @validFloat(min: 10.5)
    }

    input MaxInput {
        max: Float @validFloat(max: 10.5)
    }

    input ExclusiveMinInput {
        exclusiveMin: Float @validFloat(exclusiveMin: 10.5)
    }

    input ExclusiveMaxInput {
        exclusiveMax: Float @validFloat(exclusiveMax: 10.5)
    }

    input MultipleOfInput {
        multipleOf: Float @validFloat(multipleOf: 10.5)
    }

    input OneOfInput {
        oneOf: Float @validFloat(oneOf: [10.5, 20.5, 30.5])
    }

    input NotOneOfInput {
        notOneOf: Float @validFloat(notOneOf: [10.5, 20.5, 30.5])
    }

    input AggregateInput {
        min: Float @validFloat(min: 10.5)
        max: Float @validFloat(max: 10.5)
        exclusiveMin: Float @validFloat(exclusiveMin: 10.5)
        exclusiveMax: Float @validFloat(exclusiveMax: 10.5)
        multipleOf: Float @validFloat(multipleOf: 10.5)
        oneOf: Float @validFloat(oneOf: [10.5, 20.5, 30.5])
        notOneOf: Float @validFloat(notOneOf: [10.5, 20.5, 30.5])
    }

    input BadTypeInput {
        badType: String @validFloat(min: 10.5)
    }

    type Query {
        min(input: MinInput!): Float
        max(input: MaxInput!): Float
        exclusiveMin(input: ExclusiveMinInput!): Float
        exclusiveMax(input: ExclusiveMaxInput!): Float
        multipleOf(input: MultipleOfInput!): Float
        oneOf(input: OneOfInput!): Float
        notOneOf(input: NotOneOfInput!): Float
        aggregate(input: AggregateInput!): Float
        badType(input: BadTypeInput!): Float
    }
`;

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      min: () => 10.5,
      max: () => 10.5,
      exclusiveMin: () => 10.5,
      exclusiveMax: () => 10.5,
      multipleOf: () => 10.5,
      oneOf: () => 10.5,
      notOneOf: () => 10.5,
      aggregate: () => 10.5,
      badType: () => 10.5,
    },
  },
});

const schema = addValidationToSchema(floatValidation.directive(executableSchema));

test('min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: 10.5 })
      }
    `,
  });

  t.is(result.data?.min, 10.5);
  t.is(result.errors, undefined);
});

test('max', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        max(input: { max: 10.5 })
      }
    `,
  });

  t.is(result.data?.max, 10.5);
  t.is(result.errors, undefined);
});

test('exclusiveMin', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMin(input: { exclusiveMin: 10.6 })
      }
    `,
  });

  t.is(result.data?.exclusiveMin, 10.5);
  t.is(result.errors, undefined);
});

test('exclusiveMax', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        exclusiveMax(input: { exclusiveMax: 10.4 })
      }
    `,
  });

  t.is(result.data?.exclusiveMax, 10.5);
  t.is(result.errors, undefined);
});

test('multipleOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        multipleOf(input: { multipleOf: 105 })
      }
    `,
  });

  t.is(result.data?.multipleOf, 10.5);
  t.is(result.errors, undefined);
});

test('oneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        oneOf(input: { oneOf: 10.5 })
      }
    `,
  });

  t.is(result.data?.oneOf, 10.5);
  t.is(result.errors, undefined);
});

test('notOneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        notOneOf(input: { notOneOf: 10.6 })
      }
    `,
  });

  t.is(result.data?.notOneOf, 10.5);
  t.is(result.errors, undefined);
});

test('aggregate', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        aggregate(
          input: {
            min: 10.5
            max: 10.5
            exclusiveMin: 10.6
            exclusiveMax: 10.4
            multipleOf: 105
            oneOf: 10.5
            notOneOf: 10.6
          }
        )
      }
    `,
  });

  t.is(result.data?.aggregate, 10.5);
  t.is(result.errors, undefined);
});

test('bad min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: 10.4 })
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
        max(input: { max: 10.6 })
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
        exclusiveMin(input: { exclusiveMin: 10.5 })
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
        exclusiveMax(input: { exclusiveMax: 10.5 })
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
        multipleOf(input: { multipleOf: 10 })
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
        oneOf(input: { oneOf: 10.6 })
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
        notOneOf(input: { notOneOf: 10.5 })
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
            min: 10.4
            max: 10.6
            exclusiveMin: 10.5
            exclusiveMax: 10.5
            multipleOf: 10
            oneOf: 10.6
            notOneOf: 10.5
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
        badType(input: { badType: "10.5" })
      }
    `,
  });

  t.is(result.data?.badType, 10.5);
  t.is(result.errors, undefined);
});
