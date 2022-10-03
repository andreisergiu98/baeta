import { concat, mergeDeepWith } from 'ramda';
import { Store } from '../context';
import { GenerateOptions } from '../generator';
import { findModelByOperationSchema, ModelOperations } from '../model-operations';
import { ModelRelation } from '../model-relations';
import { createVisitorBuilder } from '../visitor';
import { createModuleFiles } from './resolver-builder-files';

export interface ModuleResolvers {
  name: string;
  queries: ModelOperations[];
  mutations: ModelOperations[];
  relations: ModelRelation[];
}

export type ModuleResolversMap = Record<string, ModuleResolvers | undefined>;

export function createResolversBuilder(store: Store, options: GenerateOptions) {
  const { operationsMap, relationsMap } = store;

  const modelDefinitions: ModuleResolversMap = {};

  function pushDefinition(model: string, data: Partial<ModuleResolvers>) {
    const current: ModuleResolvers = modelDefinitions[model] ?? {
      name: model,
      queries: [],
      mutations: [],
      relations: [],
    };
    modelDefinitions[model] = mergeDeepWith(concat, current, data);
  }

  const visitor = createVisitorBuilder();

  visitor.onModel((model) => {
    const relations = relationsMap[model.name];
    if (!relations) {
      return;
    }

    pushDefinition(model.name, {
      relations,
    });
  });

  visitor.onOutputType((outputType) => {
    for (const field of outputType.fields) {
      const type = outputType.name;
      const model = findModelByOperationSchema(operationsMap, field);
      const operations = operationsMap[field.name];

      if (!model || !operations) {
        continue;
      }

      if (type === 'Query') {
        pushDefinition(model, { queries: [operations] });
      }

      if (type === 'Mutation') {
        pushDefinition(model, { mutations: [operations] });
      }
    }
  });

  function compose() {
    return createModuleFiles(modelDefinitions, {
      root: options.modulesDir,
      casing: options.casing,
      filename: 'resolvers.ts',
      namespace: options.resolverNamespace,
      createExport: options.resolverExport,
    });
  }

  return {
    compose,
    visitor,
  };
}
