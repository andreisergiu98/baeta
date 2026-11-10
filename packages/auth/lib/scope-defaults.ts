import type { RootTypes } from '@baeta/core/sdk';
import type { ScopeRules } from './scope-rules.ts';
import type { ScopesShape } from './scope-shape.ts';

/** Configuration for default authorization scopes that apply to all operations of a specific type. */
export type DefaultScopes<Scopes extends ScopesShape, Grants extends string> = {
	/** Default scopes applied to all Query operations */
	Query?: ScopeRules<Scopes, Grants>;
	/** Default scopes applied to all Mutation operations */
	Mutation?: ScopeRules<Scopes, Grants>;
	/** Default scopes for Subscription operations */
	Subscription?: ScopeRules<Scopes, Grants>;
};

export type DefaultScopesOperation = keyof DefaultScopes<ScopesShape, string>;

export function getDefaultScopesOperation(
	type: string,
	roots: RootTypes,
): DefaultScopesOperation | undefined {
	if (type === roots.query) {
		return 'Query';
	}
	if (type === roots.mutation) {
		return 'Mutation';
	}
	if (type === roots.subscription) {
		return 'Subscription';
	}
}

export function selectDefaultScopes<Scopes extends ScopesShape, Grants extends string>(
	skipDefaults: boolean | undefined,
	operation: DefaultScopesOperation | undefined,
	defaultScopes?: DefaultScopes<Scopes, Grants>,
) {
	if (!defaultScopes || operation == null || skipDefaults === true) {
		return;
	}
	return defaultScopes[operation];
}
