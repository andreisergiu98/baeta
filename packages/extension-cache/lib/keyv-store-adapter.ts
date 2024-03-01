import type Keyv from 'keyv';
import { ParentRef, Ref, StoreAdapter, StoreOptions } from './store-adapter';

export class KeyvStoreAdapter<Item> extends StoreAdapter<Item> {
  constructor(
    private client: Keyv,
    options: StoreOptions<Item> | undefined,
    type: string,
    hash: string,
  ) {
    super(options, type, hash);
  }

  protected loadMany = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
    return Promise.all(
      refs.map((ref) => {
        const key = this.createKey(ref);
        return this.client.get(key) ?? null;
      }),
    );
  };

  save = async (item: Item) => {
    const key = this.createKeyByItem(item);
    await this.client.set(key, item, this.options?.ttl);
  };

  saveMany = async (items: Item[]) => {
    await Promise.all(items.map((root) => this.save(root)));
  };

  deleteOne = async (ref: Ref, evictQueries = true) => {
    const key = this.createKey(ref);
    await this.client.delete(key);

    if (evictQueries) {
      await this.deleteQueries();
    }
  };

  deleteMany = async (refs: Ref[], evictQueries = true) => {
    await Promise.all(refs.map((id) => this.deleteOne(id)));

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
    const refs = (await this.client.get(key)) as Ref[] | null;

    if (refs == null || refs.length === 0) {
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
    const refs = (await this.client.get(key)) as Ref[] | null;

    if (refs == null || refs.length === 0) {
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
    const refs = isList ? data.map(this.getRef) : [this.getRef(data)];

    if (isList) {
      await this.saveMany(data);
    } else {
      await this.save(data);
    }

    await this.client.set(key, [isList ? '1' : '0', refs], this.options?.ttl);
  };

  saveQueryResults = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
    roots: Item[],
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);
    const refs = roots.map((root) => this.getRef(root));

    await this.saveMany(roots);
    await this.client.set(key, refs, this.options?.ttl);
  };

  deleteQueries = async (
    queryRef?: string,
    parentRef?: ParentRef,
    args?: Record<string, unknown>,
  ) => {
    const keys = await this.searchQueries(queryRef, parentRef ?? undefined, args);
    await Promise.all(keys.map((key) => this.client.delete(key)));
  };

  protected async searchQueries(
    queryRef = '*',
    parentRef: NonNullable<ParentRef> = '*',
    args: Record<string, unknown> = {},
  ) {
    const keys: string[] = [];
    const matcher = this.createQueryKeyRegExpMatcher(queryRef, parentRef, args);
    const namespace = this.createQueryKeyNamespace(queryRef === '*' ? '' : queryRef);

    for await (const item of this.client.iterator(namespace)) {
      const key: string = item[0];

      if (key.match(matcher)) {
        keys.push(key);
      }
    }

    return keys;
  }
}
