import { getCachedDocumentNodeFromSchema } from '@graphql-codegen/plugin-helpers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
	loadSchema as loadSchemaToolkit,
	type UnnormalizedTypeDefPointer,
} from '@graphql-tools/load';
import type { BaseLoaderOptions, Loader } from '@graphql-tools/utils';
import { type GraphQLSchemaExtensions, validateSchema } from 'graphql';
import { hashSchema } from './hash.ts';

export async function loadSchema(
	schemaPointerMap: UnnormalizedTypeDefPointer,
	cwd: string,
	extraLoaders: Loader<BaseLoaderOptions>[] = [],
) {
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

	(outputSchemaAst.extensions as GraphQLSchemaExtensions).hash = hashSchema(outputSchemaAst);

	return {
		outputSchemaAst,
		outputSchema: getCachedDocumentNodeFromSchema(outputSchemaAst),
	};
}
