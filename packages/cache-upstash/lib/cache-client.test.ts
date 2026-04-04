import test from '@baeta/testing';
import { runTestsForClient } from '@baeta/tests-cache-clients';
import { UpstashCacheClient } from './cache-client.ts';

const client = new UpstashCacheClient({
	url: 'http://localhost:60080',
	token: 'example_token',
});

runTestsForClient(
	async () => {
		return client;
	},
	test,
	'UpstashCacheClient',
);
