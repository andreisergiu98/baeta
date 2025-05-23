import * as fs from 'node:fs/promises';
import {
	type Ctx,
	createPluginV1,
	type FileManager,
	getModuleGetName,
	isMatch,
	type WatcherFile,
} from '@baeta/generator-sdk';
import * as path from '@baeta/util-path';

export interface AutoloadResolverOptions {
	/**
	 * Custom suffix(es) to identify resolver files
	 * Used together with the default suffixes, unless disabled
	 */
	suffix?: string | string[];
	/** If true, disables the default resolver suffixes */
	disableDefaultSuffixes?: boolean;
	/** Custom function to determine if a resolver file should be included */
	match?: (filename: string) => boolean;
}

export interface AutoloadModuleOptions {
	/** Custom function to determine if a module should be included */
	match?: (moduleName: string) => boolean;
}

export interface AutoloadPluginOptions {
	/** Configuration for resolver autoloading. Set to false to disable */
	resolvers?: boolean | AutoloadResolverOptions;
	/** Configuration for module autoloading. Set to false to disable */
	modules?: boolean | AutoloadModuleOptions;
	/**
	 * Output path for the generated autoload file
	 * @defaultValue ```ts
	 * `${modulesDir}/autoload.ts`
	 * ```
	 */
	output?: string;
}

const defaultSuffixes = [
	'auth',
	'authorization',
	'authorizations',
	'cache',
	'caches',
	'complexity',
	'complexities',
	'resolver',
	'resolvers',
	'query',
	'queries',
	'mutation',
	'mutations',
	'subscription',
	'subscriptions',
	'baeta',
];

async function findFilesForPath(fullPath: string, predicate: (file: string) => boolean) {
	const stat = await fs.stat(fullPath);

	if (stat.isDirectory()) {
		return findFiles(fullPath, predicate);
	}

	if (!predicate(fullPath)) {
		return [];
	}

	return [fullPath];
}

async function findFiles(baseDir: string, predicate: (file: string) => boolean) {
	const entries = await fs.readdir(baseDir);
	const promises: Array<Promise<string[]>> = [];

	for (const entry of entries) {
		const fullPath = path.isAbsolute(entry) ? entry : path.join(baseDir, entry);
		promises.push(findFilesForPath(fullPath, predicate));
	}

	return Promise.all(promises).then((results) => results.flat());
}

function getResolverSuffixes(options?: AutoloadPluginOptions) {
	if (typeof options?.resolvers !== 'object') {
		return defaultSuffixes;
	}

	if (options.resolvers.suffix == null) {
		return defaultSuffixes;
	}

	const suffixes = options.resolvers.disableDefaultSuffixes === true ? ['baeta'] : defaultSuffixes;

	if (!Array.isArray(options.resolvers.suffix)) {
		return [options.resolvers.suffix, ...suffixes];
	}

	return [...options.resolvers.suffix, ...suffixes];
}

function getResolverMatcher(options?: AutoloadPluginOptions) {
	if (typeof options?.resolvers !== 'object') {
		return () => true;
	}
	return options.resolvers.match ?? (() => true);
}

async function getResolvers(ctx: Ctx, options?: AutoloadPluginOptions) {
	const modulesDir = ctx.generatorOptions.modulesDir;

	if (options?.resolvers === false) {
		return [];
	}

	const suffixes = getResolverSuffixes(options);

	const files = await findFiles(modulesDir, (input: string) =>
		suffixes.some((suffix) => input.endsWith(`${suffix}.ts`)),
	);

	const generatedFiles = ctx.fileManager.getByTag('resolvers').map((file) => file.filename);

	return [...files, ...generatedFiles].filter(getResolverMatcher(options));
}

function getTypeDefs(
	fileManager: FileManager,
	moduleDefinitionName: string,
	options?: AutoloadPluginOptions,
) {
	if (options?.modules === false) {
		return [];
	}

	const files = fileManager.getByTag('graphql');
	return files.filter((file) => file.filename.endsWith(moduleDefinitionName));
}

function getModuleMatcher(options?: AutoloadPluginOptions) {
	if (typeof options?.modules !== 'object') {
		return () => true;
	}
	return options.modules.match ?? (() => true);
}

function buildResolverImport(resolver: string, modulesDir: string, extension: string) {
	const resolverPath = path.relative(modulesDir, resolver).replace('.ts', '');
	return `import "./${resolverPath}${extension}";\n`;
}

function buildModuleImport(
	moduleName: string,
	modulesDir: string,
	filename: string,
	extension: string,
) {
	const modulePath = path.relative(modulesDir, filename).replace('.ts', '');
	return `import {${getModuleGetName(moduleName)}} from "./${modulePath}${extension}";\n`;
}

function buildModuleList(moduleNames: string[]) {
	const moduleGetters = moduleNames.map((moduleName) => `${getModuleGetName(moduleName)}()`);
	return `export const modules = [${moduleGetters.join(', ')}];\n`;
}

/**
 * A plugin that automatically loads GraphQL resolvers and modules based on file names.
 * See https://baeta.io/docs/plugins/autoloading
 *
 * @param options - Configuration options for the autoload plugin
 * @returns A Baeta generator plugin
 *
 */
export function autoloadPlugin(options?: AutoloadPluginOptions) {
	const modulesMatcher = getModuleMatcher(options);

	return createPluginV1({
		name: 'autoload',
		actionName: 'autoload',
		watch: (generatorOptions, watcher, reload) => {
			if (options?.resolvers === false) {
				return;
			}

			const matches = getResolverMatcher(options);
			const suffixes = getResolverSuffixes(options);
			const glob = path.join(generatorOptions.modulesDir, '**', `*.{${suffixes.join(',')}}.ts`);

			const handleChange = (file: WatcherFile) => {
				if (!matches(file.path)) {
					return;
				}

				if (isMatch(file.path, glob)) {
					reload(file);
				}
			};

			watcher.on('create', handleChange);
			watcher.on('delete', handleChange);
		},
		async generate(ctx, next) {
			await next();

			const resolvers = await getResolvers(ctx, options);

			const typeDefs = getTypeDefs(
				ctx.fileManager,
				ctx.generatorOptions.moduleDefinitionName,
				options,
			);

			const content = resolvers.map((resolver) =>
				buildResolverImport(
					resolver,
					ctx.generatorOptions.modulesDir,
					ctx.generatorOptions.importExtension ?? '',
				),
			);

			const moduleNames: string[] = [];

			for (const typedef of typeDefs) {
				const moduleName = path.dirname(typedef.filename).split(path.sep).pop();

				if (!moduleName) {
					continue;
				}

				if (!modulesMatcher(moduleName)) {
					continue;
				}

				moduleNames.push(moduleName);

				content.push(
					buildModuleImport(
						moduleName,
						ctx.generatorOptions.modulesDir,
						typedef.filename,
						ctx.generatorOptions.importExtension ?? '',
					),
				);
			}

			content.push(buildModuleList(moduleNames));

			const generatedFileName = options?.output
				? path.join(ctx.generatorOptions.cwd, options.output)
				: path.join(ctx.generatorOptions.modulesDir, 'autoload.ts');

			ctx.fileManager.createAndAdd(generatedFileName, content.join('\n'), 'autoloader');
		},
	});
}
