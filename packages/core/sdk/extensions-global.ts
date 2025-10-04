/** biome-ignore-all lint/correctness/noUnusedVariables: parameters need to be defined */
import type { FieldBuilder } from './field-builder.ts';
import type { ModuleBuilder } from './module-builder.ts';
import type { SubscriptionBuilder } from './subscription-builder.ts';
import type { TypeBuilder } from './type-builder.ts';

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {}

		export interface FieldExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			Builder extends FieldBuilder<Result, Source, Context, Args, Info>,
		> {}

		export interface TypeExtensions<
			Source,
			Context,
			Info,
			Builder extends TypeBuilder<Source, Context, Info>,
		> {}

		export interface ModuleExtensions<
			Context,
			Info,
			Builder extends ModuleBuilder<Context, Info>,
		> {}

		export interface SubscriptionExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			Builder extends SubscriptionBuilder<Result, Source, Context, Args, Info>,
		> {}
	}
}

export type { BaetaExtensions };
