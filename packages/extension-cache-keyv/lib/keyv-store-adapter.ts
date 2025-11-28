import {
	type CacheRef,
	type ItemRef,
	type ParentRef,
	StoreAdapter,
	type StoreAdapterOptions,
} from '@baeta/extension-cache';
import type Keyv from 'keyv';

export class KeyvStoreAdapter<Item> extends StoreAdapter<Item> {
	private readonly client: Keyv;

	constructor(client: Keyv, options: StoreAdapterOptions<Item>) {
		super(options);
		this.client = client;
		if (this.client.iterator == null) {
			throw new Error('Keyv client does not support iterator');
		}
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}

		const keys = refs.map((ref) => this.createItemKeyByRef(ref));
		const result = await this.client.get(keys);

		return result.map((item) => {
			if (item == null) {
				return null;
			}
			return this.parseItem(item);
		});
	};

	save = async (item: Item) => {
		const key = this.createItemKey(item);
		await this.client.set(key, this.stringifyItem(item), this.getTtl());
	};

	saveMany = async (items: Item[]) => {
		await Promise.all(items.map((root) => this.save(root)));
	};

	deleteMany = async (refs: ItemRef[], evictQueries = true) => {
		if (refs.length === 0) {
			return;
		}

		const keys = refs.map((ref) => this.createItemKeyByRef(ref));
		await this.client.delete(keys);

		if (evictQueries) {
			await this.deleteQueries();
		}
	};

	protected saveQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		await this.client.set(key, meta, this.getTtl());
	};

	protected loadQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		const meta = await this.client.get(key).then((res) => (res ?? []) as string[]);
		if (meta.length === 0) {
			return null;
		}
		return meta;
	};

	protected deleteQueriesByRef = async (
		queryRef?: CacheRef<unknown, unknown, unknown>,
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

	protected async searchQueries(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) {
		const keys: string[] = [];
		const matcher =
			queryRef == null
				? this.createQueryKeyRegExpMatcher()
				: this.createQueryKeyRegExpMatcher(queryRef, parentRef, args);
		const namespace = queryRef == null ? '' : this.createQueryKeyPrefix(queryRef.toString());

		if (this.client.iterator == null) {
			throw new Error('Keyv client does not support iterator');
		}

		for await (const item of this.client.iterator(undefined)) {
			const key: string = item[0];

			if (!key.startsWith(namespace)) {
				continue;
			}

			if (matcher.exec(key)) {
				keys.push(key);
			}
		}

		return keys;
	}
}
