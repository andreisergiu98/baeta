import type { Middleware } from '@baeta/core';
import { encodeBase64Url } from '@baeta/util-encoding';
import { log } from '@baeta/util-log';
import DataLoader from 'dataloader';
import { flatten } from 'flat';
import type { CacheArgs } from './cache-args.ts';
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import type { CacheRef, ItemRef, ParentRef, RefCompatibleRoot } from './ref.ts';
import type { StoreOptions } from './store-options.ts';

export type CacheQueryMatching<Args> = {
	parentRef?: ParentRef;
	args?: CacheArgs<Args>;
};

export abstract class StoreAdapter<Item> {
	constructor(
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
	getMany<T extends ItemRef>(
		refs: T[],
		fallback: (refs: T[]) => Promise<Array<Item>>,
	): Promise<Item[]>;
	async getMany<T extends ItemRef>(refs: T[], fallback?: (refs: T[]) => Promise<Array<Item>>) {
		const results = await this.getPartialMany(refs);

		if (!fallback) {
			if (results == null) {
				return null;
			}

			const isPartial = results.some((result) => result == null);

			if (isPartial) {
				return null;
			}

			return results as Item[];
		}

		const missingRefs =
			results == null ? refs : refs.filter((_ref, index) => results[index] == null);

		const missingItems = await fallback(missingRefs);

		this.saveMany(missingItems).catch((err) => {
			log.error(err, 'Failed to save missing items');
		});

		if (missingItems.length < missingRefs.length) {
			throw new Error(
				'Item count returned by the fallback method is less than missing refs count.',
			);
		}

		if (missingItems.length > missingRefs.length) {
			log.warn(
				'Item count returned by the fallback method is greater than missing refs count. Extra items will be ignored.',
			);
		}

		if (results == null) {
			return missingItems;
		}

		for (let i = 0, j = 0; i < results.length; i++) {
			if (results[i] == null) {
				results[i] = missingItems[j++];
			}
		}

		return results as Item[];
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

		const ordered = this.refillNullQueryItems(nullableRefs, items);
		const result = isList ? ordered : ordered[0];

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
				: this.getRefFallback(params.root);

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
		const namespace = this.createQueryKeyNamespace(queryRef);
		const metadata = this.createQueryKeyHeader(parentRef, args);
		return `${namespace}:${metadata}`;
	}

	protected getRevision() {
		const version = this.options?.revision?.toString() || '0';
		return `r${version}_${this.hash}`;
	}

	protected createQueryKeyNamespace(queryRef: string) {
		return `${this.type}:${queryRef}:${this.getRevision()}`;
	}

	protected createQueryKeyHeader(parentRef: ParentRef, args?: Record<string, unknown>) {
		const encodedArgs = this.encodeQueryArgs(args);
		const encodedParentRef = this.encodePrimitive(parentRef);
		return `parent#${encodedParentRef}#args#${encodedArgs}`;
	}

	protected createQueryKeyRegExpMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	) {
		const parentMatcher = this.encodePrimitive(parentRef, '.*');
		const argsMatcher = this.encodeQueryArgs(args, '.*');
		const pattern = `^${this.createQueryKeyNamespace(queryRef)}:parent#${parentMatcher}#args#.*${argsMatcher}.*`;
		return new RegExp(pattern);
	}

	protected createQueryKeyGlobMatcher(
		queryRef: string,
		parentRef: NonNullable<ParentRef>,
		args: Record<string, unknown>,
	) {
		const parentMatcher = this.encodePrimitive(parentRef, '*');
		const argsMatcher = this.encodeQueryArgs(args, '*');
		return `${this.createQueryKeyNamespace(queryRef)}:parent#${parentMatcher}#args#*${argsMatcher}*`;
	}

	protected encodeQueryArgs(args: Record<string, unknown> = {}, catchAll?: string) {
		const entries: Array<[string, string]> = [];
		const flattened = flatten<Record<string, unknown>, Record<string, unknown>>(args);

		for (const key in flattened) {
			const value = flattened[key];
			const encodedKey = this.encodeProperty(key);
			const encodedValue = this.encodePrimitive(value, catchAll);

			if (encodedValue) {
				entries.push([encodedKey, encodedValue]);
			}
		}

		entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
		const pairs = entries.map(([key, value]) => `${key}#${value}`);
		return pairs.join(catchAll ?? ',');
	}

	protected encodeProperty(value: string) {
		const key = value.replaceAll('.', '_');
		if (!this.shouldEncode(key)) {
			return `_${key}`;
		}
		return `enc_${encodeBase64Url(key)}`;
	}

	protected encodePrimitive(value: unknown, catchAll?: string) {
		if (value === null) {
			return 'null';
		}

		if (value === undefined) {
			return catchAll ? null : 'null';
		}

		if (value === '') {
			return catchAll ? null : 'empty';
		}

		if (value === '*') {
			return catchAll ? catchAll : 'star';
		}

		const type = typeof value;
		const supported = ['string', 'number', 'boolean', 'bigint'];
		const isSupported = supported.includes(type);

		if (!isSupported) {
			return catchAll ? null : 'empty';
		}

		const valStr = value.toString();

		if (!this.shouldEncode(valStr)) {
			return `_${value}`;
		}

		return `enc_${encodeBase64Url(valStr)}`;
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

	protected getRef(root: Item): ItemRef {
		if (this.options?.getRef) {
			return this.options.getRef(root);
		}

		if (root == null) {
			throw new Error('Object is null or undefined, cannot get ref');
		}

		if (typeof root === 'object' && 'id' in root) {
			this.validateRefType(root.id);
			return root.id.toString();
		}

		throw new Error('Object does not have id. Define getRef function in cache options');
	}

	protected shouldEncode(value: string) {
		return /^[a-z0-9_]+$/i.test(value) === false;
	}

	protected getRefFallback(root: unknown) {
		if (root == null) {
			return undefined;
		}

		if (typeof root === 'object' && 'id' in root) {
			this.validateRefType(root.id);
			return root.id.toString();
		}

		return undefined;
	}

	protected validateRefType(ref: unknown): asserts ref is string | number | bigint {
		if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
			throw new Error(
				'Reference must be string, number or bigint. Define getRef function in cache options',
			);
		}
	}

	protected refillNullQueryItems(nullableRefs: Array<ItemRef | null>, items: Item[]) {
		if (nullableRefs.length === items.length) {
			return items;
		}

		const filled: Array<Item | null> = [];

		for (let i = 0, j = 0; i < nullableRefs.length; i++) {
			if (nullableRefs[i] == null) {
				filled.push(null);
			} else {
				filled.push(items[j]);
				j++;
			}
		}

		return filled;
	}
}
