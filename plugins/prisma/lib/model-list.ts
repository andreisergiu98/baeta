import { DMMF } from "./dmmf";

export function createModelsList(dmmf: DMMF.Document) {
  return dmmf.mappings.modelOperations.map(
    (modelOperations) => modelOperations.model
  );
}
