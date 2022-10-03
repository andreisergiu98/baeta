import { File } from '@baeta/plugin';
import { join } from 'path';
import { Casing, changeCase } from '../../utils/casing';
import { printModule, printModuleExport } from '../print/module';
import { printPrismaModule } from '../print/module-prisma';
import { ModuleResolvers, ModuleResolversMap } from './resolver-builder';

const tag = 'prisma-resolver';

export interface ModuleFileOptions {
  root: string;
  casing: Casing;
  namespace: string;
  filename: string;
  createExport?: boolean;
}

export function createModuleFiles(map: ModuleResolversMap, options: ModuleFileOptions) {
  const files: File[] = [];

  for (const model of Object.values(map)) {
    if (!model) {
      continue;
    }

    const modulePath = createModulePath(
      model,
      options.root,
      options.namespace,
      options.casing
    );

    files.push(createModuleResolvers(model, modulePath, options.filename));

    if (options.createExport !== false) {
      files.push(createModuleResolversExport(modulePath, options.filename));
    }
  }

  files.push(createPrismaModule(options.root));

  return files;
}

function createModulePath(
  model: ModuleResolvers,
  rootDir: string,
  namespace: string,
  moduleCasing: Casing
) {
  const moduleDir = changeCase(model.name, moduleCasing);
  return join(rootDir, moduleDir, namespace);
}

function createModuleResolvers(model: ModuleResolvers, dir: string, filename: string) {
  const filepath = join(dir, filename);
  const content = printModule(model);
  return new File(filepath, content, tag);
}

function createModuleResolversExport(dir: string, filename: string) {
  const filepath = join(dir, 'index.ts');
  const content = printModuleExport(filename);
  return new File(filepath, content, tag);
}

function createPrismaModule(dir: string) {
  return new File(join(dir, 'prisma/resolvers.ts'), printPrismaModule(), tag);
}
