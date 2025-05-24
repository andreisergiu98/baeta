import test from '@baeta/testing';
import type { GraphQLResolveInfo } from 'graphql';
import type { Path } from 'graphql/jsutils/Path.js';
import { type GetGrantFn, isGrantedKey, saveGrants } from './grant.ts';
import { getAuthStore } from './store.ts';
import { loadAuthStore } from './store-loader.ts';

type TestGrant = 'grant1';

function createGrantResolverArgs() {
	const ctx = {};
	const scopes = {};

	loadAuthStore<typeof scopes, typeof ctx>(ctx, async () => scopes);

	const path: Path = {
		key: 'photos',
		typename: 'User',
		prev: {
			typename: 'Query',
			key: 'users',
			prev: undefined,
		},
	};

	const info = {
		path,
	} as GraphQLResolveInfo;

	const result = 'result';

	return [{}, {}, ctx, info, result] as const;
}

test('isGrantedKey: should return true for grantRule', (t) => {
	t.true(isGrantedKey('$granted'));
});

test('isGrantedKey: should return false for other rules', (t) => {
	t.false(isGrantedKey('otherRule'));
});

test('saveGrants: should save resolved grants to the store', async (t) => {
	const grants = 'grant1';
	const args = createGrantResolverArgs();

	await saveGrants(...args, grants);

	const store = await getAuthStore(args[2]);

	t.deepEqual(store.grantCache.getGrants('Query.users.User.photos'), ['grant1']);
});

test('saveGrants: should resolve grants if grants is a function', async (t) => {
	const args = createGrantResolverArgs();

	let fnCalled = false;

	const grants: GetGrantFn<TestGrant, unknown, unknown, unknown, unknown> = () => {
		fnCalled = true;
		return 'grant1';
	};

	await saveGrants(...args, grants);

	const store = await getAuthStore(args[2]);

	t.true(fnCalled);
	t.deepEqual(store.grantCache.getGrants('Query.users.User.photos'), ['grant1']);
});
