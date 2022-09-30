import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";
import {
  addArgumentValidationsExtension,
  addValidationsExtension,
  ValidationOptions,
} from "./input-extensions";
import { ValidateParams } from "./input-schema";

export type ValidationTarget = "list" | "object" | "scalar";

type ValidationDirectiveFnParams<DirectiveConfig, Context> =
  ValidateParams<Context> & {
    directiveConfig: DirectiveConfig;
    getValue: () => unknown;
    setValue: (newValue: unknown) => void;
  };

export type ValidationDirectiveFn<
  DirectiveConfig = Record<string, unknown>,
  Context = unknown
> = (
  params: ValidationDirectiveFnParams<DirectiveConfig, Context>
) => void | Promise<void>;

function getObjectSelector(
  args: Record<string, unknown>,
  path: Array<string | number>
) {
  let i = 0;
  let key: string | number;
  let obj: Record<string, any> = args;

  for (let i = 0; i < path.length - 1; ++i) {
    key = path[i];
    obj = obj[key];
  }

  key = path[i + 1];

  if (key == null) {
    return;
  }

  const get = () => {
    return obj[key];
  };

  const set = (newValue: unknown) => {
    obj[key] = newValue;
  };

  return { get, set };
}

function createMutateValueFn(
  args: Record<string, unknown>,
  path: Array<string | number>
) {
  return (newValue: unknown) => {
    const selector = getObjectSelector(args, path);
    selector?.set(newValue);
  };
}

function createGetValueFn(
  args: Record<string, unknown>,
  path: Array<string | number>
) {
  return () => {
    const selector = getObjectSelector(args, path);
    return selector?.get();
  };
}

function createValidationFn<DirectiveConfig, Context>(
  directiveConfig: DirectiveConfig,
  validate: ValidationDirectiveFn<DirectiveConfig, Context>
) {
  return (params: ValidateParams<Context>) => {
    const getValue = createGetValueFn(params.args, params.path);
    const setValue = createMutateValueFn(params.args, params.path);
    return validate({ ...params, directiveConfig, getValue, setValue });
  };
}

function applyInputDirective(
  schema: GraphQLSchema,
  name: string,
  target: ValidationTarget,
  validate: ValidationDirectiveFn,
  getDepth?: (config: unknown) => number
) {
  return mapSchema(schema, {
    [MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig) => {
      const directiveConfigs = getDirective(schema, fieldConfig, name);

      if (directiveConfigs == null) {
        return;
      }

      for (const directiveConfig of directiveConfigs) {
        addValidationsExtension(fieldConfig, {
          target,
          listDepth: getDepth?.(directiveConfig) ?? 0,
          fn: createValidationFn(directiveConfig, validate),
        });
      }

      return fieldConfig;
    },
    [MapperKind.INPUT_OBJECT_TYPE]: (inputObjectType) => {
      const directiveConfigs = getDirective(schema, inputObjectType, name);

      if (directiveConfigs == null) {
        return;
      }

      for (const directiveConfig of directiveConfigs) {
        addValidationsExtension(inputObjectType, {
          target,
          listDepth: 0,
          fn: createValidationFn(directiveConfig, validate),
        });
      }

      return inputObjectType;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const argsEntries = Object.entries(fieldConfig.args ?? {});
      const validationsByArgumentName: Record<string, ValidationOptions[]> = {};

      for (const [argumentName, argumentConfig] of argsEntries) {
        const directiveConfigs = getDirective(schema, argumentConfig, name);

        if (directiveConfigs == null) {
          continue;
        }

        const argumentValidations = directiveConfigs.map((directiveConfig) => ({
          target,
          listDepth: getDepth?.(directiveConfig) ?? 0,
          fn: createValidationFn(directiveConfig, validate),
        }));

        validationsByArgumentName[argumentName] = argumentValidations;
      }

      const validationEntries = Object.entries(validationsByArgumentName);

      for (const [argumentName, argValidations] of validationEntries) {
        for (const validationMeta of argValidations) {
          addArgumentValidationsExtension(
            fieldConfig,
            argumentName,
            validationMeta
          );
        }
      }

      return fieldConfig;
    },
  });
}

type InputDirectiveOptions<DirectiveConfig, Context> = {
  name: string;
  target: ValidationTarget;
  resolve: ValidationDirectiveFn<DirectiveConfig, Context>;
  getListDepth?: (config: DirectiveConfig) => number;
};

export function createInputDirective<DirectiveConfig, Context = unknown>(
  options: InputDirectiveOptions<DirectiveConfig, Context>
) {
  return (schema: GraphQLSchema) => {
    return applyInputDirective(
      schema,
      options.name,
      options.target,
      options.resolve as ValidationDirectiveFn<
        Record<string, unknown>,
        unknown
      >,
      options.getListDepth as (config: unknown) => number
    );
  };
}
