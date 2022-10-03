import { Maybe } from '@graphql-tools/utils';
import {
  GraphQLField,
  GraphQLFieldConfig,
  GraphQLInputField,
  GraphQLInputFieldConfig,
  GraphQLInputObjectType,
  GraphQLNamedInputType,
} from 'graphql';
import { ValidationTarget } from './input-directive';
import { ValidateFn } from './input-schema';

export type ValidationOptions = {
  target: ValidationTarget;
  listDepth: number;
  fn: ValidateFn;
};

export type ValidationsExtension = {
  validations: ValidationOptions[];
};

export type ArgumentValidationsExtension = {
  argumentValidations: Record<string, ValidationOptions[] | undefined>;
};

export type ValidateExtension = {
  validate: true;
};

function initValidationsExtension(
  config: GraphQLInputObjectType | GraphQLInputFieldConfig
) {
  if (config.extensions?.validations == null) {
    Object.defineProperty(config.extensions, 'validations', {
      value: [],
      writable: true,
    });
  }
  return config.extensions as ValidationsExtension;
}

function initArgumentValidationsExtension(
  config: GraphQLFieldConfig<unknown, unknown, unknown>
) {
  if (config.extensions?.argumentValidations == null) {
    Object.defineProperty(config.extensions, 'argumentValidations', {
      value: {},
      writable: true,
    });
  }
  return config.extensions as ArgumentValidationsExtension;
}

export function addValidateExtension(type: GraphQLInputObjectType) {
  Object.defineProperty(type.extensions, 'validate', {
    value: true,
    writable: false,
  });
}

export function addValidationsExtension(
  config: GraphQLInputObjectType | GraphQLInputFieldConfig,
  validation: ValidationOptions
) {
  const extensions = initValidationsExtension(config);
  extensions.validations.push(validation);
}

export function addArgumentValidationsExtension(
  config: GraphQLFieldConfig<unknown, unknown, unknown>,
  name: string,
  validation: ValidationOptions
) {
  const extensions = initArgumentValidationsExtension(config);
  if (extensions.argumentValidations[name] == null) {
    extensions.argumentValidations[name] = [];
  }
  extensions.argumentValidations[name]?.push(validation);
}

export function hasValidateExtension(type: GraphQLNamedInputType) {
  const extension = type.extensions as Maybe<ValidateExtension>;
  return extension?.validate === true;
}

export function hasValidationsExtension(
  type: GraphQLInputObjectType | GraphQLInputField
) {
  const extension = type.extensions as Maybe<ValidationsExtension>;
  return extension?.validations != null;
}

export function hasArgumentValidationsExtension(
  type: GraphQLField<unknown, unknown, unknown>
) {
  const extension = type.extensions as Maybe<ArgumentValidationsExtension>;
  return extension?.argumentValidations != null;
}

export function getValidationsFromExtension(
  type: GraphQLInputField | GraphQLInputObjectType
) {
  const extension = type.extensions as Maybe<ValidationsExtension>;
  return extension?.validations;
}

export function getArgumentValidationsFromExtensions(
  type: GraphQLField<unknown, unknown, unknown>,
  name: string
) {
  const extension = type.extensions as Maybe<ArgumentValidationsExtension>;
  return extension?.argumentValidations?.[name];
}
