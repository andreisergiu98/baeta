import { type ExecutionResult, type GraphQLSchema, execute as rawExecute } from 'graphql';
import type { TypedDocumentNode } from './document-node.ts';

export function execute<TResult, TVariables extends Record<string, unknown>>(args: {
	schema: GraphQLSchema;
	document: TypedDocumentNode<TResult, TVariables>;
	variableValues?: TVariables;
	contextValue?: unknown;
}): Promise<ExecutionResult<TResult>> {
	return Promise.resolve(rawExecute(args)) as Promise<ExecutionResult<TResult>>;
}
