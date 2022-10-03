import { DMMF } from './dmmf';
import { createEntriesModelMap, EntryToModelMap } from './model-entries';

export function createInputsModelMap(dmmf: DMMF.Document, models: string[]) {
  const inputs = createInputsList(dmmf);
  return createEntriesModelMap(models, inputs);
}

export function findModelByInput(entries: EntryToModelMap, input: DMMF.InputType) {
  return entries[input.name]?.model;
}

function createInputsList(dmmf: DMMF.Document) {
  return dmmf.schema.inputObjectTypes.prisma.map((el) => el.name);
}

export function createInputsIgnoreList(dmmf: DMMF.Document) {
  const ignoreList: string[] = [];

  const inputs = createInputsList(dmmf);
  const uncheckedInputs = inputs.filter((input) => input.includes('Unchecked'));

  uncheckedInputs.forEach((uncheckedInput) => {
    const normalized = uncheckedInput.replace('Unchecked', '');
    const exists = inputs.some((input) => input === normalized);
    if (exists) {
      ignoreList.push(uncheckedInput);
    }
  });

  return ignoreList;
}
