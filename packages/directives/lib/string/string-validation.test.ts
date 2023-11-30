import test from 'ava';
import gql from 'graphql-tag';
import {
  makeAggregateErrorsInputMacro,
  makeInvalidInputMacro,
  makeValidInputMacro,
} from '../../__tests__/macros';
import { stringValidation } from '../string/string-validation';

const typeDefs = gql`
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

  ${stringValidation.sdl}
`;

const validInputMacro = makeValidInputMacro(typeDefs, stringValidation.directive);
const invalidInputMacro = makeInvalidInputMacro(typeDefs, stringValidation.directive);
const aggregateErrorMacro = makeAggregateErrorsInputMacro(typeDefs, stringValidation.directive);

test(
  'email',
  validInputMacro,
  'EmailInput!',
  gql`
    query {
      value(input: { email: "test@test.com" })
    }
  `,
);

test(
  'url',
  validInputMacro,
  'UrlInput!',
  gql`
    query {
      value(input: { url: "https://test.com" })
    }
  `,
);

test(
  'uuid',
  validInputMacro,
  'UUIDInput!',
  gql`
    query {
      value(input: { uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" })
    }
  `,
);

test(
  'min',
  validInputMacro,
  'MinInput!',
  gql`
    query {
      value(input: { min: "foo" })
    }
  `,
);

test(
  'max',
  validInputMacro,
  'MaxInput!',
  gql`
    query {
      value(input: { max: "foo" })
    }
  `,
);

test(
  'startsWith',
  validInputMacro,
  'StartsWithInput!',
  gql`
    query {
      value(input: { startsWith: "foo bar" })
    }
  `,
);

test(
  'endsWith',
  validInputMacro,
  'EndsWithInput!',
  gql`
    query {
      value(input: { endsWith: "bar foo" })
    }
  `,
);

test(
  'includes',
  validInputMacro,
  'IncludesInput!',
  gql`
    query {
      value(input: { includes: "bar foo baz" })
    }
  `,
);

test(
  'regex',
  validInputMacro,
  'RegexInput!',
  gql`
    query {
      value(input: { regex: "FOO" })
    }
  `,
);

test(
  'regex flags',
  validInputMacro,
  'RegexFlagsInput!',
  gql`
    query {
      value(input: { regex: "Foo" })
    }
  `,
);

test(
  'oneOf',
  validInputMacro,
  'OneOfInput!',
  gql`
    query {
      value(input: { oneOf: "foo" })
    }
  `,
);

test(
  'notOneOf',
  validInputMacro,
  'NotOneOfInput!',
  gql`
    query {
      value(input: { notOneOf: "barr" })
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
);

test(
  'invalid email',
  invalidInputMacro,
  'EmailInput!',
  gql`
    query {
      value(input: { email: "test@test" })
    }
  `,
);

test(
  'invalid url',
  invalidInputMacro,
  'UrlInput!',
  gql`
    query {
      value(input: { url: "https://test" })
    }
  `,
);

test(
  'invalid uuid',
  invalidInputMacro,
  'UUIDInput!',
  gql`
    query {
      value(input: { uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 a" })
    }
  `,
);

test(
  'invalid min',
  invalidInputMacro,
  'MinInput!',
  gql`
    query {
      value(input: { min: "fo" })
    }
  `,
);

test(
  'invalid max',
  invalidInputMacro,
  'MaxInput!',
  gql`
    query {
      value(input: { max: "fooo" })
    }
  `,
);

test(
  'invalid startsWith',
  invalidInputMacro,
  'StartsWithInput!',
  gql`
    query {
      value(input: { startsWith: "bar foo" })
    }
  `,
);

test(
  'invalid endsWith',
  invalidInputMacro,
  'EndsWithInput!',
  gql`
    query {
      value(input: { endsWith: "foo bar" })
    }
  `,
);

test(
  'invalid includes',
  invalidInputMacro,
  'IncludesInput!',
  gql`
    query {
      value(input: { includes: "bar baz" })
    }
  `,
);

test(
  'invalid regex',
  invalidInputMacro,
  'RegexInput!',
  gql`
    query {
      value(input: { regex: "foo" })
    }
  `,
);

test(
  'invalid regex flags',
  invalidInputMacro,
  'RegexFlagsInput!',
  gql`
    query {
      value(input: { regex: "Foo1" })
    }
  `,
);

test(
  'invalid oneOf',
  invalidInputMacro,
  'OneOfInput!',
  gql`
    query {
      value(input: { oneOf: "barr" })
    }
  `,
);

test(
  'invalid notOneOf',
  invalidInputMacro,
  'NotOneOfInput!',
  gql`
    query {
      value(input: { notOneOf: "foo" })
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
  8,
);

test(
  'skip bad types',
  validInputMacro,
  'BadTypeInput!',
  gql`
    query {
      value(input: { badType: 10 })
    }
  `,
);
