import { Store, type StoreAdapter, type StoreAdapterOptions } from '@baeta/extension-cache';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareStoreAdapter } from './cloudflare-store-adapter.ts';

export class CloudflareStore extends Store {
	protected client: DurableObjectNamespace;
	constructor(client: DurableObjectNamespace) {
		super();
		this.client = client;
	}

	createStoreAdapter<T>(options: StoreAdapterOptions<T>): StoreAdapter<T> {
		return new CloudflareStoreAdapter<T>(this.client, options);
	}
}
