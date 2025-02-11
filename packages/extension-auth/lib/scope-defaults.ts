import type { NativeMiddleware } from '@baeta/core/sdk';
import { isOperationType } from '../utils/resolver.ts';
import type { ScopeRules, ScopesShape } from './scope-rules.ts';

/** Configuration for default authorization scopes that apply to all operations of a specific type. */
export type DefaultScopes<Scopes extends ScopesShape, Grants extends string> = {
	/** Default scopes applied to all Query operations */
	Query?: ScopeRules<Scopes, Grants>;
	/** Default scopes applied to all Mutation operations */
	Mutation?: ScopeRules<Scopes, Grants>;
	/** Default scopes for Subscription operations */
	Subscription?: {
		/** Scopes applied during the subscription phase */
		subscribe?: ScopeRules<Scopes, Grants>;
		/** Scopes applied during the resolve phase */
		resolve?: ScopeRules<Scopes, Grants>;
	};
};

export type DefaultScopesMiddlewares = {
	Query?: NativeMiddleware;
	Mutation?: NativeMiddleware;
	Subscription?: {
		subscribe?: NativeMiddleware;
		resolve?: NativeMiddleware;
	};
};

export function selectDefaultScopes<Scopes extends ScopesShape, Grants extends string>(
	skipDefaults: boolean | undefined,
	type: string,
	field: string,
	defaultScopes?: DefaultScopes<Scopes, Grants>,
) {
	if (!defaultScopes) {
		return;
	}

	if (!isOperationType(type)) {
		return;
	}

	if (skipDefaults === true) {
		return;
	}

	if (type === 'Query') {
		return defaultScopes.Query;
	}

	if (type === 'Mutation') {
		return defaultScopes.Mutation;
	}

	if (type === 'Subscription') {
		if (field.endsWith('.subscribe')) {
			return defaultScopes.Subscription?.subscribe;
		}

		if (field.endsWith('.resolve')) {
			return defaultScopes.Subscription?.resolve;
		}
	}
}
