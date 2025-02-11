import test from 'ava';
import { selectDefaultScopes } from './scope-defaults.ts';

test('returns undefined if no defaultScopes provided', (t) => {
	t.is(selectDefaultScopes(false, 'Query', 'field', undefined), undefined);
});

test('returns undefined if not an operation type', (t) => {
	t.is(selectDefaultScopes(false, 'Type', 'field', {}), undefined);
});

test('returns undefined if skipDefaults is true', (t) => {
	t.is(selectDefaultScopes(true, 'Query', 'field', {}), undefined);
});

test('returns Query scopes for Query type', (t) => {
	const defaultScopes = {
		Query: { some: 'scope' },
	};
	t.is(selectDefaultScopes(false, 'Query', 'field', defaultScopes), defaultScopes.Query);
});

test('returns Mutation scopes for Mutation type', (t) => {
	const defaultScopes = {
		Mutation: { some: 'scope' },
	};
	t.is(selectDefaultScopes(false, 'Mutation', 'field', defaultScopes), defaultScopes.Mutation);
});

test('returns subscribe scopes for Subscription subscribe field', (t) => {
	const defaultScopes = {
		Subscription: {
			subscribe: { some: 'scope' },
		},
	};
	t.is(
		selectDefaultScopes(false, 'Subscription', 'field.subscribe', defaultScopes),
		defaultScopes.Subscription.subscribe,
	);
});

test('returns resolve scopes for Subscription resolve field', (t) => {
	const defaultScopes = {
		Subscription: {
			resolve: { some: 'scope' },
		},
	};
	t.is(
		selectDefaultScopes(false, 'Subscription', 'field.resolve', defaultScopes),
		defaultScopes.Subscription.resolve,
	);
});
