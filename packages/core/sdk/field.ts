import { createBuilderContext } from './builder-context.ts';
import { FieldBuilder } from './field-builder.ts';

export function createFieldBuilder<
	Result,
	Source,
	Context,
	Args,
	Info,
	Type extends string = string,
	Name extends string = string,
>(type: Type, field: Name) {
	return new FieldBuilder<Result, Source, Context, Args, Info, Type, Name>({
		type,
		field,
		context: createBuilderContext({
			state: new Map(),
			middlewares: [],
			requiredPluginIds: new Set(),
		}),
	}).toMethods();
}
