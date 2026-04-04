import type { DocumentNode } from 'graphql';

interface DocumentTypeDecoration<TResult, TVariables> {
	__apiType?: (variables: TVariables) => TResult;
}

export interface TypedDocumentNode<
	TResult = { [key: string]: any },
	TVariables = { [key: string]: any },
> extends DocumentNode,
		DocumentTypeDecoration<TResult, TVariables> {}
