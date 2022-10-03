import { DMMF } from './dmmf';
import { createEntriesModelMap, EntryToModelMap } from './model-entries';

export function createOutputsModelMaps(dmmf: DMMF.Document, models: string[]) {
  const inputs = createOutputsList(dmmf);
  return createEntriesModelMap(models, inputs);
}

export function findModelByOutput(entries: EntryToModelMap, output: DMMF.OutputType) {
  return entries[output.name]?.model;
}

function createOutputsList(dmmf: DMMF.Document) {
  return dmmf.schema.outputObjectTypes.prisma.map((el) => el.name);
}
