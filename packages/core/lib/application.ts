import { type IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import { pruneSchema } from '@graphql-tools/utils';
import { getModuleBuilder, transformSchema } from '../sdk/index.ts';
import { addValidationToSchema } from './input-directive/input-schema.ts';

export type ExecutableSchemaOptions = Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;

export interface Options {
	/**
	 * Array of module objects to include in the application.
	 *
	 * @example
	 * ```typescript
	 * const modules = [
	 *   userModule,
	 *   postModule,
	 *   commentModule
	 * ];
	 * ```
	 */
	modules: Record<string, unknown>[];

	/**
	 * When true, removes fields that don't have corresponding resolvers.
	 *
	 * @defaultValue false
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

/**
 * Creates a Baeta application by combining the modules.
 *
 * @param options - Configuration options for the application
 * @returns An object containing the GraphQL schema
 *
 * @example
 * ```typescript
 * const baeta = createApplication({
 *   modules: [userModule, postModule],
 * });
 *
 * const { schema } = baeta;
 * ```
 */
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
