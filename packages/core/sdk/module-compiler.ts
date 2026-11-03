import type { GraphQLScalarType } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';
import type { PluginId } from './app-plugin.ts';
import type { BuilderContext } from './builder-context.ts';
import type { TypesResolversMap } from './module-methods.ts';
import { assertResolversMap } from './resolvers-map.ts';
import { makeSymbol } from './symbols.ts';
import type { FieldResolverRecord, TypeCompiler } from './type-compiler.ts';
import type { FieldsResolversMap } from './type-methods.ts';

export interface ModuleCompilerOptions<
	Context,
	Info,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	name: string;
	typeNames: readonly string[];
	context: BuilderContext<unknown, unknown, Context, unknown, Info>;
	typesMap: TypesResolvers;
}

export interface ScalarRecord {
	type: string;
	scalar: GraphQLScalarType;
}

export class ModuleCompiler<
	Context = unknown,
	Info = unknown,
	TypesResolvers extends TypesResolversMap<Context, Info> = TypesResolversMap<Context, Info>,
> {
	readonly kind = 'Module';
	readonly #name: string;
	readonly #state: ReadonlyMap<symbol, unknown>;
	readonly #middlewares: Middleware<unknown, unknown, Context, unknown, Info>[];
	readonly #types: ReadonlyArray<
		TypeCompiler<unknown, Context, Info, FieldsResolversMap<unknown, Context, Info>>
	>;
	readonly #scalars: ReadonlyArray<ScalarRecord>;
	readonly #requiredPluginIds: ReadonlySet<PluginId>;

	constructor(options: ModuleCompilerOptions<Context, Info, TypesResolvers>) {
		this.#name = options.name;
		this.#state = new Map(options.context.state);
		this.#middlewares = [...options.context.middlewares];
		const { types, scalars } = getTypeCompilersAndScalars(options.typesMap);
		assertResolversMap(
			`$schema for module "${options.name}"`,
			options.typeNames,
			types.map(([key, compiler]) => ({ key, expected: key, actual: compiler.type })),
		);
		this.#types = types.map(([, compiler]) => compiler);
		this.#scalars = scalars;
		this.#requiredPluginIds = new Set(options.context.requiredPluginIds);
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

	hasPluginState(pluginId: PluginId) {
		return this.#state.has(pluginId.key);
	}

	getPluginState<T>(pluginId: PluginId<T>): Readonly<T> | undefined {
		return this.#state.get(pluginId.key) as Readonly<T> | undefined;
	}

	build() {
		const fields: FieldResolverRecord[] = [];
		const requiredPluginIds = new Set(this.#requiredPluginIds);
		for (const compiler of this.#types) {
			const built = compiler.build(this.#middlewares);
			built.requiredPluginIds.forEach((id) => requiredPluginIds.add(id));
			for (const record of built.fields) {
				fields.push(record);
			}
		}
		return {
			name: this.#name,
			fields,
			scalars: this.#scalars,
			requiredPluginIds,
		};
	}
}

function getTypeCompilersAndScalars<Context, Info>(typesMap: TypesResolversMap<Context, Info>) {
	const types: Array<
		[string, TypeCompiler<unknown, Context, Info, FieldsResolversMap<unknown, Context, Info>>]
	> = [];
	const scalars: ScalarRecord[] = [];
	for (const [typeName, typeResolver] of Object.entries(typesMap)) {
		if (makeSymbol in typeResolver) {
			types.push([typeName, typeResolver[makeSymbol]()]);
		} else {
			scalars.push({ type: typeName, scalar: typeResolver });
		}
	}
	return { types, scalars };
}
