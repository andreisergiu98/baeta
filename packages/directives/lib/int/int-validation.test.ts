import test from 'ava';
import { gql } from 'graphql-tag';
import {
  makeAggregateErrorsInputMacro,
  makeInvalidInputMacro,
  makeValidInputMacro,
} from '../../__tests__/macros';
import { intValidation } from '../int/int-validation';

const typeDefs = gql`
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

  ${intValidation.sdl}
`;

const validInputMacro = makeValidInputMacro(typeDefs, intValidation.directive);
const invalidInputMacro = makeInvalidInputMacro(typeDefs, intValidation.directive);
const aggregateErrorMacro = makeAggregateErrorsInputMacro(typeDefs, intValidation.directive);

test(
  'min',
  validInputMacro,
  'MinInput!',
  gql`
    query {
      value(input: { min: 10 })
    }
  `,
);

test(
  'max',
  validInputMacro,
  'MaxInput!',
  gql`
    query {
      value(input: { max: 10 })
    }
  `,
);

test(
  'exclusiveMin',
  validInputMacro,
  'ExclusiveMinInput!',
  gql`
    query {
      value(input: { exclusiveMin: 11 })
    }
  `,
);

test(
  'exclusiveMax',
  validInputMacro,
  'ExclusiveMaxInput!',
  gql`
    query {
      value(input: { exclusiveMax: 0 })
    }
  `,
);

test(
  'multipleOf',
  validInputMacro,
  'MultipleOfInput!',
  gql`
    query {
      value(input: { multipleOf: 100 })
    }
  `,
);

test(
  'oneOf',
  validInputMacro,
  'OneOfInput!',
  gql`
    query {
      value(input: { oneOf: 10 })
    }
  `,
);

test(
  'notOneOf',
  validInputMacro,
  'NotOneOfInput!',
  gql`
    query {
      value(input: { notOneOf: 11 })
    }
  `,
);

test(
  'aggregate',
  validInputMacro,
  'AggregateInput!',
  gql`
    query {
      value(
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
);

test(
  'invalid min',
  invalidInputMacro,
  'MinInput!',
  gql`
    query {
      value(input: { min: 9 })
    }
  `,
);

test(
  'invalid max',
  invalidInputMacro,
  'MaxInput!',
  gql`
    query {
      value(input: { max: 11 })
    }
  `,
);

test(
  'invalid exclusiveMin',
  invalidInputMacro,
  'ExclusiveMinInput!',
  gql`
    query {
      value(input: { exclusiveMin: 10 })
    }
  `,
);

test(
  'invalid exclusiveMax',
  invalidInputMacro,
  'ExclusiveMaxInput!',
  gql`
    query {
      value(input: { exclusiveMax: 10 })
    }
  `,
);

test(
  'invalid multipleOf',
  invalidInputMacro,
  'MultipleOfInput!',
  gql`
    query {
      value(input: { multipleOf: 5 })
    }
  `,
);

test(
  'invalid oneOf',
  invalidInputMacro,
  'OneOfInput!',
  gql`
    query {
      value(input: { oneOf: 11 })
    }
  `,
);

test(
  'invalid notOneOf',
  invalidInputMacro,
  'NotOneOfInput!',
  gql`
    query {
      value(input: { notOneOf: 10 })
    }
  `,
);

test(
  'invalid aggregate',
  aggregateErrorMacro,
  'AggregateInput!',
  gql`
    query {
      value(
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
  7,
);

test(
  'skip bad types',
  validInputMacro,
  'BadTypeInput!',
  gql`
    query {
      value(input: { badType: "10" })
    }
  `,
);
