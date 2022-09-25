import { Config } from "../lib";

let cachedConfig: Config | null = null;

function registerCompiler() {
  try {
    require("@baeta/compiler/register.cjs");
    return true;
  } catch (e) {
    return false;
  }
}

function importConfig(file: string, skipCache: boolean): Config | undefined {
  const module = require.resolve(file);
  if (skipCache) {
    delete require.cache[module];
  }
  return require(module)?.default?.config;
}

export function loadConfig(skipCache = false) {
  if (cachedConfig && !skipCache) {
    return cachedConfig;
  }

  const registered = registerCompiler();
  const file = process.cwd() + "/baeta.ts";
  const config = importConfig(file, skipCache);

  if (!config) {
    return;
  }

  cachedConfig = config;
  return config;
}
