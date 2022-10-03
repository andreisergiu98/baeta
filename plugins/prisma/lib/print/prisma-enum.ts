import { DMMF } from '../dmmf';
import { printObject } from './object';

export function printPrismaEnum(enumType: DMMF.SchemaEnum) {
  return printObject('enum', enumType.name, enumType.values);
}
