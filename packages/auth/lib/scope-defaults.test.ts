import test from '@baeta/testing';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { ScopeRules } from './scope-rules.ts';

type TestScopes = { isPublic: boolean };
type TestGrants = string;

const trueScope: ScopeRules<TestScopes, TestGrants> = {
	type: 'scope',
	key: 'isPublic',
	value: true,
};

test('returns undefined if no defaultScopes provided', (t) => {
	t.is(selectDefaultScopes(false, 'Query'), undefined);
});

test('returns undefined if not an operation type', (t) => {
	t.is(selectDefaultScopes<TestScopes, TestGrants>(false, 'Type', {}), undefined);
});

test('returns undefined if skipDefaults is true', (t) => {
	t.is(selectDefaultScopes<TestScopes, TestGrants>(true, 'Query', {}), undefined);
});

test('returns Query scopes for Query type', (t) => {
	const defaultScopes: DefaultScopes<TestScopes, TestGrants> = { Query: trueScope };
	t.is(selectDefaultScopes(false, 'Query', defaultScopes), trueScope);
});

test('returns Mutation scopes for Mutation type', (t) => {
	const defaultScopes: DefaultScopes<TestScopes, TestGrants> = { Mutation: trueScope };
	t.is(selectDefaultScopes(false, 'Mutation', defaultScopes), trueScope);
});

test('returns Subscription scopes for Subscription type', (t) => {
	const defaultScopes: DefaultScopes<TestScopes, TestGrants> = { Subscription: trueScope };
	t.is(selectDefaultScopes(false, 'Subscription', defaultScopes), trueScope);
});
