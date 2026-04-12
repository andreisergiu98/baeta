import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode, GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { Extension } from './extension.ts';
import type { TypesResolversMap } from './module-methods.ts';
import type { SchemaTransformer } from './transformer.ts';
import type { TypeCompiler } from './type-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export interface ModuleCompilerOptions<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	name: string;
	store: Map<symbol, unknown>;
	middlewares: Middleware<unknown, unknown, Context, unknown, Info>[];
	typesMap: TypesResolvers;
	typedef: Readonly<DocumentNode>;
	defaultResolvers: Readonly<IResolvers>;
	extensions: ReadonlyArray<Extension>;
	transformers: Array<SchemaTransformer>;
}

export class ModuleCompiler<
	Context = unknown,
	Info = unknown,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	readonly #name: string;
	readonly #store: Map<symbol, unknown>;
	readonly #middlewares: Middleware<unknown, unknown, Context, unknown, Info>[];
	readonly #types: ReadonlyArray<
		TypeCompiler<unknown, Context, Info, string, FieldsResolversMap<unknown, Context, Info>>
	>;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #extensions: ReadonlyArray<Extension>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #scalarResolvers: Array<[string, GraphQLScalarType]>;
	readonly #transformers: SchemaTransformer[];
	readonly #typesMap: TypesResolvers;

	constructor(options: ModuleCompilerOptions<Context, Info, TypesResolvers>) {
		this.#name = options.name;
		this.#store = new Map(options.store);
		this.#middlewares = [...options.middlewares];
		this.#typedef = options.typedef;
		this.#defaultResolvers = options.defaultResolvers;
		this.#extensions = options.extensions;
		this.#transformers = [...options.transformers];
		this.#typesMap = options.typesMap;
		const { types, genericResolvers } = getTypeCompilersAndResolvers(options.typesMap);
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

	addMiddleware(middleware: Middleware<unknown, unknown, Context, unknown, Info>) {
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
	const types: Array<
		TypeCompiler<unknown, Context, Info, string, FieldsResolversMap<unknown, Context, Info>>
	> = [];
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
