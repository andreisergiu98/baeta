import { BuilderEditor, type BuilderContext } from './builder-context.ts';
import { makeSymbol } from './symbols.ts';
import { TypeCompiler } from './type-compiler.ts';
import type { FieldsBuildersMap, FieldsResolversMap, TypeMethods } from './type-methods.ts';

export interface TypeBuilderOptions<
	Source,
	Context,
	Info,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
> {
	type: string;
	fieldBuilders: Readonly<FieldsBuilders>;
	context: BuilderContext<unknown, Source, Context, unknown, Info>;
}

export class TypeBuilder<
	Source,
	Context,
	Info,
	FieldsBuilders extends FieldsBuildersMap<Source, Context, Info> = any,
	FieldsResolvers extends FieldsResolversMap<Source, Context, Info> = any,
> {
	readonly #type: string;
	readonly #fieldBuilders: Readonly<FieldsBuilders>;
	readonly #context: BuilderContext<unknown, Source, Context, unknown, Info>;

	constructor(options: TypeBuilderOptions<Source, Context, Info, FieldsBuilders>) {
		this.#type = options.type;
		this.#fieldBuilders = options.fieldBuilders;
		this.#context = options.context;
	}

	get type() {
		return this.#type;
	}

	edit() {
		return new BuilderEditor(this.#context, (nextContext) => {
			return new TypeBuilder<Source, Context, Info, FieldsBuilders, FieldsResolvers>({
				type: this.#type,
				fieldBuilders: this.#fieldBuilders,
				context: nextContext,
			});
		});
	}

	toMethods(): TypeMethods<Source, Context, Info, FieldsBuilders, FieldsResolvers> {
		return {
			...this.#fieldBuilders,
			$fields: (fields: FieldsResolvers) => ({
				[makeSymbol]: () =>
					new TypeCompiler({
						type: this.#type,
						fieldNames: Object.keys(this.#fieldBuilders),
						context: this.#context,
						fieldsMap: fields,
					}),
			}),
			$use: (input) => {
				return this.edit()
					.use(input, `${this.#type}.use`, {
						kind: 'type',
						type: this.#type,
					})
					.commitToMethods();
			},
		};
	}
}
