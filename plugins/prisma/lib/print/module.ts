import { camelCase } from 'change-case-all';
import { parse } from 'path';
import { ModuleResolvers } from '../resolver-builder';
import { printRelationResolver, printResolver } from './module-resolver';

export function printModule(model: ModuleResolvers) {
  const name = model.name;
  const moduleName = `${camelCase(name)}Module`;

  const hasQueries = model.queries.length > 0;
  const hasMutations = model.mutations.length > 0;
  const hasRelations = model.relations.length > 0;

  const queries = model.queries.map((operations) => printResolver('Query', operations));

  const mutations = model.mutations.map((operations) => printResolver('Mutation', operations));

  const relations = model.relations.map((relation) => printRelationResolver(model.name, relation));

  return [
    printImports(name),
    printInit(moduleName, name),
    printDestructure(moduleName, model.name, hasQueries, hasMutations, hasRelations),
    queries.join('\n\n'),
    mutations.join('\n\n'),
    relations.join('\n\n'),
  ].join('\n\n');
}

export function printModuleExport(filename: string) {
  const exportFile = parse(filename).name;
  return `export * from "./${exportFile}";`;
}

function printImports(name: string) {
  return [`import { create${name}Module } from "../typedef";`].join('\n');
}

function printInit(moduleName: string, name: string) {
  return [`export const ${moduleName} = create${name}Module();`].join('\n');
}

function printDestructure(
  moduleName: string,
  modelName: string,
  hasQueries: boolean,
  hasMutations: boolean,
  hasRelations: boolean
) {
  const values = [];
  if (hasQueries) {
    values.push('Query');
  }
  if (hasMutations) {
    values.push('Mutation');
  }
  if (hasRelations) {
    values.push(modelName);
  }
  return `const { ${values.join(', ')} } = ${moduleName};`;
}
