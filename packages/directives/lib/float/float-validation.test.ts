import test from '@baeta/testing';
import { gql } from 'graphql-tag';
import {
	makeAggregateErrorsInputMacro,
	makeInvalidInputMacro,
	makeValidInputMacro,
} from '../../__tests__/macros.ts';
import { floatValidation } from '../float/float-validation.ts';

const typeDefs = gql`
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

  ${floatValidation.sdl}
`;

const validInputMacro = makeValidInputMacro(typeDefs, floatValidation.directive);
const invalidInputMacro = makeInvalidInputMacro(typeDefs, floatValidation.directive);
const aggregateErrorMacro = makeAggregateErrorsInputMacro(typeDefs, floatValidation.directive);

test(
	'min',
	validInputMacro,
	'MinInput!',
	gql`
    query {
      value(input: { min: 10.5 })
    }
  `,
);

test(
	'max',
	validInputMacro,
	'MaxInput!',
	gql`
    query {
      value(input: { max: 10.5 })
    }
  `,
);

test(
	'exclusiveMin',
	validInputMacro,
	'ExclusiveMinInput!',
	gql`
    query {
      value(input: { exclusiveMin: 10.6 })
    }
  `,
);
test(
	'exclusiveMax',
	validInputMacro,
	'ExclusiveMaxInput!',
	gql`
    query {
      value(input: { exclusiveMax: 10.4 })
    }
  `,
);

test(
	'multipleOf',
	validInputMacro,
	'MultipleOfInput!',
	gql`
    query {
      value(input: { multipleOf: 105 })
    }
  `,
);

test(
	'oneOf',
	validInputMacro,
	'OneOfInput!',
	gql`
    query {
      value(input: { oneOf: 10.5 })
    }
  `,
);

test(
	'notOneOf',
	validInputMacro,
	'NotOneOfInput!',
	gql`
    query {
      value(input: { notOneOf: 10.6 })
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
);

test(
	'invalid min',
	invalidInputMacro,
	'MinInput!',
	gql`
    query {
      value(input: { min: 10.4 })
    }
  `,
);

test(
	'invalid max',
	invalidInputMacro,
	'MaxInput!',
	gql`
    query {
      value(input: { max: 10.6 })
    }
  `,
);

test(
	'invalid exclusiveMin',
	invalidInputMacro,
	'ExclusiveMinInput!',
	gql`
    query {
      value(input: { exclusiveMin: 10.5 })
    }
  `,
);

test(
	'invalid exclusiveMax',
	invalidInputMacro,
	'ExclusiveMaxInput!',
	gql`
    query {
      value(input: { exclusiveMax: 10.5 })
    }
  `,
);

test(
	'invalid multipleOf',
	invalidInputMacro,
	'MultipleOfInput!',
	gql`
    query {
      value(input: { multipleOf: 10 })
    }
  `,
);

test(
	'invalid oneOf',
	invalidInputMacro,
	'OneOfInput!',
	gql`
    query {
      value(input: { oneOf: 10.6 })
    }
  `,
);

test(
	'invalid notOneOf',
	invalidInputMacro,
	'NotOneOfInput!',
	gql`
    query {
      value(input: { notOneOf: 10.5 })
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
	7,
);

test(
	'skip bad types',
	validInputMacro,
	'BadTypeInput!',
	gql`
    query {
      value(input: { badType: "10.5" })
    }
  `,
);
