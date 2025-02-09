import { Store, type StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareStoreAdapter } from './cloudflare-store-adapter.ts';

export class CloudflareStore extends Store {
	constructor(protected client: DurableObjectNamespace) {
		super();
	}

	createStoreAdapter<T>(options: StoreOptions<T>, type: string, hash: string): StoreAdapter<T> {
		return new CloudflareStoreAdapter<T>(this.client, options, type, hash);
	}
}
