import { type StoreOptions, createSerializer } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { type TestItem, runTestsForStoreAdapter } from '@baeta/tests-cache-stores';
import { UpstashClient } from './upstash-client.ts';
import { UpstashStoreAdapter } from './upstash-store-adapter.ts';

const client = new UpstashClient({
	url: 'http://localhost:60080',
	token: 'example_token',
});

function createStoreAdapter(options: StoreOptions<TestItem>) {
	const serializer = createSerializer();
	return new UpstashStoreAdapter(client, serializer, options, 'test', 'test-hash');
}

test.beforeEach(async () => {
	await client.flushall();
});

test.after(async () => {});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'UpstashStoreAdapter',
	serializer: createSerializer(),
	testTtl: true,
});
