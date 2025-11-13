import test from '@baeta/testing';
import { runTestsForStoreAdapter } from '@baeta/tests-cache-stores';
import * as minimatch from 'minimatch';
import type { CacheRef, ItemRef, ParentRef } from './ref.ts';
import { StoreAdapter, type StoreAdapterOptions } from './store-adapter.ts';

class MockStoreAdapter<T> extends StoreAdapter<T> {
	private readonly store = new Map<string, string>();
	private readonly queryStore = new Map<string, string[]>();
	private readonly withGlobMatching;

	constructor(options: StoreAdapterOptions<T>, withGlobMatching = false) {
		super(options);
		this.withGlobMatching = withGlobMatching;
	}

	getPartialMany = async (refs: ItemRef[]): Promise<Array<T | null> | null> => {
		return refs.map((ref) => {
			const result = this.store.get(this.createItemKeyByRef(ref));
			return result == null ? null : this.parseItem(result);
		});
	};

	saveMany = async (items: T[]): Promise<void> => {
		for (const item of items) {
			this.store.set(this.createItemKey(item), this.stringifyItem(item));
		}
	};

	deleteMany = async (refs: ItemRef[], _evictQueries?: boolean): Promise<void> => {
		for (const ref of refs) {
			this.store.delete(this.createItemKeyByRef(ref));
		}
	};

	protected saveQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): Promise<void> => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		this.queryStore.set(key, meta);
	};

	protected loadQueryMetadata = async (
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): Promise<string[] | null> => {
		const key = this.createQueryKey(queryRef, parentRef, args);
		return this.queryStore.get(key) || null;
	};

	protected deleteQueriesByRef = async (
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	): Promise<void> => {
		if (this.withGlobMatching) {
			this.deleteQueriesByGlobMatcher(queryRef, parentRef, args);
		} else {
			this.deleteQueriesByRegExpMatcher(queryRef, parentRef, args);
		}
	};

	private deleteQueriesByGlobMatcher(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) {
		const matcher =
			queryRef == null
				? this.createQueryKeyGlobMatcher()
				: this.createQueryKeyGlobMatcher(queryRef, parentRef ?? undefined, args);
		const keys = Array.from(this.queryStore.keys());
		const foundKeys = minimatch.match(keys, matcher);
		for (const key of foundKeys) {
			this.queryStore.delete(key);
		}
	}

	private deleteQueriesByRegExpMatcher(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) {
		const matcher =
			queryRef == null
				? this.createQueryKeyRegExpMatcher()
				: this.createQueryKeyRegExpMatcher(queryRef, parentRef ?? undefined, args);
		const keys = Array.from(this.queryStore.keys());
		const foundKeys = keys.filter((key) => matcher.test(key));
		for (const key of foundKeys) {
			this.queryStore.delete(key);
		}
	}
}

runTestsForStoreAdapter((options) => new MockStoreAdapter(options, true), test, {
	name: 'MockStoreAdapterGlobMatching',
	testTtl: false,
});

runTestsForStoreAdapter((options) => new MockStoreAdapter(options, false), test, {
	name: 'MockStoreAdapterRegExpMatching',
	testTtl: false,
});
