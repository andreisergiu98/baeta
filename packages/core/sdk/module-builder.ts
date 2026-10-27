import type { IResolvers } from '@graphql-tools/utils';
import type { DocumentNode } from 'graphql';
import { type ModuleBuilderContext, ModuleBuilderEditor } from './module-builder-context.ts';
import { ModuleCompiler } from './module-compiler.ts';
import type { ModuleMethods, TypesBuildersMap, TypesResolversMap } from './module-methods.ts';
import { makeSymbol } from './symbols.ts';

export interface ModuleBuilderOptions<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
> {
	name: string;
	typedef: Readonly<DocumentNode>;
	typeBuilders: Readonly<TypesBuilders>;
	defaultResolvers: Readonly<IResolvers>;
	context: ModuleBuilderContext<Context, Info>;
}

export class ModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
	TypesResolvers extends TypesResolversMap<Context, Info> = any,
> {
	readonly #name: string;
	readonly #typedef: Readonly<DocumentNode>;
	readonly #typeBuilders: Readonly<TypesBuilders>;
	readonly #defaultResolvers: Readonly<IResolvers>;
	readonly #context: ModuleBuilderContext<Context, Info>;

	constructor(options: ModuleBuilderOptions<Context, Info, TypesBuilders>) {
		this.#name = options.name;
		this.#typedef = options.typedef;
		this.#typeBuilders = options.typeBuilders;
		this.#defaultResolvers = options.defaultResolvers;
		this.#context = options.context;
	}

	get name() {
		return this.#name;
	}

	edit() {
		return new ModuleBuilderEditor(this.#context, (nextContext) => {
			return new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
				name: this.#name,
				typedef: this.#typedef,
				typeBuilders: this.#typeBuilders,
				defaultResolvers: this.#defaultResolvers,
				context: nextContext,
			});
		});
	}

	toMethods(): ModuleMethods<Context, Info, TypesBuilders, TypesResolvers> {
		return {
			...this.#typeBuilders,
			$schema: (types: TypesResolvers) => ({
				[makeSymbol]: () =>
					new ModuleCompiler<Context, Info, TypesResolvers>({
						name: this.#name,
						typeNames: Object.keys(this.#typeBuilders),
						context: this.#context,
						typesMap: types,
						typedef: this.#typedef,
						defaultResolvers: this.#defaultResolvers,
					}),
			}),
			$use: (input) => {
				return this.edit()
					.use(input, `${this.#name}.use`, {
						kind: 'module',
					})
					.commitToMethods();
			},
			$directive: (transformer) => {
				return this.edit().addTransformer(transformer).commitToMethods();
			},
		};
	}
}
