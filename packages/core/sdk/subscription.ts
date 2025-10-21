import type { Extension } from './extension.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';

export function createSubscriptionBuilder<Result, Source, Context, Args, Info>(
	field: string,
	extensions: Array<Extension>,
) {
	return new SubscriptionBuilder<Result, Source, Context, Args, Info>(
		field,
		extensions,
		new Map(),
		[],
	).toMethods();
}
