import type { Middleware } from '@baeta/core';
import {
	type AppPlugin,
	type FieldUsePlugin,
	type ModuleCompiler,
	type PluginId,
	type SubscriptionUsePlugin,
	type TypeUsePlugin,
	createAppPluginId,
	makePluginSymbol,
	nameFunction,
} from '@baeta/core/sdk';
import { isOperationType } from '../utils/resolver.ts';
import {
	type AuthMiddlewareOptions,
	type GetPostScopeRules,
	type GetScopeRules,
	createFallbackMiddleware,
	createMiddleware,
	createPostMiddleware,
} from './auth-middlewares.ts';
import { createAuthStore } from './auth-store.ts';
import { defineRules, type RuleAccessor } from './define-rules.ts';
import { defineScopes, type ScopeAccessor } from './define-scopes.ts';
import type { ScopeErrorResolver } from './error.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import type { ScopeRules } from './scope-rules.ts';
import type { ScopesShape } from './scope-shape.ts';

type AuthPlugin<Result, Source, Context, Args, Info> = FieldUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info,
	AuthState
> &
	TypeUsePlugin<Source, Context, Info, AuthState> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'resolve', AuthState> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'subscribe', AuthState>;

interface AuthState {
	hasAuth: true;
}

/** Configuration options for Auth */
export interface AuthOptions<Scopes extends ScopesShape, Grants extends string> {
	/** Default authorization scopes for queries, mutations or subscriptions */
	defaultScopes?: (opt: {
		scope: ScopeAccessor<Scopes, Grants>;
		rule: RuleAccessor<Scopes, Grants>;
	}) => DefaultScopes<Scopes, Grants>;
	/** Custom error resolver for authorization failures */
	errorResolver?: ScopeErrorResolver;

	/**
	 * Per-scope cache key overrides. Recommended for scopes whose argument
	 * isn't safely auto-serializable: serializable args (primitives, plain
	 * objects, arrays of those) are stringified automatically, and anything
	 * else falls back to reference identity — which may miss cache hits when
	 * callers construct equivalent-but-distinct values.
	 */
	cacheKeyMap?: ScopeCacheKeyMap<Scopes>;
}

export function createAuth<Context, Scopes extends ScopesShape, Grants extends string>(
	loadScopes: GetScopeLoader<Scopes, Context>,
	globalOptions: AuthOptions<Scopes, Grants> = {},
) {
	const id = createAppPluginId<AuthState>('@baeta/auth');
	const authStore = createAuthStore<Scopes, unknown>();
	const scope = defineScopes<Scopes, Grants>();
	const rule = defineRules<Scopes, Grants>();
	const loadScopesFn = loadScopes as GetScopeLoader<Scopes, unknown>;
	const defaultScopes = globalOptions.defaultScopes?.({ scope, rule });
	const cacheKeyMap: ScopeCacheKeyMap<Scopes> = globalOptions.cacheKeyMap ?? {};

	const makeAuthBuilder = <Result, Source, Context, Args, Info>(
		buildMiddleware: (type: string) => Middleware<Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> => {
		return {
			[makePluginSymbol]: {
				id,
				make: (session, metadata) => {
					const middleware = buildMiddleware(metadata.type) as Middleware<
						any,
						Source,
						Context,
						any,
						Info
					>;
					nameFunction(
						middleware,
						buildMiddlewareName(
							metadata.type,
							metadata.kind !== 'type' ? metadata.field : undefined,
							metadata.kind === 'subscription' ? metadata.phase : undefined,
						),
					);
					session.setPluginState(id, { hasAuth: true });
					session.addMiddleware(middleware);
				},
			},
		};
	};

	const auth = <Result, Source, Context, Args, Info>(
		scopes: ScopeRules<Scopes, Grants> | GetScopeRules<Scopes, Grants, Source, Context, Args, Info>,
		options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> =>
		makeAuthBuilder<Result, Source, Context, Args, Info>((type) =>
			createMiddleware(
				type,
				loadScopesFn,
				cacheKeyMap,
				authStore,
				scopes,
				defaultScopes,
				options,
				globalOptions.errorResolver,
			),
		);

	const authAfter = <Result, Source, Context, Args, Info>(
		getScopes: GetPostScopeRules<Scopes, Grants, Result, Source, Context, Args, Info>,
		options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> =>
		makeAuthBuilder<Result, Source, Context, Args, Info>((type) => {
			if (type === 'Mutation') {
				throw new Error(
					'"authAfter" cannot be used on Mutations! authAfter is executed after the resolver thus cannot protect mutations. Use "auth" instead for mutations.',
				);
			}
			return createPostMiddleware(
				type,
				loadScopesFn,
				cacheKeyMap,
				authStore,
				getScopes,
				defaultScopes,
				options,
				globalOptions.errorResolver,
			);
		});

	const authAppPlugin: AppPlugin<AuthState> = {
		id,
		mutate: (compilers) => {
			if (defaultScopes == null) return;
			for (const typeCompiler of iterateTypes(compilers)) {
				if (!isOperationType(typeCompiler.type)) continue;
				if (defaultScopes[typeCompiler.type] == null) continue;
				if (hasAuth(typeCompiler.getPluginState(id))) continue;
				for (const fieldCompiler of typeCompiler.fields) {
					if (hasAuth(readFieldAuthState(fieldCompiler, id))) continue;
					const middleware = createFallbackMiddleware(
						typeCompiler.type,
						loadScopesFn,
						cacheKeyMap,
						authStore,
						defaultScopes,
						globalOptions.errorResolver,
					);
					if (!middleware) {
						continue;
					}
					if (fieldCompiler.kind === 'Field') {
						fieldCompiler.addTopLevelMiddleware(middleware);
					} else {
						fieldCompiler.addTopLevelSubscribeMiddleware(middleware);
					}
				}
			}
		},
	};

	return {
		auth,
		authAfter,
		authAppPlugin,
		rule,
		scope,
	};
}

function buildMiddlewareName(
	type: string,
	field: string | undefined,
	subscriptionPhase: 'subscribe' | 'resolve' | undefined,
) {
	if (field && subscriptionPhase) return `${type}.${field}.${subscriptionPhase}.$use.auth`;
	if (field) return `${type}.${field}.$use.auth`;
	return `${type}.$use.auth`;
}

function hasAuth(state: AuthState | undefined) {
	return state?.hasAuth === true;
}

function readFieldAuthState(
	field: ModuleCompiler['types'][number]['fields'][number],
	pluginId: PluginId<AuthState>,
): AuthState | undefined {
	return field.kind === 'Field'
		? field.getPluginState(pluginId)
		: field.getPluginSubscribeState(pluginId);
}

function* iterateTypes(compilers: ModuleCompiler[]) {
	for (const compiler of compilers) {
		for (const typeCompiler of compiler.types) {
			yield typeCompiler;
		}
	}
}
