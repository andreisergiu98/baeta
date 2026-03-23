import test from '@baeta/testing';
import { runTestsForClient } from '@baeta/tests-cache-clients';
import Valkey from 'iovalkey';
import { ValkeyCacheClient } from './cache-client.ts';

const client = new Valkey({
	host: 'localhost',
	port: 65534,
	db: 5,
	maxRetriesPerRequest: 0,
});

test.after.always(async () => {
	await client.quit();
});

runTestsForClient(
	async () => {
		return new ValkeyCacheClient(client);
	},
	test,
	'ValkeyCacheClient',
);
