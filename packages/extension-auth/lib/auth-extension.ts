import {
	Extension,
	type ModuleBuilder,
	type NativeMiddleware,
	type ResolverMapper,
} from '@baeta/core/sdk';
import { compileMiddlewares } from './auth-compiler.ts';
import {
	type AuthMiddlewareOptions,
	type GetPostScopeRules,
	type GetScopeRules,
	createMiddleware,
	createPostMiddleware,
} from './auth-middlewares.ts';
import type { ScopeErrorResolver } from './error.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import type { ScopeRules } from './scope-rules.ts';

/**
 * Configuration options for the Auth Extension
 */
export interface AuthOptions {
	/** Default authorization scopes for queries, mutations or subscriptions */
	defaultScopes?: DefaultScopes<AuthExtension.Scopes, AuthExtension.Grants>;
	/** Custom error resolver for authorization failures */
	errorResolver?: ScopeErrorResolver;
}

export class AuthExtension<Ctx> extends Extension {
	private authMap: Record<string, Record<string, undefined | NativeMiddleware>> = {};

	constructor(
		readonly loadScopes: GetScopeLoader<AuthExtension.Scopes, Ctx>,
		readonly options: AuthOptions = {},
	) {
		super();
	}

	getMiddlewareMap() {
		return this.authMap;
	}

	getTypeExtensions = <Root, Context extends Ctx>(
		_module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$auth: this.createAuthMethod(type, '*'),
			$postAuth: this.createPostAuthMethod(type, '*'),
		};
	};

	getResolverExtensions = <Result, Root, Context extends Ctx, Args>(
		_module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod(type, field),
			$postAuth: this.createPostAuthMethod(type, field),
		};
	};

	getSubscriptionSubscribeExtensions = <Root, Context extends Ctx, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod('Subscription', `${field}.subscribe`),
		};
	};

	getSubscriptionResolveExtensions = <Result, Root, Context extends Ctx, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod('Subscription', `${field}.resolve`),
			$postAuth: this.createPostAuthMethod('Subscription', `${field}.resolve`),
		};
	};

	build = (_module: ModuleBuilder, mapper: ResolverMapper) => {
		compileMiddlewares<AuthExtension.Scopes, AuthExtension.Grants, Ctx>(
			mapper,
			this.authMap,
			this.loadScopes,
			this.options.defaultScopes,
			this.options.errorResolver,
		);
	};

	private createAuthMethod<Result, Root, Context extends Ctx, Args>(type: string, field: string) {
		return (
			scopes:
				| ScopeRules<AuthExtension.Scopes, AuthExtension.Grants>
				| GetScopeRules<AuthExtension.Scopes, AuthExtension.Grants, Root, Context, Args>,
			options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
		) => {
			const middleware = createMiddleware(
				type,
				field,
				this.loadScopes,
				scopes,
				this.options.defaultScopes,
				options,
				this.options.errorResolver,
			);
			this.registerMiddleware(type, field, middleware);
		};
	}

	private createPostAuthMethod<Result, Root, Context extends Ctx, Args>(
		type: string,
		field: string,
	) {
		return (
			scopes: GetPostScopeRules<
				AuthExtension.Scopes,
				AuthExtension.Grants,
				Result,
				Root,
				Context,
				Args
			>,
			options?: AuthMiddlewareOptions<AuthExtension.Grants, Result, Root, Context, Args>,
		) => {
			const middleware = createPostMiddleware(
				type,
				field,
				this.loadScopes,
				scopes,
				this.options.defaultScopes,
				options,
				this.options.errorResolver,
			);
			this.registerMiddleware(type, field, middleware);
		};
	}

	private registerMiddleware<Result, Root, Context, Args>(
		type: string,
		field: string,
		middleware: NativeMiddleware<Result, Root, Context, Args>,
	) {
		if (this.authMap[type] == null) {
			this.authMap[type] = {};
		}
		this.authMap[type][field] = middleware as NativeMiddleware;
	}
}
