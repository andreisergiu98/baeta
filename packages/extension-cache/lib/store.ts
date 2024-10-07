import type { StoreAdapter } from './store-adapter.ts';
import type { DefaultStoreOptions } from './store-options.ts';

export abstract class Store {
	abstract createStoreAdapter<T>(
		options: DefaultStoreOptions,
		type: string,
		hash: string,
	): StoreAdapter<T>;
}
