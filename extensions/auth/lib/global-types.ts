import { AuthMethodOptions, GetPostRequiredScopes, GetRequiredScopes } from './auth-extension';
import { RequiredScopes } from './scope';

declare global {
  export namespace BaetaExtensions {
    type NewType<Root, Context, Args> = GetRequiredScopes<Root, Context, Args>;

    export interface ResolverExtensions<Result, Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | NewType<Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostRequiredScopes<Result, Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
    }

    export interface TypeExtensions<Root, Context> {
      $auth: (
        scopes: RequiredScopes | GetRequiredScopes<Root, Context, unknown>,
        options?: AuthMethodOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostRequiredScopes<unknown, Root, Context, unknown>,
        options?: AuthMethodOptions
      ) => void;
    }

    export interface SubscriptionSubscribeExtensions<Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | GetRequiredScopes<Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostRequiredScopes<unknown, Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
    }

    export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | GetRequiredScopes<Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostRequiredScopes<Result, Root, Context, Args>,
        options?: AuthMethodOptions
      ) => void;
    }

    export interface ModuleExtensions {}
  }

  export namespace AuthExtension {
    export interface Scopes {}
  }
}
