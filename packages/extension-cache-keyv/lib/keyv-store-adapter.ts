import { ParentRef, Ref, StoreAdapter, StoreOptions } from '@baeta/extension-cache';
import type Keyv from 'keyv';

export class KeyvStoreAdapter<Item> extends StoreAdapter<Item> {
  constructor(
    private client: Keyv,
    options: StoreOptions<Item> | undefined,
    type: string,
    hash: string,
  ) {
    super(options, type, hash);
  }

  save = async (item: Item) => {
    const key = this.createKeyByItem(item);
    await this.client.set(key, item, this.getTtl());
  };

  saveMany = async (items: Item[]) => {
    await Promise.all(items.map((root) => this.save(root)));
  };

  deleteMany = async (refs: Ref[], evictQueries = true) => {
    if (refs.length === 0) {
      return;
    }

    const keys = refs.map((ref) => this.createKey(ref));
    await this.client.delete(keys);

    if (evictQueries) {
      await this.deleteQueries();
    }
  };

  protected loadMany = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
    if (refs.length === 0) {
      return null;
    }
    const keys = refs.map((ref) => this.createKey(ref));
    return this.client.get(keys).then((res) => res ?? null);
  };

  saveQueryResult = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
    data: Item | Item[],
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);
    const isList = Array.isArray(data);
    const items = isList ? data : [data];
    const refs = items.map((item) => this.getRef(item));

    if (refs.length === 0) {
      return;
    }

    await this.saveMany(items);
    await this.client.set(key, [isList ? '1' : '0', ...refs], this.getTtl());
  };

  deleteQueries = async (
    queryRef?: string,
    parentRef?: ParentRef,
    args?: Record<string, unknown>,
  ) => {
    const keys = await this.searchQueries(queryRef, parentRef ?? undefined, args);

    if (keys.length > 0) {
      await this.client.delete(keys);
    }
  };

  protected getTtl = () => {
    if (this.options?.ttl) {
      return this.options.ttl * 1000;
    }
  };

  protected loadQueryResults = async (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
  ) => {
    const key = this.createQueryKey(queryRef, parentRef, args);
    const [isListStr, ...refs] = await this.client.get(key).then((res) => (res ?? []) as string[]);

    if (refs.length < 1) {
      return null;
    }

    const isList = isListStr === '1';
    const items = await this.getMany(refs);

    if (items == null) {
      return null;
    }

    return { items, isList };
  };

  protected async searchQueries(
    queryRef = '*',
    parentRef: NonNullable<ParentRef> = '*',
    args: Record<string, unknown> = {},
  ) {
    const keys: string[] = [];
    const matcher = this.createQueryKeyRegExpMatcher(queryRef, parentRef, args);
    const namespace = queryRef === '*' ? '' : this.createQueryKeyNamespace(queryRef);

    for await (const item of this.client.iterator()) {
      const key: string = item[0];

      if (!key.startsWith(namespace)) {
        continue;
      }

      if (key.match(matcher)) {
        keys.push(key);
      }
    }

    return keys;
  }
}
