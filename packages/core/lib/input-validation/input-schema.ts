import {
  getNamedType,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLSchema,
  GraphQLType,
  Kind,
} from "graphql";
import { flattenPromises } from "../../utils/promises";
import { AggregateValidationError } from "./aggregate-error";
import { ValidationError } from "./validation-error";
import {
  addValidateExtension,
  getArgumentValidationsFromExtensions,
  getValidationsFromExtension,
  hasArgumentValidationsExtension,
  hasValidateExtension,
  hasValidationsExtension,
  ValidationOptions,
} from "./input-extensions";

export type ValidateParams<Context = unknown> = {
  path: Array<number | string>;
  type: GraphQLType;
  root: unknown;
  args: Record<string, unknown>;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type ValidateFn = <Context>(
  params: ValidateParams<Context>
) => void | Promise<void>;

function isInputObjectType(
  type: GraphQLNamedType
): type is GraphQLInputObjectType {
  return type.astNode?.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}

function isObjectType(type: GraphQLNamedType): type is GraphQLObjectType {
  return type.astNode?.kind === Kind.OBJECT_TYPE_DEFINITION;
}

function getFieldsWithArgumentsAndInputObjectTypes(schema: GraphQLSchema) {
  const fieldsWithArguments: GraphQLField<unknown, unknown>[] = [];
  const inputObjectTypes: GraphQLInputObjectType[] = [];
  const types = Object.values(schema.getTypeMap());

  for (const type of types) {
    if (isInputObjectType(type)) {
      inputObjectTypes.push(type);
      continue;
    }

    if (isObjectType(type)) {
      const fields = Object.values(type.getFields());
      fieldsWithArguments.push(
        ...fields.filter((field) => field.args.length > 0)
      );
    }
  }

  return { fieldsWithArguments, inputObjectTypes };
}

function addValidateExtensionToInputObjectTypesRecursive(
  inputObjectType: GraphQLInputObjectType,
  visitedTypes: GraphQLInputObjectType[] = []
) {
  const newVisitedTypes = [...visitedTypes, inputObjectType];
  const inputFields = Object.values(inputObjectType.getFields());
  const inputHasValidation = hasValidationsExtension(inputObjectType);

  const fieldsHaveValidations = inputFields.some((field) => {
    const fieldType = getNamedType(field.type);

    if (!isInputObjectType(fieldType)) {
      return hasValidationsExtension(field);
    }

    if (newVisitedTypes.includes(fieldType)) {
      return hasValidationsExtension(fieldType);
    }

    return addValidateExtensionToInputObjectTypesRecursive(
      fieldType,
      newVisitedTypes
    );
  });

  const validate = inputHasValidation || fieldsHaveValidations;

  if (validate) {
    addValidateExtension(inputObjectType);
  }

  return validate;
}

async function handleResolver(
  validation: ValidationOptions,
  type: GraphQLType,
  path: Array<number | string>,
  root: unknown,
  args: Record<string, unknown>,
  ctx: unknown,
  info: GraphQLResolveInfo
) {
  try {
    await validation.fn({ type, path, root, args, ctx, info });
    return [];
  } catch (err) {
    const validationError = new ValidationError(err as Error, path);
    return [validationError];
  }
}

async function validateListType(
  root: unknown,
  args: Record<string, unknown>,
  ctx: unknown,
  info: GraphQLResolveInfo,
  path: Array<number | string>,
  value: unknown[],
  type: GraphQLList<GraphQLType>,
  validations: ValidationOptions[] = [],
  listDepth = 0
) {
  const listValidations = validations.filter(
    (validation) =>
      validation.target === "list" && validation.listDepth === listDepth
  );

  const promises: Promise<ValidationError[]>[] = [];

  for (const validation of listValidations) {
    promises.push(
      handleResolver(validation, type, path, root, args, ctx, info)
    );
  }

  for (let index = 0; index < value.length; index++) {
    const item = value[index];
    promises.push(
      validateRecursive(
        root,
        args,
        ctx,
        info,
        [...path, index],
        item,
        type.ofType,
        validations,
        listDepth + 1
      )
    );
  }

  return flattenPromises(promises);
}

async function validateObjectType(
  root: unknown,
  args: Record<string, unknown>,
  ctx: unknown,
  info: GraphQLResolveInfo,
  path: Array<number | string>,
  value: Record<string, unknown>,
  type: GraphQLInputObjectType,
  validations: ValidationOptions[] = []
) {
  const withInputValidations = validations.concat(
    getValidationsFromExtension(type) ?? []
  );
  const objectValidations = withInputValidations.filter(
    (validation) => validation.target === "object"
  );

  const promises: Promise<ValidationError[]>[] = [];

  for (const validation of objectValidations) {
    promises.push(
      handleResolver(validation, type, path, root, args, ctx, info)
    );
  }

  if (!hasValidateExtension(type)) {
    return flattenPromises(promises);
  }

  const fields = Object.values(type.getFields());

  for (const field of fields) {
    const fieldValidations = getValidationsFromExtension(field) ?? [];
    promises.push(
      validateRecursive(
        root,
        args,
        ctx,
        info,
        [...path, field.name],
        value[field.name],
        field.type,
        fieldValidations
      )
    );
  }

  return flattenPromises(promises);
}

async function validateScalarType(
  root: unknown,
  args: Record<string, unknown>,
  ctx: unknown,
  info: GraphQLResolveInfo,
  path: Array<number | string>,
  type: GraphQLType,
  validations: ValidationOptions[] = []
) {
  if (validations.length === 0) {
    return [];
  }

  const promises: Promise<ValidationError[]>[] = [];

  for (const validation of validations) {
    promises.push(
      handleResolver(validation, type, path, root, args, ctx, info)
    );
  }

  return flattenPromises(promises);
}

async function validateRecursive<TSource, TContext>(
  root: TSource,
  args: Record<string, unknown>,
  ctx: TContext,
  info: GraphQLResolveInfo,
  path: Array<number | string>,
  value: unknown,
  type: GraphQLType,
  validations: ValidationOptions[] = [],
  listDepth = 0
): Promise<ValidationError[]> {
  if (value == null) {
    return [];
  }

  let valueType = type;
  if (valueType instanceof GraphQLNonNull) {
    valueType = valueType.ofType;
  }

  if (valueType instanceof GraphQLList) {
    const listType = valueType as GraphQLList<GraphQLType>;
    return validateListType(
      root,
      args,
      ctx,
      info,
      path,
      value as unknown[],
      listType,
      validations,
      listDepth
    );
  }

  if (valueType instanceof GraphQLInputObjectType) {
    return validateObjectType(
      root,
      args,
      ctx,
      info,
      path,
      value as Record<string, unknown>,
      valueType,
      validations
    );
  }

  return validateScalarType(
    root,
    args,
    ctx,
    info,
    path,
    valueType,
    validations
  );
}

async function validateFieldArguments(
  field: GraphQLField<unknown, unknown, unknown>,
  root: unknown,
  args: Record<string, unknown>,
  ctx: unknown,
  info: GraphQLResolveInfo
) {
  const argEntries = Object.entries(args);
  const argsDefinitionMap: Record<string, GraphQLArgument> = {};

  for (const arg of field.args) {
    argsDefinitionMap[arg.name] = arg;
  }

  const promises: Promise<ValidationError[]>[] = [];

  for (const [argumentName, argumentValue] of argEntries) {
    const argumentDefinition = argsDefinitionMap[argumentName];
    const argumentValidations = getArgumentValidationsFromExtensions(
      field,
      argumentName
    );

    promises.push(
      validateRecursive(
        root,
        args,
        ctx,
        info,
        [argumentName],
        argumentValue,
        argumentDefinition.type,
        argumentValidations
      )
    );
  }

  const errors = await flattenPromises(promises);

  if (errors.length) {
    throw new AggregateValidationError(errors);
  }
}

function wrapValidatedFieldResolvers(
  fieldsWithArguments: GraphQLField<unknown, unknown>[]
) {
  const fieldsToValidate = fieldsWithArguments.filter((field) => {
    if (hasArgumentValidationsExtension(field)) {
      return true;
    }
    const argsTypes = field.args.map((arg) => getNamedType(arg.type));
    return argsTypes.some(hasValidateExtension);
  });

  for (const field of fieldsToValidate) {
    const { resolve: originalResolve } = field;
    if (originalResolve == null) {
      continue;
    }

    field.resolve = async (source, args, context, info) => {
      await validateFieldArguments(field, source, args, context, info);
      return originalResolve(source, args, context, info);
    };
  }
}

export function addValidationToSchema(schema: GraphQLSchema) {
  const { fieldsWithArguments, inputObjectTypes } =
    getFieldsWithArgumentsAndInputObjectTypes(schema);

  for (const input of inputObjectTypes) {
    addValidateExtensionToInputObjectTypesRecursive(input);
  }

  wrapValidatedFieldResolvers(fieldsWithArguments);

  return schema;
}
