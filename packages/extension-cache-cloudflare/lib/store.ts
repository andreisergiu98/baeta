import {
	type Serializer,
	Store,
	type StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareStoreAdapter } from './cloudflare-store-adapter.ts';

export class CloudflareStore extends Store {
	protected client: DurableObjectNamespace;
	constructor(client: DurableObjectNamespace) {
		super();
		this.client = client;
	}

	createStoreAdapter<T>(
		serializer: Serializer,
		options: StoreOptions<T>,
		type: string,
	): StoreAdapter<T> {
		return new CloudflareStoreAdapter<T>(this.client, serializer, options, type);
	}
}
