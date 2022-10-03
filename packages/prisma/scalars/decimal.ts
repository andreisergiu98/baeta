import { GraphQLScalarType } from "graphql";
import Decimal from "decimal.js";

export const DecimalJSScalar = new GraphQLScalarType({
  name: "Decimal",
  description:
    "GraphQL Scalar representing the Decimal type, based on Decimal.js library.",
  serialize: (value: unknown) => {
    if (!Decimal.isDecimal(value)) {
      throw new Error(
        `[DecimalError] Invalid argument: ${Object.prototype.toString.call(
          value
        )}. Expected Decimal.`
      );
    }
    return (value as Decimal).toString();
  },
  parseValue: (value: unknown) => {
    if (!(typeof value === "string")) {
      throw new Error(
        `[DecimalError] Invalid argument: ${typeof value}. Expected string.`
      );
    }
    return new Decimal(value);
  },
});
