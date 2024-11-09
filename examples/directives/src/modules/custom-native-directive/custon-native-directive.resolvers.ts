import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import { getCustomNativeDirectiveModule } from './typedef.ts';

// Example from https://github.com/apollographql/docs-examples/blob/main/apollo-server/v4/custom-directives/upper-case-directive/src/index.ts

const { $directive, Query } = getCustomNativeDirectiveModule();

$directive((schema) => {
	return mapSchema(schema, {
		// Executes once for each object field in the schema
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			// Check whether this field has the specified directive
			const upperDirective = getDirective(schema, fieldConfig, 'upper')?.[0];

			if (!upperDirective) {
				return fieldConfig;
			}

			// Get this field's original resolver
			const { resolve = defaultFieldResolver } = fieldConfig;

			// Replace the original resolver with a function that *first* calls
			// the original resolver, then converts its result to upper case
			fieldConfig.resolve = async (source, args, context, info) => {
				const result = await resolve(source, args, context, info);
				if (typeof result === 'string') {
					return result.toUpperCase();
				}
				return result;
			};
			return fieldConfig;
		},
	});
});

Query.testUpperDirective(({ args }) => {
	return {
		name: args.name,
	};
});
