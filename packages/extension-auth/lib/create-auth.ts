import type { Middleware } from '@baeta/core';
import {
	type AppPlugin,
	type FieldUsePlugin,
	type ModuleCompiler,
	type SubscriptionUsePlugin,
	type TypeUsePlugin,
	createAppPluginId,
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
import type { ScopeErrorResolver } from './error.ts';
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
	defaultScopes?: DefaultScopes<Scopes, Grants>;
	/** Custom error resolver for authorization failures */
	errorResolver?: ScopeErrorResolver;
}

interface AuthState {
	hasAuth: true;
}

export function createAuth<Context, Scopes extends ScopesShape, Grants extends string>(
	loadScopes: GetScopeLoader<Scopes, Context>,
	globalOptions: AuthOptions<Scopes, Grants> = {},
) {
	const scopeLoader = loadScopes as GetScopeLoader<Scopes, unknown>;
	const id = createAppPluginId('Baeta Auth');
	const stateKey = Symbol('auth');
	const metadata = new Map<symbol, AuthState>([[stateKey, { hasAuth: true }]]);

	const makeAuthBuilder = <Result, Source, Context, Args, Info>(
		buildMiddleware: (type: string) => Middleware<Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> => ({
		buildPlugin: ({ type, field, subscriptionFieldKind }: BuildContext) => {
			const middleware = buildMiddleware(type) as Middleware<any, Source, Context, any, Info>;
			nameFunction(middleware, buildMiddlewareName(type, field, subscriptionFieldKind));
			return { id, middleware, meta: metadata };
		},
	});

	const auth = <Result, Source, Context, Args, Info>(
		scopes: ScopeRules<Scopes, Grants> | GetScopeRules<Scopes, Grants, Source, Context, Args, Info>,
		options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> =>
		makeAuthBuilder((type) =>
			createMiddleware(
				type,
				scopeLoader,
				scopes,
				globalOptions.defaultScopes,
				options,
				globalOptions.errorResolver,
			),
		);

	const authAfter = <Result, Source, Context, Args, Info>(
		getScopes: GetPostScopeRules<Scopes, Grants, Result, Source, Context, Args, Info>,
		options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	): AuthPlugin<Result, Source, Context, Args, Info> =>
		makeAuthBuilder((type) =>
			createPostMiddleware(
				type,
				scopeLoader,
				getScopes,
				globalOptions.defaultScopes,
				options,
				globalOptions.errorResolver,
			),
		);

	const authAppPlugin: AppPlugin = {
		id,
		name: 'Baeta Auth',
		mutate: (compilers) => {
			if (globalOptions.defaultScopes == null) return;
			for (const typeCompiler of iterateTypes(compilers)) {
				if (!isOperationType(typeCompiler.type)) continue;
				if (globalOptions.defaultScopes[typeCompiler.type] == null) continue;
				if (hasAuth(typeCompiler.useMetadata<AuthState>(stateKey).get())) continue;
				for (const fieldCompiler of typeCompiler.fields) {
					if (hasAuth(readFieldAuthState(fieldCompiler, stateKey))) continue;
					const middleware = createFallbackMiddleware(
						typeCompiler.type,
						scopeLoader,
						globalOptions.defaultScopes,
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

	return { auth, authAfter, authAppPlugin };
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
