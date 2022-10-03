import { plural, singular } from 'pluralize';
import { DMMF } from './dmmf';

export type ModelOperations = {
  model: string;
  prisma: string;
  operation: string;
};

export type ModelsOperationsMap = Record<string, ModelOperations | undefined>;

export function createModelsOperationsMaps(dmmf: DMMF.Document) {
  return dmmf.mappings.modelOperations
    .map((operations) => createModelOperationsMap(operations))
    .reduce((a, b) => ({ ...a, ...b }));
}

export function findModelByOperationSchema(
  map: ModelsOperationsMap,
  schema: DMMF.SchemaField
) {
  return map[schema.name]?.model;
}

function createModelOperationsMap(mapping: DMMF.ModelMapping) {
  const model = mapping.model;
  const operationMap: ModelsOperationsMap = {};

  function addToMap(key: string, operation?: string) {
    const originalName = mapping[key as keyof DMMF.ModelMapping];

    if (!originalName) {
      return;
    }

    operationMap[originalName] = {
      model,
      prisma: key,
      operation: operation ?? originalName,
    };
  }

  const keys = Object.keys(mapping);
  const modelName = model[0].toLocaleLowerCase() + model.slice(1);

  for (const key of keys) {
    if (key === 'model') {
      continue;
    }

    if (key === 'findUnique') {
      addToMap(key, singular(modelName));
      continue;
    }

    if (key === 'findMany') {
      addToMap(key, plural(modelName));
      continue;
    }

    addToMap(key);
  }

  return operationMap;
}
