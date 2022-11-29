import { DMMF } from './dmmf';

export function findModelByEnum(models: string[], enumType: DMMF.SchemaEnum) {
  for (const model of models) {
    if (!enumType.name.startsWith(model)) {
      continue;
    }

    if (`${model}ScalarFieldEnum` === enumType.name) {
      return model;
    }

    if (`${model}OrderByRelevanceFieldEnum` === enumType.name) {
      return model;
    }
  }
}
