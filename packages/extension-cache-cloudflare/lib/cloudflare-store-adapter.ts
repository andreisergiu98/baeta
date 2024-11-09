import {
	type ItemRef,
	type ParentRef,
	StoreAdapter,
	type StoreOptions,
} from '@baeta/extension-cache';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareCacheClient } from './cloudflare-cache-client.ts';

export class CloudflareStoreAdapter<Item> extends StoreAdapter<Item> {
	private client: CloudflareCacheClient;

	constructor(
		durableObject: DurableObjectNamespace,
		options: StoreOptions<Item>,
		type: string,
		hash: string,
	) {
		super(options, type, hash);
		this.client = new CloudflareCacheClient(durableObject);
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		const keys = refs.map((ref) => this.createKey(ref));
		const results = await this.client.get(keys).then((res) => res ?? null);
		return results.map((result) => (result == null ? null : (JSON.parse(result) as Item)));
	};

	saveMany = async (items: Item[]) => {
		const pairs = items.map(
			(item) => [this.createKeyByItem(item), JSON.stringify(item)] as [string, string],
		);
		await this.client.put(pairs, this.getTtl());
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
		await this.client.putOne(key, JSON.stringify(meta), this.getTtl());
	};

	protected loadQueryMetadata = async (
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const meta = await this.client
			.getOne(key)
			.then((res) => (res ? (JSON.parse(res) as string[]) : []));

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

		const items = await this.client.list(namespace);

		for await (const key of items) {
			if (key.match(matcher)) {
				keys.push(key);
			}
		}

		return keys;
	}
}
