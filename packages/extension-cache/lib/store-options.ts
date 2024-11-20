import type { ItemRef } from './ref.ts';

export interface DefaultStoreOptions {
	ttl?: number;
}

export interface StoreOptions<Root> extends DefaultStoreOptions {
	revision?: number;
	getRef?: (root: Root) => ItemRef;
}

export interface RequiredStoreOptions<Root> extends StoreOptions<Root> {
	getRef: (root: Root) => ItemRef;
}
