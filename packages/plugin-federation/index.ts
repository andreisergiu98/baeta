import fs from 'node:fs/promises';
import { createPluginV1, type Ctx } from '@baeta/generator-sdk';
import { getSourcesFromSchema, loadSchema } from '@baeta/util-graphql';
import { normalize } from '@baeta/util-path';
import { buildFederationInfo } from './lib/federation-info.ts';
import { printFederationTypes } from './lib/print-federation-types.ts';
import { printHandlersStarter } from './lib/print-handlers-starter.ts';
import { printResolvers } from './lib/print-resolvers.ts';
import { printSchemaSpec } from './lib/print-schema-spec.ts';
import { printSchemaTypes } from './lib/print-schema-types.ts';
import { printSDL } from './lib/print-sdl.ts';
import type { FederationDirectiveName, FederationSpec } from './lib/spec.ts';
import {
	type FederationDirectiveNamesByVersion,
	type FederationVersion,
	findSpecification,
} from './lib/specs.ts';

const DEFAULT_MODULE_NAME = 'baeta-federation' as const;
const DEFAULT_VERSION = '2.9' as const satisfies FederationVersion;
const DEFAULT_DIRECTIVES = [
	'@key',
	'@external',
	'@requires',
	'@provides',
	'@extends',
] as const satisfies FederationDirectiveNamesByVersion<'2.0'>[];

type DefaultFederationVersion = typeof DEFAULT_VERSION;

type DefaultFederationDirectives = (typeof DEFAULT_DIRECTIVES)[number];

/**
 * Options for the federation plugin. All options are optional and have sensible defaults, so you can just call `federationPlugin()` without any arguments for a good out-of-the-box experience.
 */
export interface FederationPluginOptions<
	Version extends FederationVersion = DefaultFederationVersion,
> {
	/**
	 * Federation version to target. Determines which directives are available for import.
	 * @defaultValue '2.9'
	 */
	version?: Version;
	/** Directives to include in the generated federation module. Can be either a list of directive names or 'all' to include all available directives for the specified version.
	 * @defaultValue ['@key', '@external', '@requires', '@provides', '@extends']
	 */
	include?:
		| Exclude<FederationDirectiveNamesByVersion<Version>, DefaultFederationDirectives>[]
		| 'all';

	/**
	 * Custom name for the federation module
	 * @defaultValue 'baeta-federation'
	 */
	moduleName?: string;
}

export function federationPlugin<const Version extends FederationVersion>(
	options?: FederationPluginOptions<Version>,
) {
	return createPluginV1({
		name: 'graphql',
		actionName: 'GraphQL federation',
		watch: (generatorOptions, watcher) => {
			const federationRootDir = getModuleRootDir(generatorOptions.modulesDir, options);
			watcher.ignore(`${federationRootDir}/*.gql`);
		},
		setup: async (ctx, next) => {
			const { specification, directiveNames, federationRootDir } = buildFederationOptions(
				ctx,
				options,
			);
			const { schemaSpecFilePath, schemaTypesFilePath } = buildFederationFilePaths(
				ctx,
				federationRootDir,
			);
			ctx.fileManager.createAndAdd(
				schemaSpecFilePath,
				printSchemaSpec(specification, directiveNames),
				'federation',
			);
			await fs.unlink(schemaTypesFilePath).catch(() => {});
			return await next();
		},
		generate: async (ctx, next) => {
			const { moduleName, specification, directiveNames, federationRootDir } =
				buildFederationOptions(ctx, options);
			const {
				federationTypesFilePath,
				sdlFilePath,
				schemaSpecFilePath,
				schemaTypesFilePath,
				entityHandlersFilePath,
				resolversFilePath,
			} = buildFederationFilePaths(ctx, federationRootDir);

			const { outputSchemaAst } = await loadSchema(
				ctx.generatorOptions.schemas,
				ctx.generatorOptions.cwd,
				ctx.generatorOptions.loaders,
			);
			const sources = getSourcesFromSchema(outputSchemaAst).filter((source) => {
				if (!source.location) {
					return true;
				}
				const location = normalize(source.location);
				return location !== schemaSpecFilePath && location !== schemaTypesFilePath;
			});

			const federationInfo = buildFederationInfo(specification, sources);

			ctx.fileManager.createAndAdd(
				sdlFilePath,
				printSDL(specification, sources, federationInfo),
				'federation',
			);

			ctx.fileManager.createAndAdd(
				federationTypesFilePath,
				printFederationTypes(outputSchemaAst, federationInfo, {
					extension: ctx.generatorOptions.importExtension,
					modulesDir: ctx.generatorOptions.modulesDir,
					typesDir: ctx.generatorOptions.typesDir,
				}),
				'federation',
			);

			ctx.fileManager.createAndAdd(
				resolversFilePath,
				printResolvers(specification, federationInfo, {
					moduleName,
					typesDir: ctx.generatorOptions.typesDir,
					federationRootDir,
					extension: ctx.generatorOptions.importExtension,
					moduleDefinitionName: ctx.generatorOptions.moduleDefinitionName,
					includedDirectiveNames: directiveNames,
				}),
				'federation',
			);

			ctx.fileManager.createAndAdd(
				entityHandlersFilePath,
				printHandlersStarter({
					typesDir: ctx.generatorOptions.typesDir,
					federationRootDir,
					extension: ctx.generatorOptions.importExtension,
				}),
				'federation',
				{
					disableOverwrite: true,
					enableLintHeaders: false,
					disableGenerationNoticeHeader: true,
				},
			);

			const schemaTypesFile = ctx.fileManager.createAndAdd(
				schemaTypesFilePath,
				printSchemaTypes(federationInfo),
				'federation',
			);
			await schemaTypesFile.write();

			return await next();
		},
	});
}

function buildFederationOptions<Version extends FederationVersion>(
	ctx: Ctx,
	options?: FederationPluginOptions<Version>,
) {
	const moduleName = options?.moduleName ?? DEFAULT_MODULE_NAME;
	const specification = findSpecification(options?.version ?? DEFAULT_VERSION);
	const directiveNames = buildDirectiveNames(specification, options?.include);
	const federationRootDir = getModuleRootDir(ctx.generatorOptions.modulesDir, options);
	return {
		moduleName,
		specification,
		directiveNames,
		federationRootDir,
	};
}

function buildFederationFilePaths(ctx: Ctx, federationRootDir: string) {
	return {
		federationTypesFilePath: `${ctx.generatorOptions.typesDir}/federation.ts`,
		sdlFilePath: `${federationRootDir}/federation-sdl.ts`,
		schemaSpecFilePath: `${federationRootDir}/federation-spec.gql`,
		schemaTypesFilePath: `${federationRootDir}/federation-types.gql`,
		entityHandlersFilePath: `${federationRootDir}/entity-handlers.ts`,
		resolversFilePath: `${federationRootDir}/index.ts`,
	};
}

function getModuleRootDir<Version extends FederationVersion>(
	modulesDir: string,
	options?: FederationPluginOptions<Version>,
): string {
	return `${modulesDir}/${options?.moduleName ?? DEFAULT_MODULE_NAME}`;
}

function buildDirectiveNames(
	spec: FederationSpec,
	include: FederationDirectiveName[] | 'all' = [],
): Set<FederationDirectiveName> {
	if (include === 'all') {
		return new Set(spec.directives.map((d) => d.name));
	}
	return new Set([...DEFAULT_DIRECTIVES, ...include]);
}
