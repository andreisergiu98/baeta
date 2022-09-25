import { DMMF } from "../dmmf";
import { printObject } from "./object";
import { printType } from "./type";

export function printPrismaModel(model: DMMF.Model) {
  const fields = model.fields.map((field) => printModelField(field));
  return printObject("type", model.name, fields);
}

function printModelField(field: DMMF.Field) {
  return `${field.name}: ${printFieldScalar(field)}`;
}

function printFieldScalar(field: DMMF.Field) {
  let name = field.type;
  if (field.isId) {
    name = "ID";
  }
  return printType(name, {
    kind: field.kind,
    list: field.isList,
    required: field.isRequired && field.kind !== "object",
  });
}
