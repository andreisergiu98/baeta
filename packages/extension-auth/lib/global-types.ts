import type { FieldBuilder, SubscriptionBuilder, TypeBuilder } from '@baeta/core/sdk';
import type {
	AuthMiddlewareOptions,
	AuthMiddlewareSubscribeOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './auth-middlewares.ts';
import type { ScopeRules } from './scope-rules.ts';

declare global {
	export namespace BaetaExtensions {
		/**
		 * Authorization methods on resolvers.
		 */
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
			 * Checks authorization before resolver execution.
			 * Use this when authorization can be determined without the resolver's result.
			 *
			 * @param scopes - Authorization rules to check
			 * @param options - Additional authorization options
			 *
			 * @example
			 * ```typescript
			 * Query.users.$auth({
			 *   isLoggedIn: true,
			 *   hasRole: 'admin'
			 * });
			 * ```
			 */
			$auth: (
				scopes:
					| ScopeRules<AuthExtension.Scopes, AuthExtension.Grants>
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Source, Context, Args, Info>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Source, Context, Args, Info>,
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

			/**
			 * Checks authorization after resolver execution.
			 * Use this when authorization depends on the resolver's result,
			 * avoiding unnecessary database queries.
			 *
			 * @param getScopes - Function that uses resolver result to determine authorization
			 * @param options - Additional authorization options
			 *
			 * @example
			 * ```typescript
			 * Query.user.$postAuth((params, user) => {
			 *   // Check if user is accessing their own data
			 *   if (user.id === params.ctx.userId) return true;
			 *   return { hasRole: 'admin' };
			 * });
			 * ```
			 */
			$postAuth: (
				getScopes: GetPostScopeRules<
					AuthExtension.Scopes,
					AuthExtension.Grants,
					Result,
					Source,
					Context,
					Args,
					Info
				>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Source, Context, Args, Info>,
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

		/**
		 * Authorization methods that apply to all fields of a GraphQL type.
		 */
		export interface TypeExtensions<
			Source,
			Context,
			Info,
			ModuleName extends string,
			TypeName extends string,
		> {
			/**
			 * Checks authorization before field resolution.
			 * Applied to all fields of the type.
			 */
			$auth: (
				scopes:
					| ScopeRules<AuthExtension.Scopes, AuthExtension.Grants>
					| GetScopeRules<
							AuthExtension.Scopes,
							AuthExtension.Grants,
							Source,
							Context,
							unknown,
							Info
					  >,
				options?: AuthMiddlewareOptions<
					AuthExtension.Grants,
					unknown,
					Source,
					Context,
					unknown,
					Info
				>,
			) => ReturnType<TypeBuilder<Source, Context, Info, ModuleName, TypeName>['toMethods']>;

			/**
			 * Checks authorization after field resolution.
			 * Applied to all fields of the type.
			 * Useful when authorization depends on resolved field values.
			 */
			$postAuth: (
				getScopes: GetPostScopeRules<
					AuthExtension.Scopes,
					AuthExtension.Grants,
					unknown,
					Source,
					Context,
					unknown,
					Info
				>,
				options?: AuthMiddlewareOptions<
					AuthExtension.Grants,
					unknown,
					Source,
					Context,
					unknown,
					Info
				>,
			) => ReturnType<TypeBuilder<Source, Context, Info, ModuleName, TypeName>['toMethods']>;
		}

		/**
		 * Authorization methods for subscribe phase.
		 */
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
			 * Checks authorization for both subscribe and resolve phases.
			 *
			 * @param scopes - Authorization rules to check
			 * @param options - Additional authorization options
			 *
			 * @example
			 * ```typescript
			 * Subscription.userUpdated.subscribe.$auth({
			 *   isLoggedIn: true,
			 *   hasRole: 'admin'
			 * });
			 * ```
			 */
			$auth: (
				scopes:
					| ScopeRules<AuthExtension.Scopes, AuthExtension.Grants>
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Source, Context, Args, Info>,
				options?: AuthMiddlewareSubscribeOptions,
			) => ReturnType<
				SubscriptionBuilder<Result, Source, Context, Args, Info, ModuleName, FieldName>['toMethods']
			>;
		}
	}

	/**
	 * Define the scopes available in your application.
	 */
	export namespace AuthExtension {
		/** The scopes available in your application. */
		export interface Scopes {}
		/** The grants available in your application. */
		export interface GrantsMap {}
		export type Grants = keyof GrantsMap;
	}
}
