import fg from 'fast-glob';
import { relative } from 'path';
import { BaetaOptions } from './config';

export interface LoadedBaetaConfig {
  config: BaetaOptions;
  location: string;
  relativeLocation: string;
}

const configNames = ['baeta', '.baeta'];
const configExtensions = ['js', 'mjs', 'cjs'];

export async function discoverBaetaConfig() {
  const entries = configNames.flatMap((name) => {
    return configExtensions.map((ext) => `${process.cwd()}/${name}.${ext}`);
  });

  return fg(entries)
    .then((res) => res[0])
    .catch(() => null);
}

function getRelativeConfigPath(path: string) {
  return relative(process.cwd(), path);
}

function bustRequire(path: string) {
  try {
    const mod = require.resolve(path);
    require.cache[mod] = undefined;
  } catch (e) {
    //
  }
}

let cacheIndex = 1;
async function importConfig(path: string): Promise<BaetaOptions | undefined> {
  bustRequire(path);
  const module = await import(`${path}?v${cacheIndex++}`);
  return module?.default?.default?.config || module?.default?.config || module?.config;
}

export async function loadConfig(path?: string): Promise<LoadedBaetaConfig | undefined> {
  const configPath = path ?? (await discoverBaetaConfig());

  if (configPath == null) {
    return;
  }

  const config = await importConfig(configPath);

  if (!config) {
    return;
  }

  return { config, location: configPath, relativeLocation: getRelativeConfigPath(configPath) };
}
