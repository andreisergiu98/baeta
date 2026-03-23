import test from '@baeta/testing';
import { runTestsForClient } from '@baeta/tests-cache-clients';
import Redis from 'ioredis';
import { RedisCacheClient } from './cache-client.ts';

const client = new Redis({
	host: 'localhost',
	port: 65535,
	db: 5,
	maxRetriesPerRequest: 0,
});

test.after.always(async () => {
	await client.quit();
});

runTestsForClient(
	async () => {
		return new RedisCacheClient(client);
	},
	test,
	'RedisCacheClient',
);
