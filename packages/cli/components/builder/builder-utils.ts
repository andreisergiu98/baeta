import type { build, createEsbuildCliHooksPlugin } from '@baeta/compiler';
import { getModuleLoader } from '../../utils/loader';

export type Build = typeof build;
export type CreateEsbuildCliHooksPlugin = typeof createEsbuildCliHooksPlugin;

export async function importCompiler() {
  try {
    const req = getModuleLoader();
    const compiler = req('@baeta/compiler');
    return {
      build: compiler.build as Build,
      createCliPlugin: compiler.createEsbuildCliHooksPlugin as CreateEsbuildCliHooksPlugin,
    };
  } catch (e) {
    return null;
  }
}
