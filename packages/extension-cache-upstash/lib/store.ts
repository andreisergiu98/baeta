import { Store, type StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
import type { Redis } from '@upstash/redis';
import { UpstashStoreAdapter } from './upstash-store-adapter.ts';

export class UpstashStore extends Store {
	constructor(protected client: Redis) {
		super();
	}

	createStoreAdapter<T>(options: StoreOptions<T>, type: string, hash: string): StoreAdapter<T> {
		return new UpstashStoreAdapter<T>(this.client, options, type, hash);
	}
}
