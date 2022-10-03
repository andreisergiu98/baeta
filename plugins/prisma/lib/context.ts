import { parseDMMF } from './dmmf';
import { createInputsModelMap } from './model-inputs';
import { createModelsList } from './model-list';
import { createModelsOperationsMaps } from './model-operations';
import { createOutputsModelMaps } from './model-outputs';
import { createModelRelationsList } from './model-relations';

export type Store = ReturnType<typeof createContext> extends Promise<infer T> ? T : never;

export async function createContext() {
  const dmmf = await parseDMMF({
    datamodelPath: 'schema.prisma',
  });

  const models = createModelsList(dmmf);
  const inputsMap = createInputsModelMap(dmmf, models);
  const outputsMap = createOutputsModelMaps(dmmf, models);
  const relationsMap = createModelRelationsList(dmmf);
  const operationsMap = createModelsOperationsMaps(dmmf);

  return {
    dmmf,
    models,
    inputsMap,
    outputsMap,
    relationsMap,
    operationsMap,
  };
}
