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
		export interface ResolverExtensions<Result, Root, Context, Args> {
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
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Root, Context, Args>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
			) => void;

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
					Root,
					Context,
					Args
				>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
			) => void;
		}

		/**
		 * Authorization methods that apply to all fields of a GraphQL type.
		 */
		export interface TypeExtensions<Root, Context> {
			/**
			 * Checks authorization before field resolution.
			 * Applied to all fields of the type.
			 */
			$auth: (
				scopes:
					| ScopeRules<AuthExtension.Scopes, AuthExtension.Grants>
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Root, Context, unknown>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, unknown, Root, Context, unknown>,
			) => void;

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
					Root,
					Context,
					unknown
				>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, unknown, Root, Context, unknown>,
			) => void;
		}

		/**
		 * Authorization methods for subscription subscribe phase.
		 */
		export interface SubscriptionSubscribeExtensions<Root, Context, Args> {
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
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Root, Context, Args>,
				options?: AuthMiddlewareSubscribeOptions,
			) => void;
		}

		/**
		 * Authorization methods for subscription resolve phase.
		 */
		export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {
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
					| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Root, Context, Args>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
			) => void;
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
					Root,
					Context,
					Args
				>,
				options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
			) => void;
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

export type { AuthExtension, BaetaExtensions as AuthExtensionMethods };
