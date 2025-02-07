import type { MiddlewareParams } from '@baeta/core';
import {
	Extension,
	type ModuleBuilder,
	type NativeMiddleware,
	type ResolverMapper,
} from '@baeta/core/sdk';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath, isOperationType } from '../utils/resolver.ts';
import { type ScopeErrorResolver, defaultErrorResolver, resolveError } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import type { LogicRule } from './rule.ts';
import {
	type DefaultScopes,
	type DefaultScopesMiddlewares,
	selectDefaultScopes,
} from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { type ScopeRules, verifyScopes } from './scope-rules.ts';
import { loadAuthStore } from './store-loader.ts';

/**
 * Configuration options for the Auth Extension
 */
export interface AuthOptions {
	/** Default authorization scopes for queries, mutations or subscriptions */
	defaultScopes?: DefaultScopes;
	/** Custom error resolver for authorization failures */
	errorResolver?: ScopeErrorResolver;
}

/**
 * Options for authorization methods
 */
export interface AuthMethodOptions<Result, Root, Context, Args> {
	/** Permissions to grant after successful authorization */
	grants?: GetGrant<Result, Root, Context, Args>;
	/** Whether to skip default scopes for this operation */
	skipDefaults?: boolean;
	/** Custom error handler for this operation */
	onError?: ScopeErrorResolver;
}

/**
 * Options for subscription authorization
 */
export interface AuthMethodSubscribeOptions<Root, Context, Args> {
	/** Whether to skip default scopes for this subscription */
	skipDefaults?: boolean;
	/** Custom error handler for this subscription */
	onError?: ScopeErrorResolver;
}

/**
 * Function to get scope rules for pre-resolution authorization
 */
export type GetScopeRules<Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
) => true | ScopeRules | Promise<true | ScopeRules>;

/**
 * Function to get scope rules for post-resolution authorization
 */
export type GetPostScopeRules<Result, Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => true | ScopeRules | Promise<true | ScopeRules>;

export class AuthExtension<Ctx> extends Extension {
	private defaultRule: LogicRule = '$and';
	private authMap: Record<string, Record<string, undefined | NativeMiddleware>> = {};

	private readonly defaultMiddlewares: DefaultScopesMiddlewares;

	constructor(
		readonly loadScopes: GetScopeLoader<Ctx>,
		readonly options: AuthOptions = {},
	) {
		super();
		this.defaultMiddlewares = this.createDefaultMiddlewares();
	}

	getTypeExtensions = <Root, Context>(
		_module: ModuleBuilder,
		type: string,
	): BaetaExtensions.TypeExtensions<Root, Context> => {
		return {
			$auth: this.createAuthMethod(type, '*'),
			$postAuth: this.createPostAuthMethod(type, '*'),
		};
	};

