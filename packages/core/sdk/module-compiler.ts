import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode, GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Any } from '../types/any.ts';
import type { Extension } from './extension.ts';
import type { TypesResolversMap } from './module-methods.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompiler } from './type-compiler.ts';

export class ModuleCompiler<
	Context = Any,
	Info = Any,
	TypesResolvers extends TypesResolversMap<Context, Info> = Any,
> {
	readonly #name: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Middleware<Any, Any, Context, Any, Info>[];
	readonly #types: ReadonlyArray<TypeCompiler>;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #scalarResolvers: Array<[string, GraphQLScalarType]>;
	readonly #transformers: SchemaTransformer[];

	constructor(
		name: string,
		store: Map<symbol, unknown>,
		middlewares: Middleware<Any, Any, Context, Any, Info>[],
		typesMap: TypesResolvers,
		typedef: Readonly<DocumentNode>,
		defaultResolvers: Readonly<IResolvers>,
		extensions: Readonly<Extension[]>,
		transformers: SchemaTransformer[],
	) {
		this.#name = name;
		this.#store = store;
		this.#middlewares = middlewares;
		this.#typedef = typedef;
		this.#defaultResolvers = defaultResolvers;
		this.#extensions = extensions;
		this.#transformers = transformers;
		const { types, genericResolvers } = getTypeCompilersAndResolvers(typesMap);
		this.#types = types;
		this.#scalarResolvers = genericResolvers;
	}

	get name() {
		return this.#name;
	}

	get types() {
		return this.#types;
	}

	get extensions() {
		return this.#extensions;
	}

	addMiddleware(middleware: Middleware<Any, Any, Context, Any, Info>) {
		this.#middlewares.push(middleware);
	}

	useStore<T>(key: symbol) {
		const get = () => this.#store.get(key) as T | undefined;
		const set = (value: Readonly<T>) => this.#store.set(key, value);
		return { get, set };
	}

	build() {
		const resolvers: IResolvers = {
			...this.#defaultResolvers,
		};
		for (const [name, resolver] of this.#scalarResolvers) {
			resolvers[name] = resolver;
		}
		for (const compiler of this.#types) {
			resolvers[compiler.type] = compiler.build(this.#middlewares);
		}
		return { resolvers, typedef: this.#typedef, transformers: this.#transformers };
	}
}

function getTypeCompilersAndResolvers<Context, Info>(typesMap: TypesResolversMap<Context, Info>) {
	const types: TypeCompiler[] = [];
	const genericResolvers: Array<[string, GraphQLScalarType]> = [];
	for (const [typeName, typeResolver] of Object.entries(typesMap)) {
		if ('__make' in typeResolver) {
			types.push(typeResolver.__make());
		} else {
			genericResolvers.push([typeName, typeResolver]);
		}
	}
	return { types, genericResolvers };
}
