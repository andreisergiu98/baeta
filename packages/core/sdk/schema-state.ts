import { GraphQLSchema } from 'graphql';
import { logger } from '../lib/logger.ts';

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
	const stateMap = new Map<symbol, unknown>();
	for (const [key, state] of states) {
		if (stateMap.has(key)) {
			logger.warn({
				type: 'schema-state',
				message: `Schema state ${String(key)} was registered multiple times. Keeping the last value.`,
			});
		}
		stateMap.set(key, state);
	}
	return new GraphQLSchema({
		...schema.toConfig(),
		extensions: {
			...schema.extensions,
			[baetaSchemaStateKey]: stateMap,
		},
	});
}
