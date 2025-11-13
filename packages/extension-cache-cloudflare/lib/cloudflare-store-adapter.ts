import {
	type CacheRef,
	type ItemRef,
	type ParentRef,
	StoreAdapter,
	type StoreAdapterOptions,
} from '@baeta/extension-cache';
import { CloudflareCacheClient } from './cloudflare-cache-client.ts';

export class CloudflareStoreAdapter<Item> extends StoreAdapter<Item> {
	private readonly client: CloudflareCacheClient;

	constructor(durableObject: DurableObjectNamespace, options: StoreAdapterOptions<Item>) {
		super(options);
		this.client = new CloudflareCacheClient(durableObject);
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		const keys = refs.map((ref) => this.createItemKeyByRef(ref));
		const results = await this.client.get(keys).then((res) => res ?? null);
		return results.map((result) => (result == null ? null : this.parseItem(result)));
	};

	saveMany = async (items: Item[]) => {
		const pairs = items.map(
			(item) => [this.createItemKey(item), this.stringifyItem(item)] as [string, string],
		);
		await this.client.put(pairs, this.getTtl());
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
		await this.client.putOne(key, JSON.stringify(meta), this.getTtl());
	};

	protected loadQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		const meta = await this.client
			.getOne(key)
			.then((res) => (res ? (JSON.parse(res) as string[]) : []));

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

		const items = await this.client.list(namespace);

		for (const key of items) {
			if (matcher.exec(key)) {
				keys.push(key);
			}
		}

		return keys;
	}
}
