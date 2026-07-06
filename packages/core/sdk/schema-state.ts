import { GraphQLSchema } from 'graphql';

export const baetaSchemaStateKey = '@baeta/core/schemaState';

export type BaetaSchemaExtensions = {
	[baetaSchemaStateKey]?: Map<symbol, unknown>;
};

export type SetSchemaState<T = unknown> = [symbol, T];

export function createSchemaState<T>(key: symbol) {
	return {
		build: (state: T): SetSchemaState<T> => [key, state],
		read: (schema: GraphQLSchema) => {
			const extensions = schema.extensions as BaetaSchemaExtensions | undefined;
			return extensions?.[baetaSchemaStateKey]?.get(key) as T | undefined;
		},
	};
}

export function attachSchemaStates(schema: GraphQLSchema, states: SetSchemaState[]): GraphQLSchema {
	if (states.length === 0) {
		return schema;
	}
	return new GraphQLSchema({
		...schema.toConfig(),
		extensions: {
			...schema.extensions,
			[baetaSchemaStateKey]: new Map(states),
		},
	});
}
