import type { File, FileOptions, NormalizedGeneratorOptions } from '@baeta/generator-sdk';
import {
	buildSdl,
	createDefinitionsMapFromDocument,
	createDefinitionsMapFromSources,
	createModuleRegistry,
	getSourcesFromSchema,
	groupSourcesByModule,
	loadSchema,
	type Source,
} from '@baeta/util-graphql';
import { join } from '@baeta/util-path';
import { concatAST, type DocumentNode } from 'graphql';
import { createFieldInfoMap } from './field-info.ts';
import { assertModuleNames } from './module-names.ts';
import { printAutoload } from './printer-autoload.ts';
import {
	type ModulePrinterConfig,
	printBaetaModuleTypes,
	printModuleBuilder,
	printModuleImports,
	printModuleIndexStarter,
	printModuleObjectTypeFields,
} from './printer-module.ts';
import { printSdl } from './printer-sdl.ts';
import { printTypesTemplate } from './printer-templates.ts';
import {
	type PrinterConfig,
	printBaseObjectTypes,
	printBaseScalars,
	printEnumTypesFromMap,
	printInputObjectTypeTypesFromMap,
	printInterfaceTypesFromMap,
	printObjectTypeFieldsArgsFromMap,
	printObjectTypeTypesFromMap,
	printRootTypesFromMap,
	printTypesHeaders,
	printUnionTypesFromMap,
	printUtilityTypes,
} from './printer-types.ts';

type GeneratedFile = {
	filename: string;
	content: string;
	options?: FileOptions;
};

export async function generate(
	options: NormalizedGeneratorOptions,
	currentFiles: readonly File[],
): Promise<GeneratedFile[]> {
	const { outputSchema, outputSchemaAst } = await loadSchema(
		options.schemas,
		options.cwd,
		options.loaders,
	);
	const sources = getSourcesFromSchema(outputSchemaAst);
	const sourcesByModule = groupSourcesByModule(sources, options.modulesDir);
	const modules = Array.from(sourcesByModule.keys());
	assertModuleNames(modules);
	const moduleDocuments = getModuleDocuments(sourcesByModule);
	const sdl = buildModulesSdl(Array.from(moduleDocuments.values()), options.modulesDir);
	const globalDefinitions = createDefinitionsMapFromDocument(outputSchema);
	const modulesDefinitions = createDefinitionsMapFromSources(sources);

	const defaultScalars = ['ID', 'Int', 'Float', 'String', 'Boolean'];

	const config: PrinterConfig = {
		globalDefinitions,
		withMaybe: false,
		withOptional: false,
		defaultScalars,
		importExtension: options.importExtension,
		typesDir: options.typesDir,
		modulesDir: options.modulesDir,
	};

	const fieldInfo = createFieldInfoMap(globalDefinitions, defaultScalars);

	const typesContent = [
		printTypesHeaders(config),
		printRootTypesFromMap(
			config,
			['Query', 'Mutation', 'Subscription'],
			globalDefinitions.objectTypeMap,
		),
		...printEnumTypesFromMap(globalDefinitions.enumTypeMap),
		...printObjectTypeTypesFromMap(config, modulesDefinitions.objectTypeMap),
		...printObjectTypeFieldsArgsFromMap(config, globalDefinitions.objectTypeMap),
		...printInputObjectTypeTypesFromMap(config, globalDefinitions.inputObjectTypeMap),
		...printInterfaceTypesFromMap(config, globalDefinitions.interfaceTypeMap),
		...printUnionTypesFromMap(config, globalDefinitions.unionTypeMap),
	].join('\n\n');

	const utilityContent = [
		printUtilityTypes(),
		printBaseScalars(config),
		printBaseObjectTypes(config),
	].join('\n\n');

	const files: GeneratedFile[] = [
		{
			filename: join(options.typesDir, 'types.ts'),
			content: typesContent,
		},
		{
			filename: join(options.typesDir, 'utility.ts'),
			content: utilityContent,
		},
		{
			filename: join(options.typesDir, 'sdl.ts'),
			content: printSdl(sdl),
		},
		{
			filename: join(options.modulesDir, 'index.ts'),
			content: printAutoload(
				{
					importExtension: options.importExtension,
					moduleDefinitionName: options.moduleDefinitionName,
					modulesDir: options.modulesDir,
					typesDir: options.typesDir,
				},
				Array.from(moduleDocuments.keys()),
			),
		},
		{
			filename: join(options.modulesDir, 'types.ts'),
			content: printTypesTemplate({
				importExtension: options.importExtension,
				typesDir: options.typesDir,
				modulesDir: options.modulesDir,
			}),
			options: {
				disableOverwrite: true,
				enableLintHeaders: false,
				disableGenerationNoticeHeader: true,
			},
		},
	];

	for (const [module, document] of moduleDocuments) {
		const config: ModulePrinterConfig = {
			typesDir: options.typesDir,
			fieldInfo,
			importExtension: options.importExtension,
			modulesDir: options.modulesDir,
			registry: createModuleRegistry(document),
			moduleDefinitionName: options.moduleDefinitionName,
		};
		files.push({
			filename: join(options.modulesDir, `/${module}/${options.moduleDefinitionName}.ts`),
			content: [
				printModuleImports(config, module),
				printBaetaModuleTypes(config),
				printModuleObjectTypeFields(config),
				printModuleBuilder(config, module),
			].join('\n\n'),
		});

		const moduleStarterPath = join(options.modulesDir, `/${module}/index.ts`);
		const moduleStarterExists = currentFiles.some((file) => file.filename === moduleStarterPath);
		if (!moduleStarterExists) {
			files.push({
				filename: join(options.modulesDir, `/${module}/index.ts`),
				content: printModuleIndexStarter(config, module),
				options: {
					disableOverwrite: true,
					enableLintHeaders: false,
					disableGenerationNoticeHeader: true,
				},
			});
		}
	}

	return files;
}

function getModuleDocuments(sourcesByModule: Map<string, Source[]>) {
	const moduleDocuments = new Map<string, DocumentNode>();
	for (const [module, sources] of sourcesByModule) {
		const documents = sources.map((s) => s.document).filter((el) => el != null);
		if (documents.length > 0) {
			moduleDocuments.set(module, concatAST(documents));
		}
	}
	return moduleDocuments;
}

function buildModulesSdl(documents: DocumentNode[], modulesDir: string) {
	if (documents.length === 0) {
		throw new Error(`No schema files were found in the modules directory "${modulesDir}".`);
	}
	try {
		return buildSdl(documents);
	} catch (e) {
		throw new Error(
			`The schema built from the modules in "${modulesDir}" is invalid. Only schema files inside the modules directory are part of the application schema.\n\n${e instanceof Error ? e.message : e}`,
			{ cause: e },
		);
	}
}
