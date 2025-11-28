import type { StoreAdapterOptions } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { runTestsForStoreAdapter, type TestItem } from '@baeta/tests-cache-stores';
import KeyvEtcd from '@keyv/etcd';
import Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter.ts';

const etcd = new KeyvEtcd('http://localhost:22379');
const keyv = new Keyv({ store: etcd });

function createStoreAdapter(options: StoreAdapterOptions<TestItem>) {
	return new KeyvStoreAdapter(keyv, options);
}

test.beforeEach(async () => {
	await keyv.clear();
});

test.after(async () => {
	await keyv.disconnect();
});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'KeyvStoreAdapter',
	testTtl: true,
});
