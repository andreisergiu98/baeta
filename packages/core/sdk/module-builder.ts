import { type BuilderContext, BuilderEditor } from './builder-context.ts';
import { ModuleCompiler } from './module-compiler.ts';
import type { ModuleMethods, TypesBuildersMap, TypesResolversMap } from './module-methods.ts';
import { makeSymbol } from './symbols.ts';

export interface ModuleBuilderOptions<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
> {
	name: string;
	typeBuilders: Readonly<TypesBuilders>;
	context: BuilderContext<unknown, unknown, Context, unknown, Info>;
}

export class ModuleBuilder<
	Context,
	Info,
	TypesBuilders extends TypesBuildersMap<Context, Info> = any,
	TypesResolvers extends TypesResolversMap<Context, Info> = any,
> {
	readonly #name: string;
	readonly #typeBuilders: Readonly<TypesBuilders>;
	readonly #context: BuilderContext<unknown, unknown, Context, unknown, Info>;

	constructor(options: ModuleBuilderOptions<Context, Info, TypesBuilders>) {
		this.#name = options.name;
		this.#typeBuilders = options.typeBuilders;
		this.#context = options.context;
	}

	get name() {
		return this.#name;
	}

	edit() {
		return new BuilderEditor(this.#context, (nextContext) => {
			return new ModuleBuilder<Context, Info, TypesBuilders, TypesResolvers>({
				name: this.#name,
				typeBuilders: this.#typeBuilders,
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
					}),
			}),
			$use: (input) => {
				return this.edit()
					.use(input, `${this.#name}.use`, {
						kind: 'module',
					})
					.commitToMethods();
			},
		};
	}
}
