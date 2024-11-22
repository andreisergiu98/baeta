import type { GetFieldSettings } from './field-settings.ts';

declare global {
	export namespace BaetaExtensions {
		export interface ResolverExtensions<Result, Root, Context, Args> {
			$complexity: (fn: GetFieldSettings<Context, Args>) => void;
		}

		export interface TypeExtensions<Root, Context> {
			$complexity: (fn: GetFieldSettings<Context, unknown>) => void;
		}

		export interface SubscriptionExtensions<Root, Context, Args> {
			$complexity: (fn: GetFieldSettings<Context, Args>) => void;
		}
	}
}
