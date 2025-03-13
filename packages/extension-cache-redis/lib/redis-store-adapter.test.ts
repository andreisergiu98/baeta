import { type StoreOptions, createSerializer } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { type TestItem, runTestsForStoreAdapter } from '@baeta/tests-cache-stores';
import Redis from 'ioredis';
import { RedisStoreAdapter } from './redis-store-adapter.ts';

const client = new Redis({
	host: 'localhost',
	port: 65535,
	db: 5,
	maxRetriesPerRequest: 0, // Fail fast in tests
});

function createStoreAdapter(options: StoreOptions<TestItem>) {
	const serializer = createSerializer();
	return new RedisStoreAdapter(client, serializer, options, 'test', 'test-hash');
}

test.beforeEach(async () => {
	await client.flushall();
});

test.after(async () => {
	await client.quit();
});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'RedisStoreAdapter',
	serializer: createSerializer(),
	testTtl: true,
});
