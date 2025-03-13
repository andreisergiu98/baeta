import { type StoreOptions, createSerializer } from '@baeta/extension-cache';
import test from '@baeta/testing';
import { type TestItem, runTestsForStoreAdapter } from '@baeta/tests-cache-stores';
import { Miniflare } from 'miniflare';
import { bundleTest } from '../scripts/bundle-worker.ts';
import { CloudflareCacheClient } from './cloudflare-cache-client.ts';
import { CloudflareStoreAdapter } from './cloudflare-store-adapter.ts';

await bundleTest();

const mf = new Miniflare({
	modules: true,
	scriptPath: './dist/create-env.js',
	durableObjects: {
		BAETA_CACHE: 'BaetaCache',
	},
});

const env: { BAETA_CACHE: DurableObjectNamespace } = await mf.getBindings();
const store = env.BAETA_CACHE;

function createStoreAdapter(options: StoreOptions<TestItem>) {
	const serializer = createSerializer();
	return new CloudflareStoreAdapter(store, serializer, options, 'test', 'test-hash');
}

test.beforeEach(async () => {
	const client = new CloudflareCacheClient(store);
	await client.flush();
});

test.after(async () => {
	await mf.dispose();
});

runTestsForStoreAdapter(createStoreAdapter, test, {
	name: 'CloudflareStoreAdapter',
	serializer: createSerializer(),
	testTtl: true,
});
