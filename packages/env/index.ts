type Types = 'string' | 'number' | 'boolean';

type InferType<T extends Types> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : boolean;

type InferTypeFromOptions<
  O extends EnvOptions<Types, boolean | undefined, InferType<Types> | undefined>,
> =
  O extends EnvOptions<infer T, infer R, infer D>
    ? R extends true
      ? InferType<T>
      : D extends undefined
        ? InferType<T> | undefined
        : InferType<T>
    : never;

export interface EnvOptions<
  T extends Types,
  R extends boolean | undefined,
  D extends InferType<T> | undefined,
> {
  required?: R;
  default?: D;
  type: T;
  resolver?: (value: string) => InferType<T>;
}

function resolveString(value: string) {
  return value;
}

function resolveNumber(value: string) {
  return Number(value);
}

function resolveBoolean(value: string) {
  return value === 'true';
}

function resolveParam<
  T extends Types,
  R extends boolean | undefined,
  D extends InferType<T> | undefined,
>(key: string, options: EnvOptions<T, R, D>, rawValue: string | undefined) {
  if (!rawValue) {
    return options.default;
  }

  if (options.type === 'number') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveNumber(rawValue);
  }

  if (options.type === 'boolean') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveBoolean(rawValue);
  }

  if (options.type === 'string') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveString(rawValue);
  }

  throw new Error(
    `Cannot resolve env param '${key}'. Unknown type ${options.type}. Type must be Number, Boolean or String!`,
  );
}

function validateValue<
  T extends Types,
  R extends boolean | undefined,
  D extends InferType<T> | undefined,
>(key: string, value: string | number | boolean | undefined, options: EnvOptions<T, R, D>) {
  if (value == null && options.required !== true) {
    return;
  }

  if (value == null && options.required === true) {
    throw new Error(`Env param '${key}' is required and doesn't have a default value!`);
  }

  // biome-ignore lint/suspicious/useValidTypeof: <explanation>
  if (typeof value !== options.type?.toLowerCase()) {
    if (options.resolver) {
      throw new Error(
        `Return type of custom resolver not matching type of property for key '${key}'. Expected '${options.type?.toLowerCase()}' but got '${typeof value}'`,
      );
    }

    throw new Error(
      `Type mismatch for property with key '${key}'. Expected '${options.type?.toLowerCase()}' but got '${typeof value}'.`,
    );
  }
}

export function createEnvParser(getValue: (key: string) => string | undefined) {
  return function parse<
    T extends Types,
    R extends boolean | undefined,
    D extends InferType<T> | undefined,
  >(key: string, options: EnvOptions<T, R, D>) {
    const value = resolveParam(key, options, getValue(key));
    validateValue(key, value, options);
    return value as InferTypeFromOptions<EnvOptions<T, R, D>>;
  };
}
