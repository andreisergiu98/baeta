import type { BuildOptions } from 'esbuild';

export interface CompilerOptions {
  src: string | string[];
  dist: string;
  watch?: boolean;
  bundleDeps?: boolean;
  bundleWorkspaces?: boolean;
  commands?: CompilerCommandsOptions;
  esbuild?: Partial<Omit<BuildOptions, 'outdir' | 'watch' | 'entryPoints'>>;
}

export interface CompilerCommandsOptions {
  onSuccess?: CompilerCommandOptions;
  onError?: CompilerCommandOptions;
  onBuildStart?: (startTime: number) => void;
  onBuildEnd?: (buildTime: number) => void;
  onBuildWarnings?: (warnings: string[]) => void;
  onBuildErrors?: (errors: string[]) => void;
}

export interface CompilerCommandOptions {
  command: string;
  stdout?: (data: string) => void;
  onError?: (err: unknown) => void;
}
