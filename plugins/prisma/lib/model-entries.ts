interface ModelEntry {
  model: string;
  modelScore: number;
  operationName: string;
}
type ModelEntryMap = Record<string, ModelEntry | undefined>;

type EntryValue = {
  model: string;
};

export type EntryToModelMap = Record<string, EntryValue | undefined>;

export function createEntriesModelMap(models: string[], entries: string[]) {
  const map: ModelEntryMap = {};

  for (const model of models) {
    updateEntriesForModel(map, model, entries);
  }

  return normalizeResult(map);
}

function updateEntriesForModel(map: ModelEntryMap, model: string, entries: string[]) {
  for (const input of entries) {
    if (!input.startsWith(model) && input !== `Aggregate${model}`) {
      continue;
    }

    const currentScore = model.length;

    const modelInput = map[input];

    if (modelInput && modelInput.modelScore > currentScore) {
      continue;
    }

    map[input] = {
      model,
      operationName: input,
      modelScore: currentScore,
    };
  }
}

function normalizeResult(value: ModelEntryMap) {
  const result: EntryToModelMap = {};

  for (const input of Object.values(value)) {
    if (!input) {
      continue;
    }
    result[input.operationName] = { model: input.model };
  }

  return result;
}
