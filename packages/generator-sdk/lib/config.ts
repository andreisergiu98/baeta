import { isAbsolute, join, posixPath, relative, resolve } from '@baeta/util-path';
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
	 * @default process.cwd()
	 */
	cwd?: string;

	/**
	 * Glob pattern(s) to locate GraphQL schema files.
	 * @default ```ts
	 * ['src/∗∗/∗.gql', 'src/∗∗/∗.graphql']
	 * ```
	 */
	schemas: string[];

	/**
	 * Root directory where GraphQL modules are defined.
	 * @default 'src/modules'
	 */
	modulesDir?: string;

	/**
	 * Filename for the generated module definition file.
	 * Contains type definitions and the GraphQL AST.
	 * @default 'typedef.ts'
	 */
	moduleDefinitionName?: string;

	/**
	 * Output path for the generated base types file.
	 * @default ```ts
	 * `${modulesDir}/../__generated__/types.ts`
	 * ```
	 */
	baseTypesPath?: string;

	/**
	 * Path to the context type definition.
	 * Supports both named and default exports.
	 * @example contextType: 'src/types/context.ts#Context' // for named export
	 * @example contextType: 'src/types/context.ts' // for default export
	 * @default undefined
	 */
	contextType?: string;

	/**
	 * Path to Baeta Extensions (ex. auth-extension).
	 * Only default export is supported.
	 * @example extensions: 'src/extensions.ts'
	 * @default undefined
	 */
	extensions?: string;

	/**
	 * Custom scalar type mappings.
	 * Maps GraphQL scalar types to TypeScript types.
	 * Supports global types and imports.
	 * @example { DateTime: 'Date', JSON: 'Record<string, unknown>' }	 * @default undefined
	 */
	scalars?: Record<string, string>;

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
	 * @default '.ts'
	 */
	importExtension?: '.js' | '.ts' | false;
}

export interface NormalizedGeneratorOptions {
	cwd: string;
	schemas: string[];
	modulesDir: string;
	moduleDefinitionName: string;
	baseTypesPath: string;
	contextType?: string;
	extensions?: string;
	scalars?: Record<string, string>;
	fileOptions?: FileOptions;
	loaders?: Loader[];
	importExtension?: '.js' | '.ts';
}

export function loadOptions(options: GeneratorOptions): NormalizedGeneratorOptions {
	const cwd = posixPath(options.cwd ?? process.cwd());
	const schemas = options.schemas ?? ['src/**/*.graphql'];
	const modulesDir = posixPath(resolve(cwd, options.modulesDir || 'src/modules'));
	const moduleDefinitionName = options.moduleDefinitionName || 'typedef.ts';

	const defaultBaseTypesRoot = resolve(modulesDir, '../__generated__/types.ts');
	const baseTypesRoot = resolve(cwd, options.baseTypesPath || defaultBaseTypesRoot);
	const baseTypesPath = posixPath(relative(modulesDir, baseTypesRoot));

	const contextType = resolveContextType(cwd, baseTypesRoot, options.contextType);
	const extensions = resolveExtensionPath(modulesDir, moduleDefinitionName, options.extensions);

	return {
		cwd,
		schemas,
		modulesDir,
		moduleDefinitionName,
		baseTypesPath,
		contextType,
		extensions,
		scalars: options.scalars,
		fileOptions: options.fileOptions,
		loaders: options.loaders,
		importExtension:
			options.importExtension === false ? undefined : (options.importExtension ?? '.ts'),
	};
}

function resolveContextType(root: string, baseTypesRoot: string, contextType?: string) {
	if (!contextType) {
		return;
	}

	if (isAbsolute(contextType)) {
		return contextType;
	}

	if (contextType[0] === '!') {
		return contextType.slice(1);
	}

	const contextTypeRoot = resolve(root, contextType);

	return posixPath(relative(join(baseTypesRoot, '../'), contextTypeRoot));
}

function resolveExtensionPath(
	modulesDir: string,
	moduleDefinitionName: string,
	extensionsPath?: string,
) {
	if (!extensionsPath) {
		return;
	}

	if (isAbsolute(extensionsPath)) {
		return extensionsPath;
	}

	if (extensionsPath[0] === '!') {
		return extensionsPath.slice(1);
	}

	return posixPath(relative(join(modulesDir, moduleDefinitionName), extensionsPath));
}
