import { isOperationType } from '../utils/resolver.ts';
import type { ScopeRules, ScopesShape } from './scope-rules.ts';

/** Configuration for default authorization scopes that apply to all operations of a specific type. */
export type DefaultScopes<Scopes extends ScopesShape, Grants extends string> = {
	/** Default scopes applied to all Query operations */
	Query?: ScopeRules<Scopes, Grants>;
	/** Default scopes applied to all Mutation operations */
	Mutation?: ScopeRules<Scopes, Grants>;
	/** Default scopes for Subscription operations */
	Subscription?: ScopeRules<Scopes, Grants>;
};

export function selectDefaultScopes<Scopes extends ScopesShape, Grants extends string>(
	skipDefaults: boolean | undefined,
	type: string,
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
		return defaultScopes.Subscription;
	}
}
