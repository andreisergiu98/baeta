import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import {
  GraphQLError,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLNamedType,
  GraphQLSchema,
  Kind,
} from "graphql";

type Constraint = { minFields?: number; maxFields?: number };
type ConstraintMap = Map<string, Constraint>;

function createFieldMessage(count: number) {
  const variant = count === 1 ? "field" : "fields";
  return count + " " + variant;
}

type Arg = Record<string, unknown | undefined>;

function validate(arg: Arg, constraints: Constraint) {
  if (arg == null) {
    return;
  }

  const fields = Object.keys(arg).length;
  const min = constraints.minFields;
  const max = constraints.maxFields;

  if (min != null && fields < min) {
    throw new GraphQLError(
      `Expected at least ${createFieldMessage(min)}, got ${createFieldMessage(
        fields
      )}`,
      {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      }
    );
  }

  if (max != null && fields > max) {
    throw new GraphQLError(
      `Expected at most ${createFieldMessage(max)}, got ${createFieldMessage(
        fields
      )}`,
      {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      }
    );
  }
}

function isGraphQLInputObjectType(
  type: GraphQLNamedType | GraphQLInputType
): type is GraphQLInputObjectType {
  return (
    (type as GraphQLNamedType).astNode?.kind ===
    Kind.INPUT_OBJECT_TYPE_DEFINITION
  );
}

function getConstraintDirective(
  schema: GraphQLSchema,
  type: GraphQLInputObjectType
) {
  return getDirective(schema, type, "inputConstraint")?.[0] as
    | Constraint
    | undefined;
}

function needsValidation(
  input: GraphQLInputObjectType,
  constraintsMap: ConstraintMap,
  validationMap: Map<string, boolean>
) {
  if (constraintsMap.get(input.name) != null) {
    validationMap.set(input.name, true);
    return true;
  }

  const fields = Object.values(input.getFields());

  for (const field of fields) {
    if (!isGraphQLInputObjectType(field.type)) {
      continue;
    }

    let requiresValidation = validationMap.get(field.type.name);

    if (requiresValidation) {
      validationMap.set(input.name, true);
      return true;
    }

    if (requiresValidation === false) {
      continue;
    }

    validationMap.set(field.type.name, false);

    requiresValidation = needsValidation(
      field.type,
      constraintsMap,
      validationMap
    );

    if (requiresValidation) {
      validationMap.set(input.name, true);
      return true;
    }
  }

  validationMap.set(input.name, false);
  return false;
}

function validateArg(
  arg: Arg | undefined,
  key: string,
  input: GraphQLInputObjectType,
  constraintsMap: ConstraintMap,
  validationMap: Map<string, boolean>
) {
  if (arg == null) {
    return;
  }

  const value = arg[key] as Arg | undefined;

  if (value == null) {
    return;
  }

  const fields = Object.values(input.getFields());

  for (const field of fields) {
    if (!isGraphQLInputObjectType(field.type)) {
      continue;
    }

    if (!validationMap.get(field.type.name)) {
      continue;
    }

    validateArg(value, field.name, field.type, constraintsMap, validationMap);
  }

  const constraints = constraintsMap.get(input.name);

  if (constraints != null) {
    validate(value, constraints);
  }
}

export function registerInputConstraintDirective(schema: GraphQLSchema) {
  const types = Object.values(schema.getTypeMap());
  const inputs: GraphQLInputObjectType[] = [];
  const constraintsMap = new Map<string, Constraint>();
  const validationMap = new Map<string, boolean>();

  for (const type of types) {
    if (!isGraphQLInputObjectType(type)) {
      continue;
    }

    const constraint = getConstraintDirective(schema, type);

    if (constraint) {
      constraintsMap.set(type.name, constraint);
    }

    inputs.push(type);
  }

  for (const input of inputs) {
    needsValidation(input, constraintsMap, validationMap);
  }

  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (type) => {
      const args = Object.entries(type.args ?? {});

      if (args.length === 0) {
        return;
      }

      const toValidate: Array<[string, GraphQLInputObjectType]> = [];

      for (const [key, arg] of args) {
        if (!isGraphQLInputObjectType(arg.type)) {
          continue;
        }
        if (!validationMap.get(arg.type.name)) {
          continue;
        }

        toValidate.push([key, arg.type]);
      }

      if (toValidate.length === 0) {
        return;
      }

      const { resolve } = type;

      if (resolve == null) {
        return;
      }

      return {
        ...type,
        resolve: (source, args, context, info) => {
          for (const [key, type] of toValidate) {
            validateArg(args, key, type, constraintsMap, validationMap);
          }

          return resolve(source, args, context, info);
        },
      };
    },
  });
}
