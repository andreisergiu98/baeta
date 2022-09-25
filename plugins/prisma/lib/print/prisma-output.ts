import { DMMF } from "../dmmf";
import { mapPrismaTypeToScalar } from "./prisma-scalar";
import { printObject } from "./object";
import { ModelsOperationsMap } from "../model-operations";
import { printType } from "./type";
import { filterEmpty } from "../../utils/string";

export function printPrismaOutput(outputType: DMMF.OutputType) {
  const content = outputType.fields.map((field) => printOutputTypeField(field));
  return printObject("type", outputType.name, content);
}

export function printPrismaOperation(
  operations: ModelsOperationsMap,
  field: DMMF.SchemaField
) {
  const operation = operations[field.name];

  if (!operation) {
    return;
  }

  const args = printOutputFieldArgs(field.args);
  const output = printOutputFieldReturnType(field);
  return `${operation.operation}${args}: ${output}`;
}

function printOutputTypeField(field: DMMF.SchemaField) {
  const args = printOutputFieldArgs(field.args);
  const returnType = printOutputFieldReturnType(field);
  return `${field.name}${args}: ${returnType}`;
}

function printOutputFieldArgs(args: DMMF.SchemaArg[]) {
  const argList = filterEmpty(args.map((arg) => printOutputFieldArg(arg)));

  if (argList.length === 0) {
    return "";
  }

  return `(${argList.join(", ")})`;
}

function printOutputFieldArg(arg: DMMF.SchemaArg) {
  const type = printOutputFieldArgType(arg);

  if (!type) {
    return;
  }

  return `${arg.name}: ${type}`;
}

function printOutputFieldArgType(arg: DMMF.SchemaArg) {
  const inputType = arg.inputTypes[0];

  if (!inputType) {
    return;
  }

  let type = inputType.type.toString();

  if (inputType.location === "scalar") {
    type = mapPrismaTypeToScalar(type);
  }

  if (inputType.isList) {
    type = `[${type}!]`;
  }

  if (arg.isRequired) {
    type += "!";
  }

  return type;
}

function printOutputFieldReturnType(field: DMMF.SchemaField) {
  const outputType = field.outputType;

  return printType(outputType.type.toString(), {
    kind: outputType.location,
    list: outputType.isList,
    required: !field.isNullable,
  });
}
