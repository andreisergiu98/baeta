import { type StoreOptions, createSerializer } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { type TestItem, runTestsForStoreAdapter } from '@baeta/tests-cache-stores';
import KeyvEtcd from '@keyv/etcd';
import Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter.ts';

const etcd = new KeyvEtcd('http://localhost:22379');
const keyv = new Keyv({ store: etcd });

function createStoreAdapter(options: StoreOptions<TestItem>) {
	const serializer = createSerializer();
	return new KeyvStoreAdapter(keyv, serializer, options, 'test', 'test-hash');
}

test.beforeEach(async () => {
	await keyv.clear();
});

test.after(async () => {
	await keyv.disconnect();
});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'KeyvStoreAdapter',
	serializer: createSerializer(),
	testTtl: true,
});
