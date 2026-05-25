import type { Middleware } from '@baeta/core';
import {
	type AppPlugin,
	type FieldUsePlugin,
	type ModuleCompiler,
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
import { defineRules, type RuleAccessor } from './define-rules.ts';
import { defineScopes, type ScopeAccessor } from './define-scopes.ts';
import type { ScopeErrorResolver } from './error.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import type { ScopeRules, ScopesShape } from './scope-rules.ts';

type AuthPlugin<Result, Source, Context, Args, Info> = FieldUsePlugin<
	Result,
	Source,
	Context,
	Args,
	Info
> &
	TypeUsePlugin<Source, Context, Info> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'resolve'> &
	SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'subscribe'>;

interface BuildContext {
	type: string;
	field?: string;
	subscriptionFieldKind?: 'subscribe' | 'resolve';
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

interface AuthState {
	hasAuth: true;
}

export function createAuth<Context, Scopes extends ScopesShape, Grants extends string>(
	loadScopes: GetScopeLoader<Scopes, Context>,
	globalOptions: AuthOptions<Scopes, Grants> = {},
) {
	const id = createAppPluginId('Baeta Auth');
	const stateKey = Symbol('auth');
	const scope = defineScopes<Scopes, Grants>();
	const rule = defineRules<Scopes, Grants>();
	const loadScopesFn = loadScopes as GetScopeLoader<Scopes, unknown>;
	const defaultScopes = globalOptions.defaultScopes?.({ scope, rule });
	const cacheKeyMap: ScopeCacheKeyMap<Scopes> = globalOptions.cacheKeyMap ?? {};

	const makeAuthBuilder = <Result, Source, Context, Args, Info>(
		buildMiddleware: (type: string) => Middleware<Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> => {
		return {
			[makePluginSymbol]: ({ type, field, subscriptionFieldKind }: BuildContext) => {
				const middleware = buildMiddleware(type) as Middleware<any, Source, Context, any, Info>;
				nameFunction(middleware, buildMiddlewareName(type, field, subscriptionFieldKind));
				const metadata = new Map<symbol, AuthState>([[stateKey, { hasAuth: true }]]);
				return { id, middleware, meta: metadata };
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
				getScopes,
				defaultScopes,
				options,
				globalOptions.errorResolver,
			);
		});

	const authAppPlugin: AppPlugin = {
		id,
		name: 'Baeta Auth',
		mutate: (compilers) => {
			if (defaultScopes == null) return;
			for (const typeCompiler of iterateTypes(compilers)) {
				if (!isOperationType(typeCompiler.type)) continue;
				if (defaultScopes[typeCompiler.type] == null) continue;
				if (hasAuth(typeCompiler.useMetadata<AuthState>(stateKey).get())) continue;
				for (const fieldCompiler of typeCompiler.fields) {
					if (hasAuth(readFieldAuthState(fieldCompiler, stateKey))) continue;
					const middleware = createFallbackMiddleware(
						typeCompiler.type,
						loadScopesFn,
						cacheKeyMap,
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
	subscriptionFieldKind: 'subscribe' | 'resolve' | undefined,
) {
	if (field && subscriptionFieldKind) return `${type}.${field}.${subscriptionFieldKind}.$use.auth`;
	if (field) return `${type}.${field}.$use.auth`;
	return `${type}.$use.auth`;
}

function hasAuth(state: AuthState | undefined) {
	return state?.hasAuth === true;
}

function readFieldAuthState(
	field: ModuleCompiler['types'][number]['fields'][number],
	key: symbol,
): AuthState | undefined {
	return field.kind === 'Field'
		? field.useMetadata<AuthState>(key).get()
		: field.useSubscribeMetadata<AuthState>(key).get();
}

function* iterateTypes(compilers: ModuleCompiler[]) {
	for (const compiler of compilers) {
		for (const typeCompiler of compiler.types) {
			yield typeCompiler;
		}
	}
}
