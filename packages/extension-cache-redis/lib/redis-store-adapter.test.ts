import type { StoreAdapterOptions } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { runTestsForStoreAdapter, type TestItem } from '@baeta/tests-cache-stores';
import Redis from 'ioredis';
import { RedisStoreAdapter } from './redis-store-adapter.ts';

const client = new Redis({
	host: 'localhost',
	port: 65535,
	db: 5,
	maxRetriesPerRequest: 0, // Fail fast in tests
});

function createStoreAdapter(options: StoreAdapterOptions<TestItem>) {
	return new RedisStoreAdapter(client, options);
}

test.beforeEach(async () => {
	await client.flushdb();
});

test.after(async () => {
	await client.quit();
});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'RedisStoreAdapter',
	testTtl: true,
});
