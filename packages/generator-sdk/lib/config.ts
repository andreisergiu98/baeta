import { FileOptions } from './file';

export interface GeneratorOptions {
  cwd?: string;
  schemas: string[];
  modulesDir?: string;
  moduleDefinitionName?: string;
  baseTypesPath?: string;
  contextType?: string;
  extensions?: string;
  scalars?: Record<string, string>;
  fileOptions?: FileOptions;
}

export interface NormalizedGeneratorOptions {
  cwd: string;
  schemas: string[];
  modulesDir: string;
  moduleDefinitionName: string;
  baseTypesPath: string;
  contextType?: string;
  extensions?: string;
  scalars?: Record<string, string>;
  fileOptions?: FileOptions;
}
