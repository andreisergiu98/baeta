import type {
	AuthMethodOptions,
	AuthMethodSubscribeOptions,
	GetPostScopeRules,
	GetScopeRules,
} from './auth-extension.ts';
import type { ScopeRules } from './scope-rules.ts';

declare global {
	export namespace BaetaExtensions {
		export interface ResolverExtensions<Result, Root, Context, Args> {
			$auth: (
				scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
				options?: AuthMethodOptions<Result, Root, Context, Args>,
			) => void;
			$postAuth: (
				getScopes: GetPostScopeRules<Result, Root, Context, Args>,
				options?: AuthMethodOptions<Result, Root, Context, Args>,
			) => void;
		}

		export interface TypeExtensions<Root, Context> {
			$auth: (
				scopes: ScopeRules | GetScopeRules<Root, Context, unknown>,
				options?: AuthMethodOptions<unknown, Root, Context, unknown>,
			) => void;
			$postAuth: (
				getScopes: GetPostScopeRules<unknown, Root, Context, unknown>,
				options?: AuthMethodOptions<unknown, Root, Context, unknown>,
			) => void;
		}

		export interface SubscriptionExtensions<Root, Context, Args> {
			$auth: (
				scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
				options?: AuthMethodOptions<unknown, Root, Context, Args>,
			) => void;
		}

		export interface SubscriptionSubscribeExtensions<Root, Context, Args> {
			$auth: (
				scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
				options?: AuthMethodSubscribeOptions<Root, Context, Args>,
			) => void;
		}

		export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {
			$auth: (
				scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
				options?: AuthMethodOptions<Result, Root, Context, Args>,
			) => void;
			$postAuth: (
				getScopes: GetPostScopeRules<Result, Root, Context, Args>,
				options?: AuthMethodOptions<Result, Root, Context, Args>,
			) => void;
		}
	}

	export namespace AuthExtension {
		export interface Scopes {}

		export interface GrantsMap {}

		export type Grants = keyof GrantsMap;
	}
}

export type { AuthExtension, BaetaExtensions as AuthExtensionMethods };
