import test from 'ava';
import { gql } from 'graphql-tag';
import { makeInvalidInputMacro, makeValidInputMacro } from '../../__tests__/macros';
import { inputConstraints } from './input-validation';

const typeDefs = gql`
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

  ${inputConstraints.sdl}
`;

const validInputMacro = makeValidInputMacro(typeDefs, inputConstraints.directive);
const invalidInputMacro = makeInvalidInputMacro(typeDefs, inputConstraints.directive);

test(
  'min fields',
  validInputMacro,
  'MinFieldsInput!',
  gql`
    query {
      value(input: { id: "1" })
    }
  `
);

test(
  'max fields',
  validInputMacro,
  'MaxFieldsInput!',
  gql`
    query {
      value(input: { id: "1" })
    }
  `
);

test(
  'min max fields',
  validInputMacro,
  'MinMaxFieldsInput!',
  gql`
    query {
      value(input: { id: "1" })
    }
  `
);

test(
  'invalid min fields',
  invalidInputMacro,
  'MinFieldsInput!',
  gql`
    query {
      value(input: {})
    }
  `
);

test(
  'invalid max fields',
  invalidInputMacro,
  'MaxFieldsInput!',
  gql`
    query {
      value(input: { id: "1", email: "test@test.com" })
    }
  `
);

test(
  'invalid min max fields',
  invalidInputMacro,
  'MinMaxFieldsInput!',
  gql`
    query {
      value(input: {})
    }
  `
);

test(
  'invalid min max fields 2',
  invalidInputMacro,
  'MinMaxFieldsInput!',
  gql`
    query {
      value(input: { id: "1", email: "test@test.com" })
    }
  `
);
