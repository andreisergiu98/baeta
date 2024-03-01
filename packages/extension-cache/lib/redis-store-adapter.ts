import type Redis from 'ioredis';
import { ParentRef, Ref, StoreAdapter, StoreOptions } from './store-adapter';

export class RedisStoreAdapter<Item> extends StoreAdapter<Item> {
  constructor(
    private client: Redis,
    options: StoreOptions<Item> | undefined,
    type: string,
    hash: string,
  ) {
    super(options, type, hash);
  }

  protected loadMany = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
    const keys = refs.map((ref) => this.createKey(ref));
    const results = await this.client.mget(keys);

    return results.map((result) => {
      if (result == null) {
        return null;
      }
      return JSON.parse(result) as Item;
    });
  };

  save = async (item: Item) => {
    const key = this.createKeyByItem(item);
    const ttl = this.options?.ttl;

    if (ttl) {
      await this.client.set(key, JSON.stringify(item), 'EX', ttl);
    } else {
      await this.client.set(key, JSON.stringify(item));
    }
  };

  saveMany = async (items: Item[]) => {
    if (items.length === 0) {
      return;
    }

    let pipeline = this.client.pipeline();

    for (const item of items) {
      const key = this.createKeyByItem(item);
      const ttl = this.options?.ttl;

      if (ttl) {
        pipeline = pipeline.set(key, JSON.stringify(item), 'EX', ttl);
      } else {
        pipeline = pipeline.set(key, JSON.stringify(item));
      }
    }

    const [err] = (await pipeline.exec()) ?? [];

    if (err) {
      throw err;
    }
  };

  deleteOne = async (ref: Ref, evictQueries = true) => {
    const key = this.createKey(ref);
    await this.client.unlink(key);

    if (evictQueries) {
      await this.deleteQueries();
    }
  };

  deleteMany = async (refs: Ref[], evictQueries = true) => {
    const keys = refs.map((ref) => this.createKey(ref));
    await this.client.unlink(keys);

    if (evictQueries) {
      await this.deleteQueries();
    }
  };

  getQueryResult = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);
    const refs = await this.client.lrange(key, 0, -1);

    if (refs.length < 1) {
      return null;
    }

    return this.get(refs[0]);
  };

  getQueryResults = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);
    const refs = await this.client.lrange(key, 0, -1);

    if (refs.length < 1) {
      return null;
    }

    return this.getMany(refs);
  };

  saveQueryResult = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
    data: Item | Item[],
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);

    const isList = Array.isArray(data);

    const refs = isList ? data.map(this.getRef) : [this.getRef(data as Item)];

    let pipeline = this.client
      .pipeline()
      .del(key)
      .lpush(key, isList ? '1' : '0')
      .lpush(key, ...refs);

    if (this.options?.ttl) {
      pipeline = pipeline.expire(key, this.options.ttl);
    }

    if (isList) {
      await this.saveMany(data);
    } else {
      await this.save(data);
    }

    const [err] = (await pipeline.exec()) ?? [];

    if (err) {
      throw err;
    }
  };

  deleteQueries = async (
    queryRef?: string,
    parentRef?: ParentRef,
    args?: Record<string, unknown>,
  ) => {
    const keys = await this.searchQueries(queryRef, parentRef ?? undefined, args);
    await this.client.unlink(keys);
  };

  protected async searchQueries(
    queryRef = '*',
    parentRef: NonNullable<ParentRef> = '*',
    args: Record<string, unknown> = {},
  ) {
    const matcher = this.createQueryKeyGlobMatcher(queryRef, parentRef, args);
    return this.scanKeys(matcher);
  }

  protected async scanKeys(matcher: string) {
    return new Promise<string[]>((resolve, reject) => {
      const keys: string[] = [];

      const stream = this.client.scanStream({
        match: matcher,
      });

      stream.on('data', (result) => {
        keys.push(...result);
      });

      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('end', () => {
        resolve(keys);
      });
    });
  }
}
