export async function dynamicImport<T>(
  file: string,
  clearCache = false
): Promise<T> {
  if (process.env.BAETA_CJS_IMPORT === "1") {
    return cjsImport<T>(file, clearCache);
  }
  return import(file);
}

function cjsImport<T>(file: string, clearCache: boolean): T {
  const module = require.resolve(file);
  if (clearCache) {
    delete require.cache[module];
  }
  const test = require(module);
  console.log("test", test);
  return test.default.config;
}
