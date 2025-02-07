import test from 'ava';
import type { GraphQLResolveInfo } from 'graphql';
import type { Path } from 'graphql/jsutils/Path.js';
import { type GetGrantFn, type GetGrantResult, isGrantedKey, saveGrants } from './grant.ts';
import { loadAuthStore } from './store-loader.ts';
import { getAuthStore } from './store.ts';

function createGrantResolverArgs() {
	const ctx = {};

	loadAuthStore(ctx, async () => ({}));

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
	const grants = 'grant1' as unknown as GetGrantResult;
	const args = createGrantResolverArgs();

	await saveGrants(...args, grants);

	const store = await getAuthStore(args[2]);

	t.deepEqual(store.grantCache.getGrants('Query.users.User.photos'), ['grant1']);
});

test('saveGrants: should resolve grants if grants is a function', async (t) => {
	const args = createGrantResolverArgs();

	let fnCalled = false;

	const grants: GetGrantFn<unknown, unknown, unknown, unknown> = (args, result) => {
		fnCalled = true;
		return 'grant1' as unknown as GetGrantResult;
	};

	await saveGrants(...args, grants);

	const store = await getAuthStore(args[2]);

	t.true(fnCalled);
	t.deepEqual(store.grantCache.getGrants('Query.users.User.photos'), ['grant1']);
});
