import { BaetaOptions, createConfig } from '@baeta/config';
import fg from 'fast-glob';
import { relative } from 'path';
import { makeErrorMessage } from '../components/errors';
import { getModuleLoader } from '../utils/loader';

export { createConfig };
export type { BaetaOptions };

export interface LoadedBaetaConfig {
  config: BaetaOptions;
  location: string;
  relativeLocation: string;
}

const configNames = ['baeta', '.baeta'];
const configExtensions = ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs'];

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

let compilerRegistered = false;
function registerCompiler() {
  if (compilerRegistered) {
    return true;
  }

  try {
    const req = getModuleLoader();
    req('@baeta/compiler/register.cjs');
    compilerRegistered = true;
    return true;
  } catch (e) {
    return false;
  }
}

function importTypeScriptConfig(path: string) {
  const registered = registerCompiler();

  if (!registered) {
    console.log(
      makeErrorMessage(`@baeta/compiler is required to load ${getRelativeConfigPath(path)}`, true)
    );
    process.exit(1);
  }

  const req = getModuleLoader();

  const moduleKey = req.resolve(path);
  req.cache[moduleKey] = undefined;

  const module = req(path);
  return module?.default?.config as BaetaOptions | undefined;
}

let cacheIndex = 1;
async function importJavaScriptConfig(path: string) {
  const module = await import(`${path}?v${cacheIndex++}`);
  return module?.default?.config as BaetaOptions | undefined;
}

async function importConfig(path: string) {
  if (path.endsWith('ts')) {
    return importTypeScriptConfig(path);
  }
  return importJavaScriptConfig(path);
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
