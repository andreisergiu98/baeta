import { addValidationToSchema } from '@baeta/core/lib/input-directive/input-schema';
import { BaetaErrorCode } from '@baeta/errors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import test from 'ava';
import { execute, GraphQLError } from 'graphql';
import gql from 'graphql-tag';
import { stringValidation } from '../string/string-validation';

const typeDefs = `
    ${stringValidation.sdl}

    input EmailInput {
        email: String @validString(format: EMAIL)
    }

    input UrlInput {
        url: String @validString(format: URL)
    }

    input UUIDInput {
        uuid: String @validString(format: UUID)
    }

    input MinInput {
        min: String @validString(minLength: 3)
    }

    input MaxInput {
        max: String @validString(maxLength: 3)
    }

    input StartsWithInput {
        startsWith: String @validString(startsWith: "foo")
    }

    input EndsWithInput {
        endsWith: String @validString(endsWith: "foo")
    }

    input IncludesInput {
        includes: String @validString(includes: "foo")
    }

    input RegexInput {
        regex: String @validString(regex: "^[A-Z]+$")
    }

    input RegexFlagsInput {
        regex: String @validString(regex: "^[A-Z]+$", regexFlags: "i")
    }

    input OneOfInput {
        oneOf: String @validString(oneOf: ["foo", "bar", "baz"])
    }

    input NotOneOfInput {
        notOneOf: String @validString(notOneOf: ["foo", "bar", "baz"])
    }

    input AggregateInput {
        min: String @validString(minLength: 3)
        max: String @validString(maxLength: 3)
        startsWith: String @validString(startsWith: "foo")
        endsWith: String @validString(endsWith: "foo")
        includes: String @validString(includes: "foo")
        regex: String @validString(regex: "^[A-Z]+$")
        oneOf: String @validString(oneOf: ["foo", "bar", "baz"])
        notOneOf: String @validString(notOneOf: ["foo", "bar", "baz"])
    }

    input BadTypeInput {
      badType: Int @validString(minLength: 3)
    }

    type Query {
        email(input: EmailInput!): String
        url(input: UrlInput!): String
        uuid(input: UUIDInput!): String
        min(input: MinInput!): String
        max(input: MaxInput!): String
        startsWith(input: StartsWithInput!): String
        endsWith(input: EndsWithInput!): String
        includes(input: IncludesInput!): String
        regex(input: RegexInput!): String
        regexFlags(input: RegexFlagsInput!): String
        oneOf(input: OneOfInput!): String
        notOneOf(input: NotOneOfInput!): String
        aggregate(input: AggregateInput!): String
        badType(input: BadTypeInput!): String
    }    
`;

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      email: () => 'foo',
      url: () => 'foo',
      uuid: () => 'foo',
      min: () => 'foo',
      max: () => 'foo',
      startsWith: () => 'foo',
      endsWith: () => 'foo',
      includes: () => 'foo',
      regex: () => 'foo',
      regexFlags: () => 'foo',
      oneOf: () => 'foo',
      notOneOf: () => 'foo',
      aggregate: () => 'foo',
      badType: () => 'foo',
    },
  },
});

const schema = addValidationToSchema(stringValidation.directive(executableSchema));

test('email', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        email(input: { email: "test@test.com" })
      }
    `,
  });

  t.is(result.data?.email, 'foo');
  t.is(result.errors, undefined);
});

test('url', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        url(input: { url: "https://test.com" })
      }
    `,
  });

  t.is(result.data?.url, 'foo');
  t.is(result.errors, undefined);
});

test('uuid', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        uuid(input: { uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" })
      }
    `,
  });

  t.is(result.data?.uuid, 'foo');
  t.is(result.errors, undefined);
});

test('min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: "foo" })
      }
    `,
  });

  t.is(result.data?.min, 'foo');
  t.is(result.errors, undefined);
});

test('max', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        max(input: { max: "foo" })
      }
    `,
  });

  t.is(result.data?.max, 'foo');
  t.is(result.errors, undefined);
});

test('startsWith', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        startsWith(input: { startsWith: "foo bar" })
      }
    `,
  });

  t.is(result.data?.startsWith, 'foo');
  t.is(result.errors, undefined);
});

test('endsWith', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        endsWith(input: { endsWith: "bar foo" })
      }
    `,
  });

  t.is(result.data?.endsWith, 'foo');
  t.is(result.errors, undefined);
});

test('includes', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        includes(input: { includes: "bar foo baz" })
      }
    `,
  });

  t.is(result.data?.includes, 'foo');
  t.is(result.errors, undefined);
});

test('regex', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        regex(input: { regex: "FOO" })
      }
    `,
  });

  t.is(result.data?.regex, 'foo');
  t.is(result.errors, undefined);
});

test('regex flags', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        regexFlags(input: { regex: "Foo" })
      }
    `,
  });

  t.is(result.data?.regexFlags, 'foo');
  t.is(result.errors, undefined);
});

test('oneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        oneOf(input: { oneOf: "foo" })
      }
    `,
  });

  t.is(result.data?.oneOf, 'foo');
  t.is(result.errors, undefined);
});

test('notOneOf', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        notOneOf(input: { notOneOf: "barr" })
      }
    `,
  });

  t.is(result.data?.notOneOf, 'foo');
  t.is(result.errors, undefined);
});

test('aggregate', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        aggregate(
          input: {
            min: "foo"
            max: "foo"
            startsWith: "foo bar"
            endsWith: "bar foo"
            includes: "foo bar baz"
            regex: "FOO"
            oneOf: "foo"
            notOneOf: "barr"
          }
        )
      }
    `,
  });

  t.is(result.data?.aggregate, 'foo');
  t.is(result.errors, undefined);
});

test('bad email', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        email(input: { email: "test@test" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad url', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        url(input: { url: "https://test" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad uuid', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        uuid(input: { uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 a" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad min', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        min(input: { min: "fo" })
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
        max(input: { max: "fooo" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad startsWith', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        startsWith(input: { startsWith: "bar foo" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad endsWith', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        endsWith(input: { endsWith: "foo bar" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad includes', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        includes(input: { includes: "bar baz" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad regex', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        regex(input: { regex: "foo" })
      }
    `,
  });

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.BadUserInput);
});

test('bad regex flags', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        regexFlags(input: { regex: "Foo1" })
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
        oneOf(input: { oneOf: "barr" })
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
        notOneOf(input: { notOneOf: "foo" })
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
            min: "fo"
            max: "fooo"
            startsWith: "bar foo"
            endsWith: "foo bar"
            includes: "bar baz"
            regex: "foo"
            oneOf: "barr"
            notOneOf: "foo"
          }
        )
      }
    `,
  });

  const errors = result.errors?.[0].extensions.errors as GraphQLError[] | undefined;

  t.is(result.errors?.length, 1);
  t.is(result.errors?.[0].extensions.code, BaetaErrorCode.AggregateError);
  t.is(errors?.length, 8);
  t.true(errors?.every((error) => error.extensions.code === BaetaErrorCode.BadUserInput));
});

test('skip bad types', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        badType(input: { badType: 10 })
      }
    `,
  });

  t.is(result.data?.badType, 'foo');
  t.is(result.errors, undefined);
});
