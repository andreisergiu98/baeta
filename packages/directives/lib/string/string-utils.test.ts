import test from 'ava';
import type { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';
import { makeQueryResolverMacro } from '../../__tests__/macros.ts';
import { lower, trim, upper } from '../string/string-utils.ts';

const typeDefs = gql`
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

  ${trim.sdl}
  ${lower.sdl}
  ${upper.sdl}
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

const transformer = (schema: GraphQLSchema) => {
	return trim.directive(upper.directive(lower.directive(schema)));
};

const argsValueMacro = makeQueryResolverMacro(
	typeDefs,
	transformer,
	(args: ValueArgs) => args.input.value,
	'String',
);
const argsAggregateMacro = makeQueryResolverMacro(
	typeDefs,
	transformer,
	(args: AggregateArgs) => [args.input.trim, args.input.lower, args.input.upper].join(''),
	'String',
);
const argsBadTypeMacro = makeQueryResolverMacro(
	typeDefs,
	transformer,
	(args: BadTypeArgs) => args.input.badTrim + args.input.badLower + args.input.badUpper,
	'Int',
);

test(
	'trim',
	argsValueMacro,
	'TrimInput!',
	'foo',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'trim 2',
	argsValueMacro,
	'Trim2Input!',
	'foo',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'trim start',
	argsValueMacro,
	'TrimStartInput!',
	'foo  ',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'trim start 2',
	argsValueMacro,
	'TrimStart2Input!',
	'foo  ',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'trim end',
	argsValueMacro,
	'TrimEndInput!',
	'  foo',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'trim end 2',
	argsValueMacro,
	'TrimEnd2Input!',
	'  foo',
	gql`
    query {
      value(input: { value: "  foo  " })
    }
  `,
);

test(
	'lower',
	argsValueMacro,
	'LowerInput!',
	'foo',
	gql`
    query {
      value(input: { value: "FOO" })
    }
  `,
);

test(
	'upper',
	argsValueMacro,
	'UpperInput!',
	'FOO',
	gql`
    query {
      value(input: { value: "foo" })
    }
  `,
);

test(
	'aggregate',
	argsAggregateMacro,
	'AggregateInput!',
	'foofooFOO',
	gql`
    query {
      value(input: { trim: "  foo  ", lower: "FOO", upper: "foo" })
    }
  `,
);

test(
	'skip bad types',
	argsBadTypeMacro,
	'BadTypeInput!',
	30,
	gql`
    query {
      value(input: { badTrim: 10, badLower: 10, badUpper: 10 })
    }
  `,
);
