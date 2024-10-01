import { getCachedDocumentNodeFromSchema } from '@graphql-codegen/plugin-helpers';
import { ApolloEngineLoader } from '@graphql-tools/apollo-engine-loader';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { GitLoader } from '@graphql-tools/git-loader';
import { GithubLoader } from '@graphql-tools/github-loader';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { UnnormalizedTypeDefPointer, loadSchema as loadSchemaToolkit } from '@graphql-tools/load';
import { PrismaLoader } from '@graphql-tools/prisma-loader';
import { UrlLoader } from '@graphql-tools/url-loader';
import { GraphQLSchemaExtensions, validateSchema } from 'graphql';
import { hashSchema } from './hash';

export async function loadSchema(schemaPointerMap: UnnormalizedTypeDefPointer, cwd: string) {
	const outputSchemaAst = await loadSchemaToolkit(schemaPointerMap, {
		loaders: [
			new CodeFileLoader(),
			new GitLoader(),
			new GithubLoader(),
			new GraphQLFileLoader(),
			new JsonFileLoader(),
			new UrlLoader(),
			new ApolloEngineLoader(),
			new PrismaLoader(),
		],
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

	(outputSchemaAst.extensions as GraphQLSchemaExtensions)['hash'] = hashSchema(outputSchemaAst);

	return {
		outputSchemaAst,
		outputSchema: getCachedDocumentNodeFromSchema(outputSchemaAst),
	};
}
