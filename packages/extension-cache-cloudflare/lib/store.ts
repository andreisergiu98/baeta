import {
	type Serializer,
	Store,
	type StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareStoreAdapter } from './cloudflare-store-adapter.ts';

export class CloudflareStore extends Store {
	constructor(protected client: DurableObjectNamespace) {
		super();
	}

	createStoreAdapter<T>(
		serializer: Serializer,
		options: StoreOptions<T>,
		type: string,
		hash: string,
	): StoreAdapter<T> {
		return new CloudflareStoreAdapter<T>(this.client, serializer, options, type, hash);
	}
}
