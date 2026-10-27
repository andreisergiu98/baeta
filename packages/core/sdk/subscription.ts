import { createEmptyBuilderContext } from './builder-context.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';

export function createSubscriptionBuilder<
	Result,
	Source,
	Context,
	Args,
	Info,
	Name extends string = string,
>(field: Name) {
	return new SubscriptionBuilder<Result, Source, Context, Args, Info, Name>({
		field,
		context: createEmptyBuilderContext(),
	}).toMethods();
}
