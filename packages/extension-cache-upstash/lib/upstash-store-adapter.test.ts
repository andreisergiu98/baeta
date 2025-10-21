import { createSerializer, type StoreOptions } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { runTestsForStoreAdapter, type TestItem } from '@baeta/tests-cache-stores';
import { UpstashClient } from './upstash-client.ts';
import { UpstashStoreAdapter } from './upstash-store-adapter.ts';

const client = new UpstashClient({
	url: 'http://localhost:60080',
	token: 'example_token',
});

function createStoreAdapter(options: StoreOptions<TestItem>) {
	const serializer = createSerializer();
	return new UpstashStoreAdapter(client, serializer, options, 'test');
}

test.beforeEach(async () => {
	await client.flushdb();
});

test.after(async () => {});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'UpstashStoreAdapter',
	serializer: createSerializer(),
	testTtl: true,
});
