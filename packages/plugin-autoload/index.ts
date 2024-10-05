import * as fs from 'node:fs/promises';
import {
	type Ctx,
	type FileManager,
	type WatcherFile,
	createPluginV1,
	getModuleGetName,
	isMatch,
} from '@baeta/generator-sdk';
import * as path from '@baeta/util-path';

interface ResolverOptions {
	suffix?: string | string[];
	disableDefaultSuffixes?: boolean;
	match?: (filename: string) => boolean;
}

interface ModuleOptions {
	match?: (moduleName: string) => boolean;
}

export interface AutoloadPluginOptions {
	resolvers?: boolean | ResolverOptions;
	modules?: boolean | ModuleOptions;
	output?: string;
}

const defaultSuffixes = [
	'auth',
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

function buildResolverImport(resolver: string, modulesDir: string) {
	return `import "./${path.relative(modulesDir, resolver).replace('.ts', '')}";\n`;
}

function buildModuleImport(moduleName: string, modulesDir: string, filename: string) {
	const modulePath = path.relative(modulesDir, filename).replace('.ts', '');
	return `import {${getModuleGetName(moduleName)}} from "./${modulePath}";\n`;
}

function buildModuleList(moduleNames: string[]) {
	const moduleGetters = moduleNames.map((moduleName) => `${getModuleGetName(moduleName)}()`);
	return `export const modules = [${moduleGetters.join(', ')}];\n`;
}

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
				buildResolverImport(resolver, ctx.generatorOptions.modulesDir),
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
					buildModuleImport(moduleName, ctx.generatorOptions.modulesDir, typedef.filename),
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
