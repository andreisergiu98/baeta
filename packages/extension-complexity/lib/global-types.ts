/** biome-ignore-all lint/correctness/noUnusedVariables: arguments used for inference */
import type { FieldBuilder, SubscriptionBuilder, TypeBuilder } from '@baeta/core/sdk';
import type { GetFieldSettings } from './field-settings.ts';

declare global {
	export namespace BaetaExtensions {
		export interface FieldExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			ModuleName extends string,
			TypeName extends string,
			FieldName extends string,
		> {
			/**
			 * Configures complexity calculation for a type field.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * Query.users.$complexity((_, args) => ({
			 *   complexity: 1,
			 *   multiplier: args.limit || 10
			 * })).resolve(...);
			 *
			 * // Disable complexity calculation
			 * Query.simple.$complexity(() => false);
			 * ```
			 */
			$complexity: (
				fn: GetFieldSettings<Context, Args>,
			) => ReturnType<
				FieldBuilder<
					Result,
					Source,
					Context,
					Args,
					Info,
					ModuleName,
					TypeName,
					FieldName
				>['toMethods']
			>;
		}

		export interface TypeExtensions<
			Source,
			Context,
			Info,
			ModuleName extends string,
			TypeName extends string,
		> {
			/**
			 * Configures complexity calculation for a type field.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * Query.users.$complexity((_, args) => ({
			 *   complexity: 1,
			 *   multiplier: args.limit || 10
			 * })).resolve(...);
			 *
			 * // Disable complexity calculation
			 * Query.simple.$complexity(() => false);
			 * ```
			 */
			$complexity: (
				fn: GetFieldSettings<Context, unknown>,
			) => ReturnType<TypeBuilder<Source, Context, Info, ModuleName, TypeName>['toMethods']>;
		}

		export interface SubscriptionExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			ModuleName extends string,
			FieldName extends string,
		> {
			/**
			 * Configures complexity calculation for a type field.
			 *
			 * @param fn - Function to determine complexity settings
			 *
			 * @example
			 * ```typescript
			 * Query.users.$complexity((_, args) => ({
			 *   complexity: 1,
			 *   multiplier: args.limit || 10
			 * })).resolve(...);
			 *
			 * // Disable complexity calculation
			 * Query.simple.$complexity(() => false);
			 * ```
			 */
			$complexity: (
				fn: GetFieldSettings<Context, Args>,
			) => ReturnType<
				SubscriptionBuilder<Result, Source, Context, Args, Info, ModuleName, FieldName>['toMethods']
			>;
		}
	}
}
