import { File } from '@baeta/plugin';
import { join } from 'path';
import { Casing, changeCase } from '../../utils/casing';
import { filterEmpty } from '../../utils/string';
import { printObject } from '../print/object';
import {
  GlobalSchemaDefinition,
  ModuleDefinitionMap,
  ModuleSchemaDefinition,
} from './schema-builder';

const tag = 'prisma-sdl';

export interface SchemaFileOptions {
  root: string;
  casing: Casing;
  namespace: string;
}

export function createGlobalSchemas(
  definition: GlobalSchemaDefinition,
  options: SchemaFileOptions
) {
  const dir = `${options.root}/prisma`;

  const files = [
    createSchemaFile(
      dir,
      createName('prisma', 'enums', options.casing),
      definition.enums
    ),
    createSchemaFile(
      dir,
      createName('prisma', 'inputs', options.casing),
      definition.inputTypes
    ),
    createSchemaFile(
      dir,
      createName('prisma', 'outputs', options.casing),
      definition.outputTypes
    ),
    createSchemaFile(
      dir,
      createName('prisma', 'scalars', options.casing),
      definition.scalars
    ),
    createSchemaFile(
      dir,
      createName('prisma', 'directives', options.casing),
      definition.directives
    ),
  ];

  return filterEmpty(files);
}

export function createModuleSchemas(
  definitionMap: ModuleDefinitionMap,
  options: SchemaFileOptions
) {
  const definitions = Object.values(definitionMap);
  return definitions.map((definition) => createModuleSchema(definition, options)).flat();
}

function createModuleSchema(
  definition: ModuleSchemaDefinition | undefined,
  options: SchemaFileOptions
) {
  if (!definition) {
    return [];
  }

  const name = definition.name;
  const dir = createSchemaPath(
    definition,
    options.root,
    options.namespace,
    options.casing
  );

  const files = [
    createSchemaFile(dir, createName(name, 'model', options.casing), definition.model),
    createSchemaFile(dir, createName(name, 'enums', options.casing), definition.enums),
    createSchemaFile(
      dir,
      createName(name, 'input', options.casing),
      definition.inputTypes
    ),
    createSchemaFile(
      dir,
      createName(name, 'output', options.casing),
      definition.outputTypes
    ),
    createSDLOperationFile(
      'Query',
      dir,
      createName(name, 'query', options.casing),
      definition.queries
    ),
    createSDLOperationFile(
      'Mutation',
      dir,
      createName(name, 'mutation', options.casing),
      definition.mutations
    ),
  ];

  return filterEmpty(files);
}

function createSDLOperationFile(
  type: string,
  dir: string,
  name: string,
  content: string[]
) {
  if (content.length === 0) {
    return;
  }
  const fileContent = printObject('type', type, content);
  return createSchemaFile(dir, name, fileContent);
}

function createSchemaFile(dir: string, name: string, content: string | string[]) {
  if (content.length === 0) {
    return;
  }
  const filepath = join(dir, name);
  const fileContent = Array.isArray(content) ? content.join('\n\n') : content;
  return new File(filepath, fileContent, tag);
}

export function createSchemaPath(
  definition: ModuleSchemaDefinition,
  rootDir: string,
  namespace: string,
  moduleCasing: Casing
) {
  const moduleDir = changeCase(definition.name, moduleCasing);
  return join(rootDir, moduleDir, namespace);
}

function createName(name: string, suffix?: string, casing: Casing = 'kebab-case') {
  const names = [changeCase(name, casing)];
  if (suffix) {
    names.push(changeCase(suffix, casing));
  }
  names.push('gql');
  return names.join('.');
}
