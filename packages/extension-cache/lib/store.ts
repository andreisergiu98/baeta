import type { StoreAdapter, StoreAdapterOptions } from './store-adapter.ts';

export abstract class Store {
	abstract createStoreAdapter<T>(
		options: StoreAdapterOptions,
		type: string,
		hash: string,
	): StoreAdapter<T>;
}
