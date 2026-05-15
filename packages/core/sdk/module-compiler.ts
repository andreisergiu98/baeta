import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode, GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { PluginId } from './app-plugin.ts';
import type { TypesResolversMap } from './module-methods.ts';
import { makeSymbol } from './symbols.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompiler } from './type-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export interface ModuleCompilerOptions<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	name: string;
	metadata: Map<symbol, unknown>;
	middlewares: Middleware<unknown, unknown, Context, unknown, Info>[];
	typesMap: TypesResolvers;
	typedef: Readonly<DocumentNode>;
	defaultResolvers: Readonly<IResolvers>;
	transformers: Array<SchemaTransformer>;
	requiredPluginIds: Set<PluginId>;
}

export class ModuleCompiler<
	Context = unknown,
	Info = unknown,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	readonly kind = 'Module';
	readonly #name: string;
	readonly #metadata: Map<symbol, unknown>;
	readonly #middlewares: Middleware<unknown, unknown, Context, unknown, Info>[];
	readonly #types: ReadonlyArray<
		TypeCompiler<unknown, Context, Info, FieldsResolversMap<unknown, Context, Info>>
	>;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #scalarResolvers: Array<[string, GraphQLScalarType]>;
	readonly #transformers: SchemaTransformer[];
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: ModuleCompilerOptions<Context, Info, TypesResolvers>) {
		this.#name = options.name;
		this.#metadata = new Map(options.metadata);
		this.#middlewares = [...options.middlewares];
		this.#typedef = options.typedef;
		this.#defaultResolvers = options.defaultResolvers;
		this.#transformers = [...options.transformers];
		const { types, genericResolvers } = getTypeCompilersAndResolvers(options.typesMap);
		this.#types = types;
		this.#scalarResolvers = genericResolvers;
		this.#requiredPluginIds = options.requiredPluginIds;
	}

	get name() {
		return this.#name;
	}

	get types() {
		return this.#types;
	}

	addMiddleware(middleware: Middleware<unknown, unknown, Context, unknown, Info>) {
		this.#middlewares.push(middleware);
	}

	useMetadata<T>(key: symbol) {
		const get = () => this.#metadata.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#metadata.set(key, value);
		return { get, set };
	}

	build() {
		const resolvers: IResolvers = {
			...this.#defaultResolvers,
		};
		const allRequiredPluginIds = new Set(this.#requiredPluginIds);
		for (const [name, resolver] of this.#scalarResolvers) {
			resolvers[name] = resolver;
		}
		for (const compiler of this.#types) {
			const built = compiler.build(this.#middlewares);
			resolvers[compiler.type] = built.resolvers;
			built.requiredPluginIds.forEach((id) => allRequiredPluginIds.add(id));
		}
		return {
			resolvers,
			typedef: this.#typedef,
			transformers: this.#transformers,
			requiredPluginIds: allRequiredPluginIds,
		};
	}
}

function getTypeCompilersAndResolvers<Context, Info>(typesMap: TypesResolversMap<Context, Info>) {
	const types: Array<
		TypeCompiler<unknown, Context, Info, FieldsResolversMap<unknown, Context, Info>>
	> = [];
	const genericResolvers: Array<[string, GraphQLScalarType]> = [];
	for (const [typeName, typeResolver] of Object.entries(typesMap)) {
		if (makeSymbol in typeResolver) {
			types.push(typeResolver[makeSymbol]());
		} else {
			genericResolvers.push([typeName, typeResolver]);
		}
	}
	return { types, genericResolvers };
}
