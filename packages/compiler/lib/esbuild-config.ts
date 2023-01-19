import { BuildOptions } from 'esbuild';
import { getExternals } from './esbuild-externals';

export interface CompilerOptions {
  src: string | string[];
  dist: string;
  bundleDeps?: boolean;
  bundleWorkspaces?: boolean;
  esbuild?: Partial<Omit<BuildOptions, 'outdir' | 'entryPoints'>>;
}

export interface Hooks {
  onStop: Array<() => void | Promise<void>>;
}

export function createEsbuildConfig(options: CompilerOptions, watchMode?: boolean) {
  const external = getExternals(options.bundleDeps, watchMode || options.bundleWorkspaces);
  const outdir = options.dist;
  const entryPoints = Array.isArray(options.src) ? options.src : [options.src];

  const buildOptions: BuildOptions = {
    bundle: true,
    sourcemap: true,
    platform: 'node',
    logLevel: 'silent',
    entryPoints,
    outdir,
    external,
    ...options.esbuild,
  };

  return buildOptions;
}
