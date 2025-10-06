import {
	type ItemRef,
	type ParentRef,
	type Serializer,
	StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type Keyv from 'keyv';

export class KeyvStoreAdapter<Item> extends StoreAdapter<Item> {
	private client: Keyv;

	constructor(
		client: Keyv,
		serializer: Serializer,
		options: StoreOptions<Item>,
		type: string,
		hash: string,
	) {
		super(serializer, options, type, hash);
		this.client = client;
		if (this.client.iterator == null) {
			throw new Error('Keyv client does not support iterator');
		}
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}

		const keys = refs.map((ref) => this.createKey(ref));
		const result = await this.client.get(keys);

		return result.map((item) => {
			if (item == null) {
				return null;
			}
			return this.parseItem(item);
		});
	};

	save = async (item: Item) => {
		const key = this.createKeyByItem(item);
		await this.client.set(key, this.stringifyItem(item), this.getTtl());
	};

	saveMany = async (items: Item[]) => {
		await Promise.all(items.map((root) => this.save(root)));
	};

	deleteMany = async (refs: ItemRef[], evictQueries = true) => {
		if (refs.length === 0) {
			return;
		}

		const keys = refs.map((ref) => this.createKey(ref));
		await this.client.delete(keys);

		if (evictQueries) {
			await this.deleteQueries();
		}
	};

	protected saveQueryMetadata = async (
		queryRef: string,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		await this.client.set(key, meta, this.getTtl());
	};

	protected loadQueryMetadata = async (
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const meta = await this.client.get(key).then((res) => (res ?? []) as string[]);
		if (meta.length === 0) {
			return null;
		}
		return meta;
	};

	protected deleteQueriesByRef = async (
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

	protected async searchQueries(
		queryRef = '*',
		parentRef: NonNullable<ParentRef> = '*',
		args: Record<string, unknown> = {},
	) {
		const keys: string[] = [];
		const matcher = this.createQueryKeyRegExpMatcher(queryRef, parentRef, args);
		const namespace = queryRef === '*' ? '' : this.createQueryKeyNamespace(queryRef);

		if (this.client.iterator == null) {
			throw new Error('Keyv client does not support iterator');
		}

		for await (const item of this.client.iterator(undefined)) {
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
