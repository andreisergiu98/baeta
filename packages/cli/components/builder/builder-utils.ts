import type { build, createEsbuildCliHooksPlugin } from '@baeta/compiler';

export type Build = typeof build;

export type CreateCliPlugin = typeof createEsbuildCliHooksPlugin;

export async function importCompiler() {
  try {
    const { build, createEsbuildCliHooksPlugin } = await dynamicImportCompiler();
    return {
      build,
      createCliPlugin: createEsbuildCliHooksPlugin,
    };
  } catch (e) {
    return null;
  }
}

async function dynamicImportCompiler() {
  if (process.env.BAETA_CLI_DEV === '1') {
    return require('@baeta/compiler') as typeof import('@baeta/compiler');
  }
  return import('@baeta/compiler');
}
