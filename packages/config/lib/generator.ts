import { BaetaOptions } from './config';

export type GeneratorCtxV1<T = Record<string, unknown>> = {
  fileManager: any;
  didSetup: string[];
  didGenerate: string[];
  didEnd: string[];
  pluginNames: string[];
  config: BaetaOptions;
} & T;
