import type { GraphQLSchema } from 'graphql';
import type { DedupeRegistry } from './dedupe.ts';
import type { FilterRegistry } from './filter.ts';

const filterStateKey = Symbol.for('@baeta/subscriptions-stateless/filter-state');
const dedupeStateKey = Symbol.for('@baeta/subscriptions-stateless/dedupe-state');

function readSchemaState<T>(schema: GraphQLSchema, key: symbol): T | undefined {
	const extensions = schema.extensions as
		| { '@baeta/core/schemaState'?: Map<symbol, unknown> }
		| undefined;
	return extensions?.['@baeta/core/schemaState']?.get(key) as T | undefined;
}

export function readSubscriptionFilters(schema: GraphQLSchema): FilterRegistry | undefined {
	return readSchemaState<FilterRegistry>(schema, filterStateKey);
}

export function readSubscriptionDedupe(schema: GraphQLSchema): DedupeRegistry | undefined {
	return readSchemaState<DedupeRegistry>(schema, dedupeStateKey);
}
