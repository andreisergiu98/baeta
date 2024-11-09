import type { BuildOptions, Format } from 'esbuild';
import { getExternals } from './esbuild-externals.ts';

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
	 * Adds CommonJS global variables within esm bundle like:
	 * - `__dirname` - Corresponds to the directory of the generated bundle file
	 * - `__filename` - Corresponds to the file path of the generated bundle file
	 * - `require` - Corresponds to the Node.js synchronous function to import modules
	 * @default false
	 */
	cjsGlobals?: boolean;

	/**
	 * Options to pass to esbuild
	 */
	esbuild?: Partial<Omit<BuildOptions, 'outdir' | 'entryPoints'>>;
}

export interface Hooks {
	onStop: Array<() => void | Promise<void>>;
}

function createEsmShimBanner(
	cjsGlobals?: boolean,
	currentBanner?: BuildOptions['banner'],
	format?: Format,
) {
	if (format === 'cjs' || format === 'iife' || cjsGlobals !== true) {
		return currentBanner;
	}

	let js = `
import { createRequire as __baeta_node_createRequire } from 'module';
import { dirname as __baeta_node_dirname } from 'node:path';
import { fileURLToPath as __baeta_node_fileURLToPath } from 'node:url';
const require = __baeta_node_createRequire(import.meta.url);
const __filename = __baeta_node_fileURLToPath(import.meta.url);
const __dirname = __baeta_node_dirname(__filename);
`;

	if (currentBanner?.js) {
		js += `\n${currentBanner.js}`;
	}

	return { ...currentBanner, js };
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
		banner: createEsmShimBanner(
			options.cjsGlobals,
			options.esbuild?.banner,
			options.esbuild?.format,
		),
	};

	return buildOptions;
}
