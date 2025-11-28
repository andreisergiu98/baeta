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
		const messages = errors.map((e) => e.toString()).join('\n\n--------------------\n\n');
		const subject = errors.length === 1 ? 'error' : 'errors';
		throw new Error(`Invalid schema. Found ${errors.length} ${subject}:\n\n${messages}`);
	}

	if (!outputSchemaAst.extensions) {
		outputSchemaAst.extensions = {};
	}

	return {
		outputSchemaAst,
		outputSchema: getDocumentNodeFromSchema(outputSchemaAst),
	};
}
