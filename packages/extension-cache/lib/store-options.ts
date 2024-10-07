import type { ItemRef, RefCompatibleRoot } from './ref.ts';

export interface DefaultStoreOptions {
	ttl?: number;
}

type StoreOptionsBase = DefaultStoreOptions & {
	version?: number;
};

type StoreOptionsRefFn<Root> = {
	getRef?: (root: Root) => ItemRef;
};

type StoreOptionsRef<Root> = Root extends RefCompatibleRoot
	? StoreOptionsRefFn<Root>
	: Required<StoreOptionsRefFn<Root>>;

export type StoreOptions<Root> = StoreOptionsBase & StoreOptionsRef<Root>;
