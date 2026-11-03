import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildASTSchema, type DocumentNode, print, validateSchema } from 'graphql';
import { formatSchemaErrors } from './schema-errors.ts';

export function buildSdl(documents: DocumentNode[]) {
	const document = mergeTypeDefs(documents);
	const schema = buildSchemaFromDocument(document);
	const errors = validateSchema(schema);
	if (errors.length > 0) {
		throw new Error(formatSchemaErrors(errors));
	}
	return print(document);
}

function buildSchemaFromDocument(document: DocumentNode) {
	try {
		return buildASTSchema(document);
	} catch (e) {
		throw new Error(`Invalid schema.\n\n${e instanceof Error ? e.message : e}`, { cause: e });
	}
}
