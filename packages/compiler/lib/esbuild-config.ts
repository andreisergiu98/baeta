import { BuildOptions } from 'esbuild';
import { getExternals } from './esbuild-externals';

export interface CompilerOptions {
  src: string | string[];
  dist: string;
  watch?: boolean;
  bundleDeps?: boolean;
  bundleWorkspaces?: boolean;
  esbuild?: Partial<Omit<BuildOptions, 'outdir' | 'watch' | 'entryPoints'>>;
}

export interface Hooks {
  onStop: Array<() => void | Promise<void>>;
}

export function createEsbuildConfig(options: CompilerOptions) {
  const hooks: Hooks = {
    onStop: [],
  };

  const external = getExternals(options.bundleDeps, options.watch || options.bundleWorkspaces);

  const watch = options.watch;
  const outdir = options.dist;
  const entryPoints = Array.isArray(options.src) ? options.src : [options.src];

  const buildOptions: BuildOptions = {
    target: 'node18',
    bundle: true,
    sourcemap: true,
    platform: 'node',
    logLevel: 'silent',
    watch,
    entryPoints,
    outdir,
    external,
    ...options.esbuild,
  };

  return {
    hooks,
    buildOptions,
  };
}
