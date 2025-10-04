import { posixPath, resolve } from '@baeta/util-path';
import type { FileOptions } from './file.ts';

/**
 * Interface for custom schema loaders.
 */
// biome-ignore lint/suspicious/noExplicitAny: We don't want to import graphql for this type
export interface Loader<TOptions = any> {
	// biome-ignore lint/suspicious/noExplicitAny: Same reason as above
	load(pointer: string, options?: TOptions): Promise<any[] | null | never>;
	// biome-ignore lint/suspicious/noExplicitAny: Same reason as above
	loadSync?(pointer: string, options?: TOptions): any[] | null | never;
}

/**
 * Options for the Baeta Generator.
 */
export interface GeneratorOptions {
	/**
	 * Current working directory for resolving relative paths.
	 * @defaultValue process.cwd()
	 */
	cwd?: string;

	/**
	 * Glob pattern(s) to locate GraphQL schema files.
	 * @defaultValue ```ts
	 * ['src/∗∗/∗.gql', 'src/∗∗/∗.graphql']
	 * ```
	 */
	schemas: string[];

	/**
	 * Root directory where GraphQL modules are defined.
	 * @defaultValue 'src/modules'
	 */
	modulesDir?: string;

	/**
	 * Filename for the generated module definition file.
	 * Contains type definitions and the GraphQL AST.
	 * @defaultValue 'typedef.ts'
	 */
	moduleDefinitionName?: string;

	/**
	 * Output path for the generated type files.
	 * @defaultValue ```ts
	 * `${modulesDir}/../__generated__/types.ts`
	 * ```
	 */
	typesDir?: string;

	/**
	 * Configuration options for generated files.
	 */
	fileOptions?: FileOptions;

	/**
	 * Custom schema loaders for processing schema files.
	 */
	loaders?: Loader[];

	/**
	 * File extension to use in generated import statements.
	 * Set to false to omit extensions.
	 * @defaultValue '.ts'
	 */
	importExtension?: '.js' | '.ts' | false;
}

export interface NormalizedGeneratorOptions {
	cwd: string;
	schemas: string[];
	modulesDir: string;
	moduleDefinitionName: string;
	typesDir: string;
	fileOptions?: FileOptions;
	loaders?: Loader[];
	importExtension: '.js' | '.ts' | '';
}

export function loadOptions(options: GeneratorOptions): NormalizedGeneratorOptions {
	const cwd = posixPath(options.cwd ?? process.cwd());
	const schemas = options.schemas ?? ['src/**/*.graphql'];
	const modulesDir = posixPath(resolve(cwd, options.modulesDir || 'src/modules'));
	const moduleDefinitionName = options.moduleDefinitionName || 'typedef.ts';
	const defaultTypesDir = resolve(modulesDir, '../__generated__/');
	const typesDir = resolve(cwd, options.typesDir || defaultTypesDir);

	return {
		cwd,
		schemas,
		modulesDir,
		moduleDefinitionName,
		typesDir,
		fileOptions: options.fileOptions,
		loaders: options.loaders,
		importExtension: options.importExtension === false ? '' : (options.importExtension ?? '.ts'),
	};
}
