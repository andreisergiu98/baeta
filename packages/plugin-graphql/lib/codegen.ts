import type { FileOptions, NormalizedGeneratorOptions } from '@baeta/generator-sdk';
import { join } from '@baeta/util-path';
import { concatAST } from 'graphql';
import { loadSchema } from '../utils/load.ts';
import { getSourcesFromSchema, groupSourcesByModule } from '../utils/source.ts';
import { printAutoload } from './printer/printer-autoload.ts';
import {
	type ModulePrinterConfig,
	printBaetaModuleTypes,
	printModuleBuilder,
	printModuleImports,
	printModuleMetadata,
	printModuleObjectTypeFields,
} from './printer/printer-module.ts';
import { printExtensionsTemplate, printTypesTemplate } from './printer/printer-templates.ts';
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
} from './printer/printer-types.ts';
import {
	createDefinitionsMapFromDocument,
	createDefinitionsMapFromSources,
} from './visitors/definitions-map.ts';
import { createFieldInfoMap } from './visitors/field-info.ts';
import { createModuleRegistry } from './visitors/module-registry.ts';

type GeneratedFile = {
	filename: string;
	content: string;
	options?: FileOptions;
};

export async function generate(options: NormalizedGeneratorOptions): Promise<GeneratedFile[]> {
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
	};

	const fieldInfo = createFieldInfoMap(globalDefinitions, defaultScalars);

	const typesContent = [
		printTypesHeaders(),
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
			content: printAutoload({ importExtension: options.importExtension }, modules),
		},
		{
			filename: join(options.modulesDir, 'types.ts'),
			content: printTypesTemplate({
				importExtension: options.importExtension,
				typesDir: options.typesDir,
				modulesDir: options.modulesDir,
			}),
			options: {
				allowOverwrite: false,
				disableBiomeHeader: true,
				disableEslintHeader: true,
				disableGenerationNoticeHeader: true,
			},
		},
		{
			filename: join(options.modulesDir, 'extensions.ts'),
			content: printExtensionsTemplate(),
			options: {
				allowOverwrite: false,
				disableBiomeHeader: true,
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
		};
		files.push({
			filename: `src/modules/${module}/${options.moduleDefinitionName}`,
			content: [
				printModuleImports(config, module),
				printModuleMetadata(module, document),
				printBaetaModuleTypes(config),
				printModuleObjectTypeFields(config),
				printModuleBuilder(config, module),
			].join('\n\n'),
		});
	}

	return files;
}
