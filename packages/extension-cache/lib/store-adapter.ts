import type { Middleware } from '@baeta/core';
import { log } from '@baeta/util-log';
import DataLoader from 'dataloader';
import type { CacheArgs } from './cache-args.ts';
import { encodeArgs, encodeValue } from './encoder.ts';
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import {
	type CacheRef,
	type ItemRef,
	type ParentRef,
	type RefCompatibleRoot,
	getRefFallback,
	validateRefType,
} from './ref.ts';
import type { Serializer } from './serializer.ts';
import type { StoreOptions } from './store-options.ts';
import { alignItemsWithRefs, arrayIsComplete, fillNullItemsWithFallback } from './utils.ts';

export type CacheQueryMatching<Args> = {
	parentRef?: ParentRef;
	args?: CacheArgs<Args>;
};

export abstract class StoreAdapter<Item> {
	constructor(
		protected serializer: Serializer,
		protected options: StoreOptions<Item>,
		protected type: string,
		protected hash: string,
	) {
		this.getMany.bind(this);
	}

	abstract getPartialMany: (refs: ItemRef[]) => Promise<Array<Item | null> | null>;

	abstract saveMany: (items: Item[]) => Promise<void>;

	abstract deleteMany: (refs: ItemRef[], evictQueries?: boolean) => Promise<void>;

	protected abstract saveQueryMetadata: (
		queryRef: string,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => Promise<void>;

	protected abstract loadQueryMetadata: (
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => Promise<string[] | null>;

	protected abstract deleteQueriesByRef: <Result, Root, Args>(
		queryRef?: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => Promise<void>;

	protected loaderFn = async (refs: readonly ItemRef[]) => {
		const results = await this.getPartialMany(refs as ItemRef[]);
		if (results != null) {
			return results;
		}
		return new Array(refs.length).fill(null);
	};

	protected loader = new DataLoader<ItemRef, Item | null>(this.loaderFn, {
		cache: false,
	});

	get = (ref: ItemRef): Promise<Item | null> => {
		return this.loader.load(ref);
	};

	getMany(refs: ItemRef[]): Promise<Item[] | null>;
	getMany<T extends ItemRef>(refs: T[], fallback: (refs: T[]) => Promise<Item[]>): Promise<Item[]>;
	async getMany<T extends ItemRef>(refs: T[], fallback?: (refs: T[]) => Promise<Array<Item>>) {
		const results = await this.getPartialMany(refs);

		if (arrayIsComplete(results)) {
			return results;
		}

		if (!fallback) {
			return null;
		}

		const missingRefs =
			results == null ? refs : refs.filter((_ref, index) => results[index] == null);

		const missingItems = await fallback(missingRefs);

		this.saveMany(missingItems).catch((err) => {
			log.error(err, 'Failed to save missing items');
		});

		const { items, missing, extra } = fillNullItemsWithFallback(results ?? [], missingItems);

		if (missing > 0) {
			throw new Error(
				`Item count returned by the fallback method is less than missing refs count by ${missing}`,
			);
		}

		if (extra > 0) {
			log.warn(
				`Item count returned by the fallback method is greater than missing refs count by ${extra}. Extra items will be ignored.`,
			);
		}

		return items;
	}

	save = async (item: Item) => {
		return this.saveMany([item]);
	};

	delete = (ref: ItemRef, evictQueries?: boolean) => {
		return this.deleteMany([ref], evictQueries);
	};

	deleteQueries = <Result, Root, Args>(
		queryRef?: CacheRef<Result, Root, Args>,
		matcher?: CacheQueryMatching<Args>,
	) => {
		return this.deleteQueriesByRef(queryRef?.toString(), matcher?.parentRef, matcher?.args);
	};

	getQueryResult = async <Result, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		matcher?: CacheQueryMatching<Args>,
	) => {
		const meta = await this.loadQueryMetadata(
			queryRef.toString(),
			matcher?.parentRef,
			matcher?.args,
		);

		if (meta == null) {
			return null;
		}

		const [isListIndicator, ...encodedRefs] = meta;
		const isList = isListIndicator === '1';

		const nullableRefs = encodedRefs.map(this.decodeQueryItemRef);
		const refs = nullableRefs.filter((ref) => ref != null);

		const items = await this.getMany(refs);

		if (items == null) {
			return null;
		}

		const aligned = alignItemsWithRefs(nullableRefs, items);
		const result = isList ? aligned : aligned[0];

		return { query: result as Result };
	};

	saveQueryResult = async <Result, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		data: Result,
		matcher?: CacheQueryMatching<Args>,
	) => {
		const isList = Array.isArray(data);
		const isListIndicator = isList ? '1' : '0';

		const items = isList ? data : [data];
		const itemsFiltered = items.filter((item) => item != null);

		const encodedRefs = items.map((item) => this.encodeQueryItemRef(item));

		const itemsData = [isListIndicator, ...encodedRefs];

		if (items.length > 0) {
			await this.saveMany(itemsFiltered);
		}

		return this.saveQueryMetadata(
			queryRef.toString(),
			itemsData,
			matcher?.parentRef,
			matcher?.args,
		);
	};

	createMiddleware = <Result extends null | Item | Item[] | Array<Item | null>, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		...args: Root extends RefCompatibleRoot
			? [options?: CacheMiddlewareOptions<Root>]
			: [options: RequiredCacheMiddlewareOptions<Root>]
	): Middleware<Result, Root, unknown, Args> => {
		return async (params, next): Promise<Result> => {
			const [options] = args;

			const parentRef = options?.getRootRef
				? options.getRootRef(params.root)
				: getRefFallback(params.root);

			const matcher = { parentRef, args: params.args };

			const cached = await this.getQueryResult(queryRef, matcher).catch((err) => {
				log.error(err, `Failed to get query result for ${queryRef}. Proceeding with resolver.`);
				return null;
			});

			if (cached) {
				return cached.query;
			}

			const result = await next();
			this.saveQueryResult(queryRef, result, matcher).catch((err) => {
				log.error(err, `Failed to save query result for ${queryRef}`);
			});
			return result;
		};
	};

