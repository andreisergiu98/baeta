import type { StoreAdapter } from './store-adapter.ts';
import type { StoreOptions } from './store-options.ts';

export abstract class Store {
	abstract createStoreAdapter<T>(
		options: StoreOptions<T>,
		type: string,
		hash: string,
	): StoreAdapter<T>;
}
