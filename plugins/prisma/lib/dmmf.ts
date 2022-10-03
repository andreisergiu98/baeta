import { DMMF } from '@prisma/generator-helper';
import { getDMMF, GetDMMFOptions } from '@prisma/internals';

export { DMMF };

export function parseDMMF(options: GetDMMFOptions): Promise<DMMF.Document> {
  return getDMMF(options);
}
