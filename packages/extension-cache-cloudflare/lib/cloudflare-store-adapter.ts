import { ParentRef, Ref, StoreAdapter, StoreOptions } from '@baeta/extension-cache';
import { DurableObjectNamespace } from '@cloudflare/workers-types';
import { CloudflareCacheClient } from './cloudflare-cache-client';

export class CloudflareStoreAdapter<Item> extends StoreAdapter<Item> {
	private client: CloudflareCacheClient;

	constructor(
		durableObject: DurableObjectNamespace,
		options: StoreOptions<Item> | undefined,
		type: string,
		hash: string,
	) {
		super(options, type, hash);
		this.client = new CloudflareCacheClient(durableObject);
	}

	saveMany = async (items: Item[]) => {
		const pairs = items.map(
			(item) => [this.createKeyByItem(item), JSON.stringify(item)] as [string, string],
		);
		await this.client.put(pairs, this.getTtl());
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
		const results = await this.client.get(keys).then((res) => res ?? null);
		return results.map((result) => (result == null ? null : (JSON.parse(result) as Item)));
	};

	saveQueryResult = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		data: Item | Item[],
	) => {
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const isList = Array.isArray(data);
		const items = isList ? data : [data];
		const refs = items.map((item) => this.getRef(item));

		if (refs.length === 0) {
			return;
		}

		await this.saveMany(items);
		await this.client.putOne(key, JSON.stringify([isList ? '1' : '0', ...refs]), this.getTtl());
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
		const key = this.createKeyByQuery(queryRef, parentRef, args);
		const [isListStr, ...refs] = await this.client
			.getOne(key)
			.then((res) => (res ? (JSON.parse(res) as string[]) : []));

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

		const items = await this.client.list(namespace);

		for await (const key of items) {
			if (key.match(matcher)) {
				keys.push(key);
			}
		}

		return keys;
	}
}
