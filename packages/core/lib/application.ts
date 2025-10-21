import { type IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import { pruneSchema } from '@graphql-tools/utils';
import {
	type ModuleCompilerFactory,
	type TypesResolversMap,
	transformSchema,
} from '../sdk/index.ts';
import { addValidationToSchema } from './input-directive/input-schema.ts';

export type ExecutableSchemaOptions = Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;

export interface Options<Context, Info> {
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
	modules: Array<ModuleCompilerFactory<Context, Info, TypesResolversMap<Context, Info>>>;

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
export function createApplication<Context, Info>(options: Options<Context, Info>) {
	if (options.modules.length === 0) {
		throw new Error('Cannot create schema without modules.');
	}
	const moduleCompilers = options.modules.map((module) => module.__make());
	// extensions are the same for all modules
	const extensions = moduleCompilers[0].extensions;
	extensions.forEach((ext) => {
		ext.mutate(moduleCompilers);
	});
	const builtModules = moduleCompilers.map((module) => module.build());
	const typeDefs = builtModules.map((m) => m.typedef);
	const resolvers = builtModules.map((m) => m.resolvers);
	const transformers = builtModules.flatMap((m) => m.transformers);
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
