import test from '@baeta/testing';
import { selectDefaultScopes } from './scope-defaults.ts';

test('returns undefined if no defaultScopes provided', (t) => {
	t.is(selectDefaultScopes(false, 'Query', undefined), undefined);
});

test('returns undefined if not an operation type', (t) => {
	t.is(selectDefaultScopes(false, 'Type', {}), undefined);
});

test('returns undefined if skipDefaults is true', (t) => {
	t.is(selectDefaultScopes(true, 'Query', {}), undefined);
});

test('returns Query scopes for Query type', (t) => {
	const defaultScopes = {
		Query: { some: 'scope' },
	};
	t.is(selectDefaultScopes(false, 'Query', defaultScopes), defaultScopes.Query);
});

test('returns Mutation scopes for Mutation type', (t) => {
	const defaultScopes = {
		Mutation: { some: 'scope' },
	};
	t.is(selectDefaultScopes(false, 'Mutation', defaultScopes), defaultScopes.Mutation);
});

test('returns subscribe scopes for Subscription', (t) => {
	const defaultScopes = {
		Subscription: {
			subscribe: { some: 'scope' },
		},
	};
	t.is(selectDefaultScopes(false, 'Subscription', defaultScopes), defaultScopes.Subscription);
});
