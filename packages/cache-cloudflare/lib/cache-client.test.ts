import test from '@baeta/testing';
import { runTestsForClient } from '@baeta/tests-cache-clients';
import { Miniflare } from 'miniflare';
import { bundleTest } from '../__test__/bundle-worker.ts';
import { CloudflareCacheClient } from './cache-client.ts';

await bundleTest();

const mf = new Miniflare({
	modules: true,
	scriptPath: './dist/create-env.js',
	durableObjects: {
		BAETA_CACHE: {
			className: 'BaetaCache',
			useSQLite: true,
		},
	},
});
const env: { BAETA_CACHE: DurableObjectNamespace } = await mf.getBindings();
const store = env.BAETA_CACHE;

test.after.always(async () => {
	await mf.dispose();
});

runTestsForClient(async () => new CloudflareCacheClient(store), test, 'CloudflareCacheClient');
