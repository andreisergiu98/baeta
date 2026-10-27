import {
	type BuilderContext,
	BuilderEditor,
	type CreateBuilderContextOptions,
	createBuilderContext,
} from './builder-context.ts';
import type { SchemaTransformer } from './transformer.ts';

export interface CreateModuleBuilderContextOptions<
	Context,
	Info,
> extends CreateBuilderContextOptions<unknown, unknown, Context, unknown, Info> {
	transformers: Array<SchemaTransformer>;
}

export interface ModuleBuilderContext<Context, Info> extends BuilderContext<
	unknown,
	unknown,
	Context,
	unknown,
	Info
> {
	transformers: ReadonlyArray<SchemaTransformer>;
}

export function createModuleBuilderContext<Context, Info>(
	options: CreateModuleBuilderContextOptions<Context, Info>,
): ModuleBuilderContext<Context, Info> {
	return {
		...createBuilderContext(options),
		transformers: [...options.transformers],
	};
}

export class ModuleBuilderEditor<
	Context,
	Info,
	Methods,
	Builder extends { toMethods: () => Methods },
> extends BuilderEditor<unknown, unknown, Context, unknown, Info, Methods, Builder> {
	#draftTransformers: Array<SchemaTransformer>;

	constructor(
		context: ModuleBuilderContext<Context, Info>,
		commit: (context: ModuleBuilderContext<Context, Info>) => Builder,
	) {
		const draftTransformers = [...context.transformers];
		super(context, (nextContext) => {
			return commit({ ...nextContext, transformers: [...draftTransformers] });
		});
		this.#draftTransformers = draftTransformers;
	}

	addTransformer(transformer: SchemaTransformer | SchemaTransformer[]) {
		if (Array.isArray(transformer)) {
			this.#draftTransformers.push(...transformer);
		} else {
			this.#draftTransformers.push(transformer);
		}
		return this;
	}
}
