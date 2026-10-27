import { createBuilderContext } from './builder-context.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';

export function createSubscriptionBuilder<Result, Source, Context, Args, Info>(field: string) {
	return new SubscriptionBuilder<Result, Source, Context, Args, Info>({
		field,
		context: createBuilderContext({
			state: new Map(),
			middlewares: [],
			requiredPluginIds: new Set(),
		}),
	}).toMethods();
}
