import type { NativeMiddleware } from '@baeta/core/sdk';
import { isOperationType } from '../utils/resolver.ts';
import type { ScopeRules } from './scope-rules.ts';

interface OperationOptions<T> {
	Query?: T;
	Mutation?: T;
	Subscription?: {
		subscribe?: T;
		resolve?: T;
	};
}

export type DefaultScopes = OperationOptions<ScopeRules>;

export type DefaultScopesMiddlewares = OperationOptions<NativeMiddleware>;

export function selectDefaultScopes(
	skipDefaults: boolean | undefined,
	type: string,
	field: string,
	defaultScopes?: DefaultScopes,
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
