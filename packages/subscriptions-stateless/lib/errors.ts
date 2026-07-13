import { GraphQLError } from 'graphql';

export function toUnexpectedGraphQLError(cause: unknown): GraphQLError {
	return new GraphQLError('An unexpected error occurred', { cause });
}
