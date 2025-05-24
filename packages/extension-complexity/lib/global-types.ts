/** biome-ignore-all lint/correctness/noUnusedVariables: arguments used for inference */
import type { GetFieldSettings } from './field-settings.ts';

declare global {
	export namespace BaetaExtensions {
		export interface ResolverExtensions<Result, Root, Context, Args> {
			/**
			 * Configures complexity calculation for a type field.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * Query.users.$complexity(({ args }) => ({
			 *   complexity: 1,
			 *   multiplier: args.limit || 10
			 * }));
			 *
			 * // Disable complexity calculation
			 * Query.simple.$complexity(() => false);
			 * ```
			 */
			$complexity: (fn: GetFieldSettings<Context, Args>) => void;
		}

		export interface TypeExtensions<Root, Context> {
			/**
			 * Configures complexity calculation for all fields of a type.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * User.$complexity(() => ({
			 *   complexity: 2, // Higher base complexity for all User fields
			 *   multiplier: 5
			 * }));
			 * ```
			 */
			$complexity: (fn: GetFieldSettings<Context, unknown>) => void;
		}

		export interface SubscriptionExtensions<Root, Context, Args> {
			/**
			 * Configures complexity calculation for subscription fields.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * Subscription.userUpdates.$complexity(({ args }) => ({
			 *   complexity: 5,
			 *   multiplier: args.batchSize || 1
			 * }));
			 * ```
			 */
			$complexity: (fn: GetFieldSettings<Context, Args>) => void;
		}
	}
}

export type { BaetaExtensions as ComplexityExtensionMethods };
