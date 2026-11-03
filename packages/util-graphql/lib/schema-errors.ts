import type { GraphQLError } from 'graphql';

export function formatSchemaErrors(errors: readonly GraphQLError[]) {
	const messages = errors.map((e) => e.toString()).join('\n\n--------------------\n\n');
	const subject = errors.length === 1 ? 'error' : 'errors';
	return `Invalid schema. Found ${errors.length} ${subject}:\n\n${messages}`;
}
