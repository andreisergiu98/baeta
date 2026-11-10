import {
	assertValidSchema,
	buildASTSchema,
	type DocumentNode,
	type GraphQLSchema,
	parse,
} from 'graphql';
import type { AppPlugin, PluginId } from '../sdk/app-plugin.ts';
import type { ModuleCompiler } from '../sdk/module-compiler.ts';
import type { ModuleCompilerFactory, TypesResolversMap } from '../sdk/module-methods.ts';
import type { RootTypes } from '../sdk/root-types.ts';
import { attachResolvers } from '../sdk/schema-resolvers.ts';
import { attachSchemaStates, type SetSchemaState } from '../sdk/schema-state.ts';
import { makeSymbol } from '../sdk/symbols.ts';

export interface Options<Context, Info> {
	/**
	 * The schema and the modules that resolve it. Pass the default export of the generated
	 * `modules/index.ts`.
	 *
	 * @example
	 * ```typescript
	 * import sources from './modules/index.ts';
	 *
	 * const baeta = createApplication({ sources });
	 * ```
	 */
	sources: {
		/**
		 * The whole schema as SDL. The generator writes it to `sdl.ts` in the types directory.
		 */
		sdl: string;
		/**
		 * The names of the schema's root types. Plugins use them before the schema is built, and
		 * `createApplication` throws if they don't match the built schema.
		 */
		roots: RootTypes;
		/**
		 * Modules that resolve the schema's fields and implement its scalars.
		 */
		modules: Array<ModuleCompilerFactory<Context, Info, TypesResolversMap<Context, Info>>>;
	};

	/**
	 * Skips validating `sources.sdl` against GraphQL's validation rules at startup. The generator
	 * already validates the schema before it writes `sdl.ts`, so this is safe for unmodified
	 * generated sources. Resolvers and scalars are still checked against the schema.
	 *
	 * @defaultValue false
	 */
	assumeValid?: boolean;

	/**
	 * Optional array of plugins to extend the functionality of the application.
	 */
	plugins?: AppPlugin<any, any>[];
}

/**
 * Creates a Baeta application from the schema and the modules that resolve it.
 *
 * @param options - Configuration options for the application
 * @returns An object containing the GraphQL schema
 *
 * @example
 * ```typescript
 * import sources from './modules/index.ts';
 *
 * const baeta = createApplication({ sources });
 *
 * const { schema } = baeta;
 * ```
 */
export function createApplication<Context, Info>(options: Options<Context, Info>) {
	const document = parseSdl(options.sources.sdl);
	const { modules, schemaStates, schemaHooks } = compileModules(
		options.sources.modules,
		document,
		options.sources.roots,
		options.plugins,
	);
	const assumeValid = options.assumeValid ?? false;
	const schema = buildSchema(document, assumeValid);
	assertRootTypes(schema, options.sources.roots);
	attachResolvers(schema, modules);
	if (!assumeValid) {
		validateSchema(schema);
	}
	attachSchemaStates(schema, schemaStates);
	for (const onSchema of schemaHooks) {
		onSchema(schema);
	}
	return {
		schema,
	};
}

function parseSdl(sdl: string) {
	try {
		return parse(sdl, { noLocation: true });
	} catch (e) {
		throw createSchemaError(e);
	}
}

function buildSchema(document: DocumentNode, assumeValid: boolean) {
	try {
		return buildASTSchema(document, { assumeValid, assumeValidSDL: assumeValid });
	} catch (e) {
		throw createSchemaError(e);
	}
}

function validateSchema(schema: GraphQLSchema) {
	try {
		assertValidSchema(schema);
	} catch (e) {
		throw createSchemaError(e);
	}
}

function assertRootTypes(schema: GraphQLSchema, roots: RootTypes) {
	const schemaRoots: Record<keyof RootTypes, string | undefined> = {
		query: schema.getQueryType()?.name,
		mutation: schema.getMutationType()?.name,
		subscription: schema.getSubscriptionType()?.name,
	};
	for (const operation of ['query', 'mutation', 'subscription'] as const) {
		if (schemaRoots[operation] !== roots[operation]) {
			throw new Error(
				`The schema's ${operation} root type is ${formatRootType(schemaRoots[operation])}, but sources.roots.${operation} is ${formatRootType(roots[operation])}. Pass the roots generated with the schema.`,
			);
		}
	}
}

function formatRootType(type: string | undefined) {
	return type == null ? 'not set' : `"${type}"`;
}

function createSchemaError(cause: unknown) {
	return new Error(
		`Couldn't build schema! Reason: ${cause instanceof Error ? cause.message : cause}`,
		{ cause },
	);
}

function compileModules<Context, Info>(
	modules: Array<ModuleCompilerFactory<Context, Info, TypesResolversMap<Context, Info>>>,
	document: DocumentNode,
	roots: RootTypes,
	plugins: AppPlugin<any, any>[] = [],
) {
	if (modules.length === 0) {
		throw new Error('Cannot create schema without modules.');
	}
	const moduleCompilers = modules.map((module) => module[makeSymbol]());
	const registeredPluginIds = new Set<PluginId>();
	const schemaStates: SetSchemaState[] = [];
	const schemaHooks: Array<(schema: GraphQLSchema) => void> = [];
	for (const plugin of plugins) {
		registeredPluginIds.add(plugin.id);
		const result = plugin.mutate(moduleCompilers as ModuleCompiler[], { document, roots });
		if (result?.schemaState) {
			schemaStates.push(result.schemaState);
		}
		if (result?.onSchema) {
			schemaHooks.push(result.onSchema);
		}
	}
	const builtModules = moduleCompilers.map((module) => module.build());
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
		modules: builtModules,
		schemaStates,
		schemaHooks,
	};
}
