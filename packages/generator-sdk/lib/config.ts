import { isAbsolute, join, posixPath, relative, resolve } from '@baeta/util-path';
import type { FileOptions } from './file.ts';

/**
 * Options for the graphql generator.
 */
export interface GeneratorOptions {
	/**
	 * Current working directory.
	 * @default process.cwd()
	 */
	cwd?: string;

	/**
	 * Glob pattern(s) to load graphql schema files.
	 * @default ['src/∗∗/∗.graphql']
	 */
	schemas: string[];

	/**
	 * Directory where modules are defined.
	 * @default 'src/modules'
	 */
	modulesDir?: string;

	/**
	 * Name for the generated module definition file. This will contain type definitions and the graphql ast.
	 * @default 'typedef.ts'
	 */
	moduleDefinitionName?: string;

	/**
	 * Path for the generated base types file.
	 * @default `${modulesDir}/../__generated__/types.ts`
	 */
	baseTypesPath?: string;

	/**
	 * Path where the context type is exported.
	 * @example contextType: 'src/types/context#Context' // for named export
	 * @example contextType: 'src/types/context' // for default export
	 * @default undefined
	 */
	contextType?: string;

	/**
	 * Path where extensions (ex. auth-extension) are exported. Only default export is supported.
	 * @example extensions: 'src/extensions'
	 * @default undefined
	 */
	extensions?: string;

	/**
	 * Custom scalar mappings.
	 * @example scalars: { DateTime: 'Date' }
	 * @default undefined
	 */
	scalars?: Record<string, string>;

	/**
	 * Options for generated files.
	 */
	fileOptions?: FileOptions;
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
