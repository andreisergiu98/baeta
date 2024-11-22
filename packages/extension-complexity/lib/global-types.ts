import type { GetComplexity } from './complexity-extension.ts';

declare global {
	export namespace BaetaExtensions {
		export interface ResolverExtensions<Result, Root, Context, Args> {
			$complexity: (fn: GetComplexity<Root, Context, Args>) => void;
		}

		export interface TypeExtensions<Root, Context> {
			$complexity: (fn: GetComplexity<Root, Context, unknown>) => void;
		}

		export interface SubscriptionExtensions<Root, Context, Args> {
			$complexity: (fn: GetComplexity<Root, Context, Args>) => void;
		}
	}
}
