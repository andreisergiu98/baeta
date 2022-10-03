import { DMMF } from './dmmf';

export interface ModelRelation {
  with: string;
  name: string;
}

export type ModelRelationsMap = Record<string, ModelRelation[] | undefined>;

export function createModelRelationsList(dmmf: DMMF.Document) {
  const map: ModelRelationsMap = {};

  for (const model of dmmf.datamodel.models) {
    map[model.name] = getRelationsFromModel(model);
  }

  return map;
}

function getRelationsFromModel(model: DMMF.Model) {
  const relations: ModelRelation[] = [];

  for (const field of model.fields) {
    if (field.kind !== 'object') {
      continue;
    }

    relations.push({
      with: field.type,
      name: field.name,
    });
  }

  return relations;
}
