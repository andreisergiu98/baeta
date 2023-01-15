import { BaetaOptions, createConfig } from '@baeta/config';

export { createConfig };
export type { BaetaOptions };

function registerCompiler() {
  try {
    require('@baeta/compiler/register.cjs');
    return true;
  } catch (e) {
    return false;
  }
}

function requireConfig(file: string, skipCache: boolean): BaetaOptions | undefined {
  const module = require.resolve(file);
  if (skipCache) {
    require.cache[module] = undefined;
  }
  return require(module)?.default?.config;
}

export function loadConfig(skipCache = false) {
  registerCompiler();
  const file = `${process.cwd()}/baeta.ts`;
  const config = requireConfig(file, skipCache);

  if (!config) {
    return;
  }

  return config;
}
