import { DMMF } from '../dmmf';
import { printObject } from './object';

export function printPrismaEnumModel(enumModel: DMMF.DatamodelEnum) {
  const fields = Object.values(enumModel.values).map((value) => value.name);
  return printObject('enum', enumModel.name, fields);
}