	getResolverExtensions = <Result, Root, Context, Args>(
		_module: ModuleBuilder,
		type: string,
		field: string,
	): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod(type, field),
			$postAuth: this.createPostAuthMethod(type, field),
		};
	};

	getSubscriptionExtensions = <Root, Context, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionExtensions<Root, Context, Args> => {
		return {
			$auth: this.createSubscriptionAuthMethod(field),
		};
	};

	getSubscriptionSubscribeExtensions = <Root, Context, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod('Subscription', `${field}.subscribe`),
		};
	};

	getSubscriptionResolveExtensions = <Result, Root, Context, Args>(
		_module: ModuleBuilder,
		field: string,
	): BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args> => {
		return {
			$auth: this.createAuthMethod('Subscription', `${field}.resolve`),
			$postAuth: this.createPostAuthMethod('Subscription', `${field}.resolve`),
		};
	};

	build = (_module: ModuleBuilder, mapper: ResolverMapper) => {
		for (const type of mapper.getTypes()) {
			let fields = mapper.getTypeFields(type);

			if (type === 'Subscription') {
				fields = fields.flatMap((field) => [`${field}.subscribe`, `${field}.resolve`]);
			}

			const fieldsWithScopes = Object.keys(this.authMap[type] ?? {});
			let fieldsWithoutScopes = fields.filter((field) => !fieldsWithScopes.includes(field));

			for (const field of fieldsWithScopes) {
				const middleware = this.authMap[type][field];

				if (middleware == null) {
					continue;
				}

				if (field !== '*') {
					mapper.prependMiddleware(type, field, middleware);
					continue;
				}

				for (const fieldWithoutScope of fieldsWithoutScopes) {
					mapper.prependMiddleware(type, fieldWithoutScope, middleware);
				}

				fieldsWithoutScopes = [];
			}

			if (!isOperationType(type) || fieldsWithoutScopes.length === 0) {
				continue;
			}

			const buildDefaultMiddleware = this.createDefaultMiddlewareBuilder(type);

			if (buildDefaultMiddleware == null) {
				continue;
			}

			for (const field of fieldsWithoutScopes) {
				buildDefaultMiddleware(mapper, field);
			}
		}
	};

	private createAuthMethod<Result, Root, Context, Args>(
		type: string,
		field: string,
		isSubscribe = false,
	) {
		return (
			scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
			options?: AuthMethodOptions<Result, Root, Context, Args>,
		) => {
			const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, field);
			const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
			const middleware = this.createMiddleware(getScopes, options, defaultScopes, isSubscribe);
			this.registerMiddleware(type, field, middleware);
		};
	}

	private createPostAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
		return (
			getScopes: GetPostScopeRules<Result, Root, Context, Args>,
			options?: AuthMethodOptions<Result, Root, Context, Args>,
		) => {
			const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, field);
			const middleware = this.createPostMiddleware(getScopes, options, defaultScopes);
			this.registerMiddleware(type, field, middleware);
		};
	}

	private createSubscriptionAuthMethod<Root, Context, Args>(field: string) {
		return (
			scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
			options?: AuthMethodOptions<unknown, Root, Context, Args>,
		) => {
			const registerResolve = this.createAuthMethod<unknown, Root, Context, Args>(
				'Subscription',
				`${field}.resolve`,
			);
			const registerSubscribe = this.createAuthMethod<unknown, Root, Context, Args>(
				'Subscription',
				`${field}.subscribe`,
			);

			registerResolve(scopes, options);
			registerSubscribe(scopes, options);
		};
	}

	private createMiddleware<Result, Root, Context, Args>(
		getScopes: GetScopeRules<Root, Context, Args>,
		options?: AuthMethodOptions<Result, Root, Context, Args>,
		defaultScopes?: ScopeRules,
		isSubscribe = false,
	): NativeMiddleware<Result, Root, Context, Args> {
		return (next) => async (root, args, ctx, info) => {
			loadAuthStore(ctx as unknown as Ctx, this.loadScopes);

			const requiredScopes = await getScopes({ root, args, ctx, info });

			await this.verifyAllScopes(ctx, info, options, defaultScopes, requiredScopes);

			if (isSubscribe) {
				return next(root, args, ctx, info);
			}

			const result = await next(root, args, ctx, info);

			if (options?.grants) {
				await saveGrants(root, args, ctx, info, result, options.grants);
			}

			return result;
		};
	}

	private createPostMiddleware<Result, Root, Context, Args>(
		getScopes: GetPostScopeRules<Result, Root, Context, Args>,
		options?: AuthMethodOptions<Result, Root, Context, Args>,
		defaultScopes?: ScopeRules,
	): NativeMiddleware<Result, Root, Context, Args> {
		return (next) => async (root, args, ctx, info) => {
			loadAuthStore(ctx as unknown as Ctx, this.loadScopes);

			const result = await next(root, args, ctx, info);
			const requiredScopes = await getScopes({ root, args, ctx, info }, result);

			await this.verifyAllScopes(ctx, info, options, defaultScopes, requiredScopes);

			if (options?.grants) {
				await saveGrants(root, args, ctx, info, result, options.grants);
			}

			return result;
		};
	}

	private createDefaultMiddlewares() {
		const createDefaultMiddleware = (rules?: ScopeRules, isSubscribe = false) => {
			if (rules == null) {
				return;
			}
			return this.createMiddleware(() => rules, undefined, undefined, isSubscribe);
		};

		return {
			Query: createDefaultMiddleware(this.options.defaultScopes?.Query),
			Mutation: createDefaultMiddleware(this.options.defaultScopes?.Mutation),
			Subscription: {
				subscribe: createDefaultMiddleware(
					this.options.defaultScopes?.Subscription?.subscribe,
					true,
				),
				resolve: createDefaultMiddleware(this.options.defaultScopes?.Subscription?.resolve),
			},
		};
	}

	private createDefaultMiddlewareBuilder(type: 'Query' | 'Mutation' | 'Subscription') {
		if (type !== 'Subscription') {
			const middleware = this.defaultMiddlewares[type];
			if (middleware == null) {
				return;
			}
			return (mapper: ResolverMapper, field: string) => {
				mapper.prependMiddleware(type, field, middleware);
			};
		}

		const subscribeDefaultMiddleware = this.defaultMiddlewares?.Subscription?.subscribe;
		const resolveDefaultMiddleware = this.defaultMiddlewares.Subscription?.resolve;

		if (resolveDefaultMiddleware == null && subscribeDefaultMiddleware == null) {
			return;
		}

		return (mapper: ResolverMapper, field: string) => {
			if (subscribeDefaultMiddleware && field.endsWith('.subscribe')) {
				mapper.prependMiddleware(type, field, subscribeDefaultMiddleware);
			}

			if (resolveDefaultMiddleware && field.endsWith('.resolve')) {
				mapper.prependMiddleware(type, field, resolveDefaultMiddleware);
			}
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

	private async verifyAllScopes<Result, Root, Context, Args>(
		ctx: Context,
		info: GraphQLResolveInfo,
		options: AuthMethodOptions<Result, Root, Context, Args> | undefined,
		defaultScopes: ScopeRules | undefined,
		requiredScopes: ScopeRules | true | undefined,
	) {
		const fullPath = createResolverPath(info.path);
		const parentPath = createResolverPath(info.path.prev);
		const errorResolver = this.createErrorResolver(options?.onError);

		const promises: Promise<unknown>[] = [];

		if (defaultScopes) {
			promises.push(verifyScopes(ctx, defaultScopes, this.defaultRule, parentPath));
		}

		if (requiredScopes !== true) {
			promises.push(verifyScopes(ctx, requiredScopes, this.defaultRule, parentPath));
		}

		if (promises.length === 0) {
			return;
		}

		return Promise.all(promises).catch((err) => resolveError(err, errorResolver, fullPath));
	}

	private createErrorResolver(errorResolver?: ScopeErrorResolver) {
		return errorResolver ?? this.options.errorResolver ?? defaultErrorResolver;
	}
}
