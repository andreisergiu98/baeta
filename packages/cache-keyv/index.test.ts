import test from '@baeta/testing';
import { runTestsForClient } from '@baeta/tests-cache-clients';
import KeyvEtcd from '@keyv/etcd';
import Keyv from 'keyv';
import { KeyvCacheClient } from './index.ts';

const etcd = new KeyvEtcd('http://localhost:22379');
const keyv = new Keyv({ store: etcd });

test.after.always(async () => {
	await keyv.disconnect();
});

runTestsForClient(async () => new KeyvCacheClient(keyv), test, 'KeyvCacheClient');
