// import { Config } from '../lib';
export const test = 12;
// function registerCompiler() {
//   try {
//     const require = createRequire(import.meta.url);
//     require('@baeta/compiler/register.cjs');
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

// function requireConfig(file: string, skipCache: boolean): Config | undefined {
//   const req = createRequire(import.meta.url);
//   const module = req.resolve(file);
//   if (skipCache) {
//     req.cache[module] = undefined;
//   }
//   return req(module)?.default?.config;
// }

// export function loadConfig(skipCache = false) {
//   registerCompiler();
//   const file = `${process.cwd()}/baeta.ts`;
//   const config = requireConfig(file, skipCache);

//   if (!config) {
//     return;
//   }

//   return config;
// }