	protected createKey(ref: ItemRef) {
		return `${this.type}:items:${this.getRevision()}:${ref.toString()}`;
	}

	protected createKeyByItem(item: Item) {
		return this.createKey(this.getRef(item));
	}

	protected createKeyByQuery(
		queryRef: string,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) {
		return `${this.createQueryKeyNamespace(queryRef)}:${this.createQueryKeyHeader(parentRef, args)}`;
	}

	protected createQueryKeyNamespace(queryRef: string) {
		return `${this.type}:${queryRef}:${this.getRevision()}`;
	}

	protected createQueryKeyHeader(parentRef: ParentRef, args?: Record<string, unknown>) {
		const encodedArgs = encodeArgs(this.serializer, args);
		const encodedParentRef = encodeValue(this.serializer, parentRef);
		return `parent#${encodedParentRef}#args#${encodedArgs}`;
	}

	protected createQueryKeyRegExpMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	) {
		const parentMatcher = encodeValue(this.serializer, parentRef, '.*');
		const argsMatcher = encodeArgs(this.serializer, args, '.*');
		const pattern = `^${this.createQueryKeyNamespace(queryRef)}:parent#${parentMatcher}#args#.*${argsMatcher}.*`;
		return new RegExp(pattern);
	}

	protected createQueryKeyGlobMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	) {
		const parentMatcher = encodeValue(this.serializer, parentRef, '*');
		const argsMatcher = encodeArgs(this.serializer, args, '*');
		return `${this.createQueryKeyNamespace(queryRef)}:parent#${parentMatcher}#args#*${argsMatcher}*`;
	}

	protected getRef(root: Item): ItemRef {
		if (this.options?.getRef) {
			return this.options.getRef(root);
		}

		if (root == null) {
			throw new Error('Object is null or undefined, cannot get ref');
		}

		if (typeof root === 'object' && 'id' in root) {
			validateRefType(root.id);
			return root.id.toString();
		}

		throw new Error('Object does not have id. Define getRef function in cache options');
	}

	protected encodeQueryItemRef(item: null | Item) {
		if (item == null) {
			return 'null';
		}
		const ref = this.getRef(item);
		return `ref_${ref}`;
	}

	protected decodeQueryItemRef(encodedRef: string) {
		if (encodedRef === 'null') {
			return null;
		}
		return encodedRef.substring(4);
	}

	protected getRevision() {
		const version = this.options?.revision?.toString() || '0';
		return `r${version}_${this.hash}`;
	}

	protected parseItem(value: string): Item {
		return this.serializer.parse(value);
	}

	protected stringifyItem(item: Item) {
		return this.serializer.stringify(item);
	}
}
