import { build as esbuildBuild } from 'esbuild';
import { CompilerOptions, createEsbuildConfig } from './esbuild-config';

export async function build(options: CompilerOptions) {
  const { buildOptions, hooks } = createEsbuildConfig(options);

  if (buildOptions.watch !== true) {
    return esbuildBuild(buildOptions);
  }

  const result = await esbuildBuild(buildOptions);
  const { stop } = result;

  result.stop = () => {
    hooks.onStop.forEach((hook) => hook());
    return stop?.();
  };

  return result;
}
