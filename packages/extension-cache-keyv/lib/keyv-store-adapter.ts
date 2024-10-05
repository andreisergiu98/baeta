import { type ParentRef, type Ref, StoreAdapter, type StoreOptions } from '@baeta/extension-cache';
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

	protected saveQueryMetadata = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		meta: string[],
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		await this.client.set(key, meta, this.getTtl());
	};

	protected loadQueryMetadata = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const meta = await this.client.get(key).then((res) => (res ?? []) as string[]);
		if (meta.length === 0) {
			return null;
		}
		return meta;
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
