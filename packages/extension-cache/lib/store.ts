import { StoreAdapter, StoreAdapterOptions } from './store-adapter';

export abstract class Store {
	abstract createStoreAdapter<T>(
		options: StoreAdapterOptions,
		type: string,
		hash: string,
	): StoreAdapter<T>;
}
