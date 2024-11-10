import type { NormalizedGeneratorOptions } from '@baeta/generator-sdk';
import { codegen as gqlCodegen } from '@graphql-codegen/core';
import { normalizeConfig, normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import type { UnnormalizedTypeDefPointer } from '@graphql-tools/load';
import { createCache } from '../utils/cache.ts';
import { loadSchema } from '../utils/load.ts';
import * as contextPlugin from './context/index.ts';
import * as modules from './modules/index.ts';

export async function generate(options: NormalizedGeneratorOptions) {
	const rootConfig = {
		schemas: normalizeInstanceOrArray(options.schemas),
		modulesDir: options.modulesDir,
		baseTypesPath: options.baseTypesPath,
		contextType: options.contextType,
		moduleDefinitionName: options.moduleDefinitionName,
		scalars: options.scalars,
		plugins: normalizeConfig(['typescript', 'context']),
		pluginMap: {
			typescript: typescriptPlugin,
			context: contextPlugin,
		},
	};

	const cache = createCache();

	const schemaPointerMap: UnnormalizedTypeDefPointer = {};
	for (const ptr of rootConfig.schemas) {
		if (typeof ptr === 'string') {
			schemaPointerMap[ptr] = {};
		} else if (typeof ptr === 'object') {
			Object.assign(schemaPointerMap, ptr);
		}
	}

	const hash = JSON.stringify(schemaPointerMap);
	const result = await cache('schema', hash, async () => {
		return loadSchema(schemaPointerMap, options.cwd, options.loaders);
	});

	const outputs = await modules.preset.buildGeneratesSection({
		baseOutputDir: options.modulesDir,
		presetConfig: {
			baseTypesPath: rootConfig.baseTypesPath,
			filename: rootConfig.moduleDefinitionName,
			encapsulateModuleTypes: 'none',
			extensionsPath: options.extensions,
		},
		schema: result.outputSchema,
		schemaAst: result.outputSchemaAst,
		documents: [],
		pluginMap: rootConfig.pluginMap,
		plugins: rootConfig.plugins,
		config: {
			inputMaybeValue: 'T | undefined',
			contextType: rootConfig.contextType,
			useTypeImports: true,
			scalars: {
				...rootConfig.scalars,
			},
		},
	});

	const promises = outputs.map(async (output) => {
		const result = await gqlCodegen({
			...output,
			cache,
		});

		return {
			filename: output.filename,
			content: result,
		};
	});

	return Promise.all(promises);
}
