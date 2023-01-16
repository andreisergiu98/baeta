import { BaetaOptions, createConfig } from '@baeta/config';
import glob from 'glob';
import { createRequire } from 'node:module';

export { createConfig };
export type { BaetaOptions };

const matcher = `${process.cwd()}/baeta.?(ts|mts|cts|js|mjs|cjs)`;

export function discoverBaetaConfig() {
  return new Promise<string | undefined>((resolve) => {
    glob(matcher, {}, (err, files) => {
      if (err) {
        return resolve(undefined);
      }
      return resolve(files[0]);
    });
  });
}

function getLoader() {
  if (import.meta.url == null) {
    return require;
  }
  return createRequire(import.meta.url);
}

let compilerImported = false;

function importCompiler() {
  if (compilerImported) {
    return true;
  }

  try {
    const req = getLoader();
    req('@baeta/compiler/register.cjs');
    compilerImported = true;
    return true;
  } catch (e) {
    return false;
  }
}

function importTypeScriptConfig(path: string) {
  const registered = importCompiler();

  if (!registered) {
    return;
  }

  const req = getLoader();

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

export async function loadConfig(path?: string) {
  const configPath = path ?? (await discoverBaetaConfig());

  if (configPath == null) {
    return;
  }

  const config = await importConfig(configPath);

  if (!config) {
    return;
  }

  return { config, location: configPath };
}
