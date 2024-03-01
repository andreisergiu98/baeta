import type Redis from 'ioredis';
import type Keyv from 'keyv';
import { KeyvStoreAdapter } from './keyv-store-adapter';
import { RedisStoreAdapter } from './redis-store-adapter';
import { Options, StoreAdapter } from './store-adapter';

export abstract class Store {
  abstract createStoreAdapter<T>(options: Options, type: string, hash: string): StoreAdapter<T>;
}

export class KeyvStore extends Store {
  constructor(protected keyv: Keyv) {
    super();
  }

  createStoreAdapter<T>(options: Options, type: string, hash: string): StoreAdapter<T> {
    return new KeyvStoreAdapter<T>(this.keyv, options, type, hash);
  }
}

export class RedisStore extends Store {
  constructor(protected client: Redis) {
    super();
  }

  createStoreAdapter<T>(options: Options, type: string, hash: string): StoreAdapter<T> {
    return new RedisStoreAdapter<T>(this.client, options, type, hash);
  }
}
