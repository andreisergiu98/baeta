import { BuildOptions } from 'esbuild';
import { getExternals } from './esbuild-externals';

export interface CompilerOptions {
	/**
	 * The source file or files to compile
	 * @example src: 'src/index.ts'
	 */
	src: string | string[];

	/**
	 * The output directory
	 * @example dist: 'dist'
	 */
	dist: string;

	/**
	 * If true the bundle will also include all dependencies
	 * @default false
	 */
	bundleDeps?: boolean;

	/**
	 * If true the bundle will also include all workspace dependencies.
	 * @default true // in watch mode
	 * @default false // in build mode
	 */
	bundleWorkspaces?: boolean;

	/**
	 * Options to pass to esbuild
	 */
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
