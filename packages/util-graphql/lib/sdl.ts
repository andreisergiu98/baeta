import { mergeTypeDefs } from '@graphql-tools/merge';
import {
	buildASTSchema,
	type DocumentNode,
	type GraphQLSchema,
	print,
	validateSchema,
} from 'graphql';
import { formatSchemaErrors } from './schema-errors.ts';

export interface RootTypes {
	query: string;
	mutation?: string;
	subscription?: string;
}

export function buildSdl(documents: DocumentNode[]) {
	const document = mergeTypeDefs(documents);
	const schema = buildSchemaFromDocument(document);
	const errors = validateSchema(schema);
	if (errors.length > 0) {
		throw new Error(formatSchemaErrors(errors));
	}
	return {
		sdl: print(document),
		roots: getRootTypes(schema),
	};
}

export function getRootTypeNames(roots: RootTypes) {
	return [roots.query, roots.mutation, roots.subscription].filter((name) => name != null);
}

function getRootTypes(schema: GraphQLSchema): RootTypes {
	const roots: RootTypes = { query: schema.getQueryType()?.name ?? 'Query' };
	const mutation = schema.getMutationType()?.name;
	const subscription = schema.getSubscriptionType()?.name;
	if (mutation != null) {
		roots.mutation = mutation;
	}
	if (subscription != null) {
		roots.subscription = subscription;
	}
	return roots;
}

function buildSchemaFromDocument(document: DocumentNode) {
	try {
		return buildASTSchema(document);
	} catch (e) {
		throw new Error(`Invalid schema.\n\n${e instanceof Error ? e.message : e}`, { cause: e });
	}
}
