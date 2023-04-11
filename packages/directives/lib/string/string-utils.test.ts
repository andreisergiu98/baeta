import { addValidationToSchema } from '@baeta/core/lib/input-directive/input-schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import test from 'ava';
import { execute } from 'graphql';
import gql from 'graphql-tag';
import { lower, trim, upper } from '../string/string-utils';

const typeDefs = `
    ${trim.sdl}
    ${lower.sdl}
    ${upper.sdl}

    input TrimInput {
        value: String @trim
    }

    input Trim2Input {
        value: String @trim(start: true, end: true)
    }

    input TrimStartInput {
        value: String @trim(start: true)
    }

    input TrimStart2Input {
        value: String @trim(start: true, end: false)
    }

    input TrimEndInput {
        value: String @trim(end: true)
    }

    input TrimEnd2Input {
        value: String @trim(start: false, end: true)
    }

    input LowerInput {
        value: String @lower
    }

    input UpperInput {
        value: String @upper
    }

    input AggregateInput {
        trim: String @trim
        lower: String @lower
        upper: String @upper
    }

    input BadTypeInput {
        badTrim: Int @trim
        badLower: Int @lower
        badUpper: Int @upper
    }

    type Query {
        trim(input: TrimInput): String
        trim2(input: Trim2Input): String
        trimStart(input: TrimStartInput): String
        trimStart2(input: TrimStart2Input): String
        trimEnd(input: TrimEndInput): String
        trimEnd2(input: TrimEnd2Input): String
        lower(input: LowerInput): String
        upper(input: UpperInput): String
        aggregate(input: AggregateInput): String
        badType(input: BadTypeInput!): Int
    }    
`;

interface ValueArgs {
  input: {
    value: string;
  };
}

interface BadTypeArgs {
  input: {
    badTrim: number;
    badLower: number;
    badUpper: number;
  };
}

interface AggregateArgs {
  input: {
    trim: string;
    lower: string;
    upper: string;
  };
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      trim: (parent: any, args: ValueArgs) => args.input.value,
      trim2: (parent: any, args: ValueArgs) => args.input.value,
      trimStart: (parent: any, args: ValueArgs) => args.input.value,
      trimStart2: (parent: any, args: ValueArgs) => args.input.value,
      trimEnd: (parent: any, args: ValueArgs) => args.input.value,
      trimEnd2: (parent: any, args: ValueArgs) => args.input.value,
      lower: (parent: any, args: ValueArgs) => args.input.value,
      upper: (parent: any, args: ValueArgs) => args.input.value,
      aggregate: (parent: any, args: AggregateArgs) =>
        [args.input.trim, args.input.lower, args.input.upper].join(''),
      badType: (parent: any, args: BadTypeArgs) =>
        args.input.badTrim + args.input.badLower + args.input.badUpper,
    },
  },
});

const schema = addValidationToSchema(
  trim.directive(upper.directive(lower.directive(executableSchema)))
);

test('trim', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trim(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trim, 'foo');
  t.is(result.errors, undefined);
});

test('trim 2', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trim(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trim, 'foo');
  t.is(result.errors, undefined);
});

test('trim start', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trimStart(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trimStart, 'foo  ');
  t.is(result.errors, undefined);
});

test('trim start 2', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trimStart(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trimStart, 'foo  ');
  t.is(result.errors, undefined);
});

test('trim end', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trimEnd(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trimEnd, '  foo');
  t.is(result.errors, undefined);
});

test('trim end 2', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        trimEnd(input: { value: "  foo  " })
      }
    `,
  });

  t.is(result.data?.trimEnd, '  foo');
  t.is(result.errors, undefined);
});

test('lower', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        lower(input: { value: "FOO" })
      }
    `,
  });

  t.is(result.data?.lower, 'foo');
  t.is(result.errors, undefined);
});

test('upper', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        upper(input: { value: "foo" })
      }
    `,
  });

  t.is(result.data?.upper, 'FOO');
  t.is(result.errors, undefined);
});

test('aggregate', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        aggregate(input: { trim: "  foo  ", lower: "FOO", upper: "foo" })
      }
    `,
  });

  t.is(result.data?.aggregate, 'foofooFOO');
  t.is(result.errors, undefined);
});

test('skip bad types', async (t) => {
  const result = await execute({
    schema,
    document: gql`
      query {
        badType(input: { badTrim: 10, badLower: 10, badUpper: 10 })
      }
    `,
  });

  t.is(result.data?.badType, 30);
  t.is(result.errors, undefined);
});
