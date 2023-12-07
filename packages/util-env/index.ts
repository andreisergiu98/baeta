type NodeGlobal = {
  process: {
    env: {
      [key: string]: string | undefined;
    };
  };
};

type DenoGlobal = {
  Deno: {
    env: {
      get(key: string): string | undefined;
    };
  };
};

type EnvGlobal = {
  env: {
    [key: string]: string | undefined;
  };
};

type ImportMetaWithEnv = ImportMeta & {
  env?: {
    [key: string]: string | undefined;
  };
};

function supportsNodeEnv(global: Record<string, unknown>): global is NodeGlobal {
  return global.process != null;
}

function supportsDenoEnv(global: Record<string, unknown>): global is DenoGlobal {
  return global.Deno != null;
}

function supportsGlobalEnv(global: Record<string, unknown>): global is EnvGlobal {
  return global.env != null;
}

function getEnvFromNode(global: NodeGlobal, key: string) {
  return global.process.env[key];
}

function getEnvFromDeno(global: DenoGlobal, key: string) {
  return global.Deno.env.get(key);
}

function getEnvFromGlobal(global: EnvGlobal, key: string) {
  return global.env[key];
}

function tryESMEnv(key: string) {
  try {
    const meta = import.meta as ImportMetaWithEnv | null | undefined;
    return meta?.env?.[key];
  } catch (err) {
    return undefined;
  }
}

export function getEnv(key: string): string | undefined {
  const global = globalThis;

  if (supportsNodeEnv(global)) {
    return getEnvFromNode(global, key);
  }

  if (supportsDenoEnv(global)) {
    return getEnvFromDeno(global, key);
  }

  if (supportsGlobalEnv(global)) {
    return getEnvFromGlobal(global, key);
  }

  return tryESMEnv(key);
}

export function isDevelopmentMode() {
  const modeKeys = ['BAETA_ENV', 'NODE_ENV', 'ENVIRONMENT'];

  const anyIsProduction = modeKeys.some((key) => getEnv(key) === 'production');

  if (anyIsProduction) {
    return false;
  }

  const anyIsDevelopment = modeKeys.some((key) => getEnv(key) === 'development');

  if (anyIsDevelopment) {
    return true;
  }

  return false;
}
