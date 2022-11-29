import { DMMF } from '../dmmf';
import { printInputConstraintDirective } from './directive';
import { printObject } from './object';
import { printType } from './type';

export function printPrismaInput(inputType: DMMF.InputType) {
  const { minNumFields, maxNumFields } = inputType.constraints;
  const requireConstraint = minNumFields === 1 && inputType.fields.length === 1;

  let directive: string | undefined;
  if (!requireConstraint) {
    directive = printInputConstraintDirective(minNumFields, maxNumFields);
  }

  const fields = inputType.fields.map((field) => printInputField(field, requireConstraint));

  return printObject('input', inputType.name, fields, directive);
}

function printInputField(field: DMMF.SchemaArg, requireConstraint: boolean) {
  const type = printInputFieldScalar(field, requireConstraint);
  if (!type) {
    return;
  }
  return `${field.name}: ${type}`;
}

function printInputFieldScalar(field: DMMF.SchemaArg, requireConstraint: boolean) {
  const inputTypes = field.inputTypes.filter((inputType) => inputType.type !== 'Null');

  if (inputTypes.length === 0) {
    return;
  }

  const inputType = inputTypes[inputTypes.length - 1];
  const inputTypeName = inputType.type.toString();

  return printType(inputTypeName, {
    kind: inputType.location,
    list: inputType.isList,
    required: (field.isRequired || requireConstraint) && !field.isNullable,
  });
}
