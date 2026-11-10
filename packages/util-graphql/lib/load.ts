import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
	loadSchema as loadSchemaToolkit,
	type UnnormalizedTypeDefPointer,
} from '@graphql-tools/load';
import {
	type BaseLoaderOptions,
	getDocumentNodeFromSchema,
	type Loader,
} from '@graphql-tools/utils';
import { validateSchema } from 'graphql';
import { formatSchemaErrors } from './schema-errors.ts';

export async function loadSchema(
	schemas: string | string[],
	cwd: string,
	extraLoaders: Loader<BaseLoaderOptions>[] = [],
) {
	const schemaPointerMap: UnnormalizedTypeDefPointer = {};
	for (const ptr of Array.isArray(schemas) ? schemas : [schemas]) {
		schemaPointerMap[ptr] = {};
	}

	const outputSchemaAst = await loadSchemaToolkit(schemaPointerMap, {
		loaders: [new GraphQLFileLoader(), ...extraLoaders],
		cwd,
		includeSources: true,
	});

	const errors = validateSchema(outputSchemaAst);

	if (errors.length > 0) {
		throw new Error(formatSchemaErrors(errors));
	}

	if (!outputSchemaAst.extensions) {
		outputSchemaAst.extensions = {};
	}

	return {
		outputSchemaAst,
		outputSchema: getDocumentNodeFromSchema(outputSchemaAst),
	};
}
