import { type BuilderContext, BuilderEditor, createBuilderContext } from './builder-context.ts';
import type { SchemaTransformer } from './transformer.ts';

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
	context: ModuleBuilderContext<Context, Info>,
): ModuleBuilderContext<Context, Info> {
	return {
		...createBuilderContext(context),
		transformers: [...context.transformers],
	};
}

export function createEmptyModuleBuilderContext<Context, Info>(): ModuleBuilderContext<
	Context,
	Info
> {
	return {
		state: new Map(),
		middlewares: [],
		requiredPluginIds: new Set(),
		transformers: [],
	};
}

export class ModuleBuilderEditor<
	Context,
	Info,
	Builder extends { toMethods: () => Methods },
	Methods = ReturnType<Builder['toMethods']>,
> extends BuilderEditor<unknown, unknown, Context, unknown, Info, Builder, Methods> {
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
