import { GraphQLError } from "graphql";
import { ValidationError } from "./validation-error";

export const ERROR_MESSAGE = "One or more validation errors were encountered";
export const ERROR_CODE = "BAD_USER_INPUT";

function buildPath(path: Array<string | number>) {
  let pathString = "";

  for (const location of path) {
    if (typeof location === "number") {
      pathString += `[${location}]`;
    } else {
      pathString += `.${location}`;
    }
  }

  if (pathString[0] === ".") {
    pathString = pathString.slice(1);
  }

  return pathString;
}

export class AggregateValidationError extends GraphQLError {
  constructor(errors: ValidationError[]) {
    super(ERROR_MESSAGE, {
      extensions: {
        code: ERROR_CODE,
        validationErrors: errors.map((err) => ({
          message: err.message,
          path: buildPath(err.path),
          pathItems: err.path,
        })),
      },
    });
    Object.defineProperty(this, "name", { value: "AggregateValidationError" });
  }
}
