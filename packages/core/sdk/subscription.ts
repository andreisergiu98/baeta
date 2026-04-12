import type { Extension } from './extension.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';

export function createSubscriptionBuilder<
	Result,
	Source,
	Context,
	Args,
	Info,
	ModuleName extends string,
	FieldName extends string,
>(module: ModuleName, field: FieldName, extensions: Array<Extension>) {
	return new SubscriptionBuilder<Result, Source, Context, Args, Info, ModuleName, FieldName>({
		module,
		field,
		extensions,
		store: new Map(),
		middlewares: [],
	}).toMethods();
}
