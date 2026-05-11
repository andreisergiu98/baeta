import { type IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import type { AppPlugin, PluginId } from '../sdk/app-plugin.ts';
import {
	type ModuleCompiler,
	type ModuleCompilerFactory,
	type TypesResolversMap,
	transformSchema,
} from '../sdk/index.ts';
import { addValidationToSchema } from './input-directive/input-schema.ts';

export type ExecutableSchemaOptions = Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;

export interface BuildSchemaOptions {
	typeDefs: IExecutableSchemaDefinition['typeDefs'];
	resolvers: IExecutableSchemaDefinition['resolvers'];
	options?: ExecutableSchemaOptions;
}

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
	 * Optional array of plugins to extend the functionality of the application.
	 */
	plugins?: AppPlugin[];

	/**
	 * Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema
	 */
	executableSchemaOptions?: ExecutableSchemaOptions;

	/**
	 * Optional function to build the GraphQL schema. If not provided, the default implementation using makeExecutableSchema will be used.
	 * This allows you to customize the schema building process, for example by using a different library or applying additional transformations.
	 * @param options - An object containing the type definitions and resolvers to build the schema from.
	 * @returns The built GraphQL schema.
	 */
	buildSchema?: (options: BuildSchemaOptions) => GraphQLSchema;
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
	const { typeDefs, resolvers, transformers } = compileModules(options.modules, options.plugins);
	const buildSchemaFn = options.buildSchema ?? buildSchema;
	let schema = buildSchemaFn({ typeDefs, resolvers, options: options.executableSchemaOptions });
	schema = transformSchema(schema, transformers);
	schema = addValidationToSchema(schema);
	return {
		schema,
	};
}

function buildSchema(options: BuildSchemaOptions) {
	try {
		return makeExecutableSchema({
			...options.options,
			typeDefs: options.typeDefs,
			resolvers: options.resolvers,
		});
	} catch (e) {
		throw new Error(`Couldn't build schema! Reason: ${e instanceof Error ? e.message : e}`, {
			cause: e,
		});
	}
}

function compileModules<Context, Info>(
	modules: Array<ModuleCompilerFactory<Context, Info, TypesResolversMap<Context, Info>>>,
	plugins: AppPlugin[] = [],
) {
	if (modules.length === 0) {
		throw new Error('Cannot create schema without modules.');
	}
	const moduleCompilers = modules.map((module) => module.__make());
	const registeredPluginIds = new Set<PluginId>();
	for (const plugin of plugins) {
		registeredPluginIds.add(plugin.id);
		plugin.mutate(moduleCompilers as ModuleCompiler[]);
	}
	const builtModules = moduleCompilers.map((module) => module.build());
	const typeDefs = builtModules.map((m) => m.typedef);
	const resolvers = builtModules.map((m) => m.resolvers);
	const transformers = builtModules.flatMap((m) => m.transformers);

	for (const module of builtModules) {
		for (const pluginId of module.requiredPluginIds) {
			if (!registeredPluginIds.has(pluginId)) {
				throw new Error(
					`Modules are using the plugin ${pluginId.name}, but it is not registered in the application.`,
					{
						cause: pluginId.definedIn,
					},
				);
			}
		}
	}

	return {
		typeDefs,
		resolvers,
		transformers,
	};
}
