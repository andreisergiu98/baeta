import { BuildOptions, Plugin } from "esbuild";
import { addCliPlugin, CommandsOptions } from "./esbuild-cli";
import { getExternals } from "./esbuild-externals";

export interface CompilerOptions {
  src: string | string[];
  dist: string;
  watch?: boolean;
  bundleDeps?: boolean;
  bundleWorkspaces?: boolean;
  commands?: CommandsOptions;
  esbuild?: Partial<Omit<BuildOptions, "outdir" | "watch" | "entryPoints">>;
}

export interface Hooks {
  onStop: Array<() => void | Promise<void>>;
}

export function createEsbuildConfig(options: CompilerOptions) {
  const plugins: Plugin[] = [];
  const hooks: Hooks = {
    onStop: [],
  };

  addCliPlugin(plugins, hooks, options.commands);
  plugins.push(...(options.esbuild?.plugins ?? []));

  const external = getExternals(
    options.bundleDeps,
    options.watch || options.bundleWorkspaces
  );

  const watch = options.watch;
  const outdir = options.dist;
  const entryPoints = Array.isArray(options.src) ? options.src : [options.src];

  const buildOptions: BuildOptions = {
    target: "node16",
    bundle: true,
    sourcemap: true,
    platform: "node",
    logLevel: "silent",
    watch,
    entryPoints,
    outdir,
    external,
    ...options.esbuild,
    plugins,
  };

  return {
    hooks,
    buildOptions,
  };
}
