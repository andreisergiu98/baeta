import { BaetaOptions, createConfig } from '@baeta/config';
import { createRequire } from 'node:module';

export { createConfig };
export type { BaetaOptions };

function registerCompiler() {
  try {
    const require = createRequire(import.meta.url);
    require('@baeta/compiler/register.cjs');
    return true;
  } catch (e) {
    return false;
  }
}

function requireConfig(file: string, skipCache: boolean): BaetaOptions | undefined {
  const req = createRequire(import.meta.url);
  const module = req.resolve(file);
  if (skipCache) {
    req.cache[module] = undefined;
  }
  return req(module)?.default?.config;
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
