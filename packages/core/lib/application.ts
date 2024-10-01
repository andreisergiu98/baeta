import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import { pruneSchema } from '@graphql-tools/utils';
import { getModuleBuilder, transformSchema } from '../sdk';
import { addValidationToSchema } from './input-directive/input-schema';

type ExecutableSchemaOptions = Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;

export interface Options {
	/**
	 * Modules to include in the application
	 */
	modules: Record<string, unknown>[];

	/**
	 * Whether to remove fields with no resolvers
	 * @default false
	 */
	pruneSchema?: boolean;

	/**
	 * Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema
	 */
	executableSchemaOptions?: ExecutableSchemaOptions;
}

function makeSchema(
	typeDefs: IExecutableSchemaDefinition['typeDefs'],
	resolvers: IExecutableSchemaDefinition['resolvers'],
	options?: ExecutableSchemaOptions,
) {
	try {
		return makeExecutableSchema({
			...options,
			typeDefs,
			resolvers,
		});
	} catch (e) {
		throw new Error(`Couldn't build schema! Did you forget to register all modules?`, {
			cause: e,
		});
	}
}

export function createApplication(options: Options) {
	const builders = options.modules.map((module) => getModuleBuilder(module));
	const builtModules = builders.map((builder) => builder.build());

	const typeDefs = builtModules.map((b) => b.typedef);
	const resolvers = builtModules.map((b) => b.resolvers);
	const transformers = builtModules.flatMap((b) => b.transform);

	let schema = makeSchema(typeDefs, resolvers, options.executableSchemaOptions);

	schema = transformSchema(schema, transformers);
	schema = addValidationToSchema(schema);

	if (options.pruneSchema) {
		schema = pruneSchema(schema);
	}

	return {
		schema,
	};
}
