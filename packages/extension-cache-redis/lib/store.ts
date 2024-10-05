import { Store, type StoreAdapter, type StoreAdapterOptions } from '@baeta/extension-cache';
import type Redis from 'ioredis';
import { RedisStoreAdapter } from './redis-store-adapter.ts';

export class RedisStore extends Store {
	constructor(protected client: Redis) {
		super();
	}

	createStoreAdapter<T>(options: StoreAdapterOptions, type: string, hash: string): StoreAdapter<T> {
		return new RedisStoreAdapter<T>(this.client, options, type, hash);
	}
}
