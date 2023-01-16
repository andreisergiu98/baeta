import { createRequire } from 'node:module';

export function getModuleLoader() {
  if (import.meta.url == null) {
    return require;
  }
  return createRequire(import.meta.url);
}
