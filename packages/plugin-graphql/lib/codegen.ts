import type { File, FileOptions, NormalizedGeneratorOptions } from '@baeta/generator-sdk';
import {
	createDefinitionsMapFromDocument,
	createDefinitionsMapFromSources,
	createModuleRegistry,
	getSourcesFromSchema,
	groupSourcesByModule,
	loadSchema,
} from '@baeta/util-graphql';
import { join } from '@baeta/util-path';
import { concatAST } from 'graphql';
import { createFieldInfoMap } from './field-info.ts';
import { printAutoload } from './printer-autoload.ts';
import {
	type ModulePrinterConfig,
	printBaetaModuleTypes,
	printModuleBuilder,
	printModuleImports,
	printModuleIndexStarter,
	printModuleMetadata,
	printModuleObjectTypeFields,
} from './printer-module.ts';
import { printExtensionsTemplate, printTypesTemplate } from './printer-templates.ts';
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
	currentFiles: File[],
): Promise<GeneratedFile[]> {
	const { outputSchema, outputSchemaAst } = await loadSchema(
		options.schemas,
		options.cwd,
		options.loaders,
	);
	const sources = getSourcesFromSchema(outputSchemaAst);
	const sourcesByModule = groupSourcesByModule(sources, options.modulesDir);
	const modules = Array.from(sourcesByModule.keys());
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
			filename: join(options.modulesDir, 'index.ts'),
			content: printAutoload(
				{
					importExtension: options.importExtension,
					moduleDefinitionName: options.moduleDefinitionName,
				},
				modules,
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
				disableBiomeV1Header: true,
				disableBiomeV2Header: true,
				disableEslintHeader: true,
				disableGenerationNoticeHeader: true,
			},
		},
		{
			filename: join(options.modulesDir, 'extensions.ts'),
			content: printExtensionsTemplate(),
			options: {
				disableOverwrite: true,
				disableBiomeV1Header: true,
				disableBiomeV2Header: true,
				disableEslintHeader: true,
				disableGenerationNoticeHeader: true,
			},
		},
	];

	for (const module of modules) {
		const sources = sourcesByModule.get(module);
		const documents = sources?.map((s) => s.document).filter((el) => el != null) ?? [];
		if (documents.length === 0) continue;
		const document = concatAST(documents);
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
				printModuleMetadata(module, document),
				printBaetaModuleTypes(config, module),
				printModuleObjectTypeFields(config, module),
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
					disableBiomeV1Header: true,
					disableBiomeV2Header: true,
					disableEslintHeader: true,
					disableGenerationNoticeHeader: true,
				},
			});
		}
	}

	return files;
}
