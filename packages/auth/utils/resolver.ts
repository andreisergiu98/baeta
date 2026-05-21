export function isOperationType(type: string): type is 'Query' | 'Mutation' | 'Subscription' {
	return ['Query', 'Mutation', 'Subscription'].includes(type);
}
