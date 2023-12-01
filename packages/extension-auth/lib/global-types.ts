import { AuthMethodOptions, GetPostScopeRules, GetScopeRules } from './auth-extension';
import { ScopeRules } from './scope-rules';

declare global {
  export namespace BaetaExtensions {
    type NewType<Root, Context, Args> = GetScopeRules<Root, Context, Args>;

    export interface ResolverExtensions<Result, Root, Context, Args> {
      $auth: (
        scopes: ScopeRules | NewType<Root, Context, Args>,
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
        options?: AuthMethodOptions<unknown, Root, Context, Args>,
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
    // biome-ignore lint/suspicious/noEmptyInterface: is template
    export interface Scopes {}

    // biome-ignore lint/suspicious/noEmptyInterface: is template
    export interface GrantsMap {}

    export type Grants = keyof GrantsMap;
  }
}
