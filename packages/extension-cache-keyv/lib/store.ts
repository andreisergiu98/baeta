import { Store, type StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
import type Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter.ts';

export class KeyvStore extends Store {
	constructor(protected keyv: Keyv) {
		super();
	}

	createStoreAdapter<T>(options: StoreOptions<T>, type: string, hash: string): StoreAdapter<T> {
		return new KeyvStoreAdapter<T>(this.keyv, options, type, hash);
	}
}
