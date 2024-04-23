import { Store, StoreAdapter, StoreAdapterOptions } from '@baeta/extension-cache';
import Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter';

export class KeyvStore extends Store {
  constructor(protected keyv: Keyv) {
    super();
  }

  createStoreAdapter<T>(options: StoreAdapterOptions, type: string, hash: string): StoreAdapter<T> {
    return new KeyvStoreAdapter<T>(this.keyv, options, type, hash);
  }
}
