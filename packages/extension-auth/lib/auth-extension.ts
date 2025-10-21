import {
	Extension,
	type FieldBuilder,
	type ModuleCompiler,
	nameFunction,
	type SubscriptionBuilder,
	type SubscriptionWrapper,
	type TypeBuilder,
} from '@baeta/core/sdk';
import { isOperationType } from '../utils/resolver.ts';
import {
	createFallbackMiddleware,
	createMiddleware,
	createPostMiddleware,
} from './auth-middlewares.ts';
import type { ScopeErrorResolver } from './error.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';

/**
 * Configuration options for the Auth Extension
 */
export interface AuthOptions {
	/** Default authorization scopes for queries, mutations or subscriptions */
	defaultScopes?: DefaultScopes<AuthExtension.Scopes, AuthExtension.Grants>;
	/** Custom error resolver for authorization failures */
	errorResolver?: ScopeErrorResolver;
}

interface AuthState {
	hasAuth: boolean;
}

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {
			authExtension: AuthExtension<unknown>;
		}
	}
}

export class AuthExtension<Ctx> extends Extension<AuthState> {
	readonly stateKey = Symbol('auth-state');
	readonly loadScopes: GetScopeLoader<AuthExtension.Scopes, unknown>;
	readonly options: AuthOptions;

	constructor(loadScopes: GetScopeLoader<AuthExtension.Scopes, Ctx>, options: AuthOptions = {}) {
		super();
		this.loadScopes = loadScopes as GetScopeLoader<AuthExtension.Scopes, unknown>;
		this.options = options;
	}

	getTypeExtensions = <Source, Context, Info>(
		builder: TypeBuilder<Source, Context, Info>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info, TypeBuilder<Source, Context, Info>> => {
		return {
			$auth: (scopes, options) => {
				const editable = builder.edit();
				this.setState(editable, {
					hasAuth: true,
				});
				const middleware = createMiddleware(
					editable.type,
					this.loadScopes,
					scopes,
					this.options.defaultScopes,
					options,
					this.options.errorResolver,
				);
				nameFunction(middleware, `${editable.type}.$auth`);
				return editable.addMiddleware(middleware).commitToMethods();
			},
			$postAuth: (scopes, options) => {
				const editable = builder.edit();
				this.setState(editable, {
					hasAuth: true,
				});
				const middleware = createPostMiddleware(
					editable.type,
					this.loadScopes,
					scopes,
					this.options.defaultScopes,
					options,
					this.options.errorResolver,
				);
				nameFunction(middleware, `${editable.type}.$postAuth`);
				return editable.addMiddleware(middleware).commitToMethods();
			},
		};
	};

	getFieldExtensions<Result, Source, Context, Args, Info>(
		builder: FieldBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.FieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		FieldBuilder<Result, Source, Context, Args, Info>
	> {
		return {
			$auth: (scopes, options) => {
				const editable = builder.edit();
				this.setState(editable, {
					hasAuth: true,
				});
				const middleware = createMiddleware<
					AuthExtension.Scopes,
					AuthExtension.Grants,
					Result,
					Source,
					Context,
					Args,
					Info
				>(
					editable.type,
					this.loadScopes,
					scopes,
					this.options.defaultScopes,
					options,
					this.options.errorResolver,
				);
				nameFunction(middleware, `${editable.type}.${builder.field}.$auth`);
				return editable.addMiddleware(middleware).commitToMethods();
			},
			$postAuth: (scopes, options) => {
				const editable = builder.edit();
				this.setState(editable, {
					hasAuth: true,
				});
				const middleware = createPostMiddleware(
					editable.type,
					this.loadScopes,
					scopes,
					this.options.defaultScopes,
					options,
					this.options.errorResolver,
				);
				nameFunction(middleware, `${editable.type}.${builder.field}.$postAuth`);
				return editable.addMiddleware(middleware).commitToMethods();
			},
		};
	}

	getSubscriptionExtensions<Result, Source, Context, Args, Info>(
		builder: SubscriptionBuilder<Result, Source, Context, Args, Info>,
	): BaetaExtensions.SubscriptionExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		SubscriptionBuilder<Result, Source, Context, Args, Info>
	> {
		return {
			$auth: (scopes, options) => {
				const editable = builder.edit();
				this.setState(editable, {
					hasAuth: true,
				});
				const middleware = createMiddleware<
					AuthExtension.Scopes,
					AuthExtension.Grants,
					SubscriptionWrapper<unknown>,
					Source,
					Context,
					Args,
					Info
				>(
					'Subscription',
					this.loadScopes,
					scopes,
					this.options.defaultScopes,
					options,
					this.options.errorResolver,
				);
				nameFunction(middleware, `Subscription.${editable.field}.$auth`);
				return editable.addMiddleware(middleware).commitToMethods();
			},
		};
	}

	mutate(compilers: ModuleCompiler[]): void {
		if (this.options.defaultScopes == null) return;

		for (const compiler of compilers) {
			for (const typeCompiler of compiler.types) {
				if (!isOperationType(typeCompiler.type)) continue;
				if (this.options.defaultScopes[typeCompiler.type] == null) continue;

				const state = this.getState(typeCompiler);
				if (state?.hasAuth === true) continue;

				for (const fieldCompiler of typeCompiler.fields) {
					const state = this.getState(fieldCompiler);
					if (state?.hasAuth === true) continue;

					const middleware = createFallbackMiddleware(
						typeCompiler.type,
						this.loadScopes,
						this.options.defaultScopes,
						this.options.errorResolver,
					);
					if (middleware == null) continue;

					fieldCompiler.addInitialMiddleware(middleware);
				}
			}
		}
	}
}
