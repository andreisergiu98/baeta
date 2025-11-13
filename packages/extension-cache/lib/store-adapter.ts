import type { Middleware } from '@baeta/core';
import { log } from '@baeta/util-log';
import DataLoader from 'dataloader';
import type { GraphQLSchema } from 'graphql';
import type { CacheArgsMatcher } from './cache-args.ts';
import { encodeArgs, encodeRef } from './encoder.ts';
import type {
	CacheMiddlewareOptions,
	RequiredCacheMiddlewareOptions,
} from './middleware-options.ts';
import {
	assertValidRefType,
	type CacheRef,
	getRefFallback,
	type ItemRef,
	type ParentRef,
	type RefCompatibleRoot,
} from './ref.ts';
import type { StoreOptions } from './store-options.ts';
import { alignItemsWithRefs, arrayIsComplete, fillNullItemsWithFallback } from './utils.ts';

export type CacheQueryMatcher<Args> = {
	parentRef?: ParentRef;
	args?: CacheArgsMatcher<Args>;
};

export interface StoreAdapterOptions<Item> {
	type: string;
	options: StoreOptions<Item>;
	getSchema: () => GraphQLSchema;
}

type CreateMiddlewareArgs<Result, Source, Args> = Source extends RefCompatibleRoot
	? [queryRef: CacheRef<Result, Source, Args>, options?: CacheMiddlewareOptions<Source>]
	: [queryRef: CacheRef<Result, Source, Args>, options: RequiredCacheMiddlewareOptions<Source>];

export abstract class StoreAdapter<Item> {
	protected readonly options: StoreOptions<Item>;
	protected readonly type: string;
	protected readonly getSchema: () => GraphQLSchema;

	constructor({ options, type, getSchema }: StoreAdapterOptions<Item>) {
		this.options = options;
		this.type = type;
		this.getSchema = getSchema;
	}

	abstract getPartialMany: (refs: ItemRef[]) => Promise<Array<Item | null> | null>;

	abstract saveMany: (items: Item[]) => Promise<void>;

	abstract deleteMany: (refs: ItemRef[], evictQueries?: boolean) => Promise<void>;

	protected abstract saveQueryMetadata: (
		queryRef: CacheRef<unknown, unknown, unknown>,
		meta: string[],
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => Promise<void>;

	protected abstract loadQueryMetadata: (
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) => Promise<string[] | null>;

	protected abstract deleteQueriesByRef: <Result, Root, Args>(
		queryRef?: CacheRef<Result, Root, Args>,
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

	get(ref: ItemRef): Promise<Item | null> {
		return this.loader.load(ref);
	}

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
			log.warn(err, 'Failed to save missing items');
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

	async save(item: Item) {
		return this.saveMany([item]);
	}

	async delete(ref: ItemRef, evictQueries?: boolean) {
		return this.deleteMany([ref], evictQueries);
	}

	deleteQueries(): Promise<void>;
	deleteQueries<Result, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		matcher?: CacheQueryMatcher<Args>,
	): Promise<void>;
	deleteQueries<Result, Root, Args>(
		queryRef?: CacheRef<Result, Root, Args>,
		matcher?: CacheQueryMatcher<Args>,
	): Promise<void> {
		return this.deleteQueriesByRef(queryRef, matcher?.parentRef, matcher?.args);
	}

	async getQueryResult<Result, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		matcher?: CacheQueryMatcher<Args>,
	) {
		const meta = await this.loadQueryMetadata(queryRef, matcher?.parentRef, matcher?.args);

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
		const result = isList ? aligned : (aligned.at(0) ?? null);

		return { query: result as Result };
	}

	async saveQueryResult<Result, Root, Args>(
		queryRef: CacheRef<Result, Root, Args>,
		data: Result,
		matcher?: CacheQueryMatcher<Args>,
	) {
		const isList = Array.isArray(data);
		const isListIndicator = isList ? '1' : '0';

		const items = isList ? data : [data];
		const itemsFiltered = items.filter((item) => item != null);

		const encodedRefs = items.map((item) => this.encodeQueryItemRef(item));

		const itemsData = [isListIndicator, ...encodedRefs];

		if (items.length > 0) {
			await this.saveMany(itemsFiltered);
		}

		return this.saveQueryMetadata(queryRef, itemsData, matcher?.parentRef, matcher?.args);
	}

	createMiddleware<Result, Source, Context, Args, Info>(
		...args: CreateMiddlewareArgs<Result, Source, Args>
	): Middleware<Result, Source, Context, Args, Info> {
		return async (next, params): Promise<Result> => {
			const [queryRef, options] = args;

			const parentRef = options?.getRootRef
				? options.getRootRef(params.source)
				: getRefFallback(params.source);

			const matcher = { parentRef, args: params.args };

			const cached = await this.getQueryResult(queryRef, matcher).catch((err) => {
				log.warn(err, `Failed to get query result for ${queryRef}. Proceeding with resolver.`);
				return null;
			});

			if (cached) {
				return cached.query;
			}

			const result = await next();
			this.saveQueryResult(queryRef, result, matcher).catch((err) => {
				log.warn(err, `Failed to save query result for ${queryRef}`);
			});
			return result;
		};
	}

	protected createItemKey(item: Item) {
		return this.createItemKeyByRef(this.getRef(item));
	}

	protected createItemKeyByRef(ref: ItemRef) {
		return `${this.type}:items:${this.getRevision()}:${ref.toString()}`;
	}

	protected createQueryKey(
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: ParentRef,
		args?: Record<string, unknown>,
	) {
		return `${this.createQueryKeyPrefix(queryRef.toString())}:${this.createQueryKeySuffix(queryRef, parentRef, args)}`;
	}

	protected createQueryKeyPrefix(queryRef: string) {
		return `${this.type}:${queryRef}:${this.getRevision()}`;
	}

	protected createQueryKeySuffix(
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef: ParentRef,
		args?: Record<string, unknown>,
	) {
		const encodedArgs = encodeArgs(queryRef.type, queryRef.field, this.getSchema(), args);
		const encodedParentRef = encodeRef(parentRef);
		return `parent#${encodedParentRef}#args#${encodedArgs}`;
	}

	protected createQueryKeyRegExpMatcher(): RegExp;
	protected createQueryKeyRegExpMatcher(
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	): RegExp;
	protected createQueryKeyRegExpMatcher(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) {
		const wildcard = '.*';
		if (queryRef === undefined) {
			const pattern = `^${this.createQueryKeyPrefix(wildcard)}:parent#${wildcard}#args#${wildcard}`;
			return new RegExp(pattern);
		}
		const parentMatcher = isWildcardOrUndefined(parentRef) ? wildcard : encodeRef(parentRef);
		const argsMatcher = isWildcardOrUndefined(args)
			? wildcard
			: encodeArgs(queryRef.type, queryRef.field, this.getSchema(), args, {
					kind: 'WILDCARD',
					value: wildcard,
				});
		const pattern = `^${this.createQueryKeyPrefix(queryRef.toString())}:parent#${parentMatcher}#args#${wildcard}${argsMatcher}${wildcard}`;
		return new RegExp(pattern);
	}

	protected createQueryKeyGlobMatcher(): string;
	protected createQueryKeyGlobMatcher(
		queryRef: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	): string;
	protected createQueryKeyGlobMatcher(
		queryRef?: CacheRef<unknown, unknown, unknown>,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) {
		const wildcard = '*';
		if (queryRef === undefined) {
			return `${this.createQueryKeyPrefix(wildcard)}:parent#${wildcard}#args#${wildcard}`;
		}
		const parentMatcher = isWildcardOrUndefined(parentRef) ? wildcard : encodeRef(parentRef);
		const argsMatcher = isWildcardOrUndefined(args)
			? wildcard
			: encodeArgs(queryRef.type, queryRef.field, this.getSchema(), args, {
					kind: 'WILDCARD',
					value: wildcard,
				});
		return `${this.createQueryKeyPrefix(queryRef.toString())}:parent#${parentMatcher}#args#${wildcard}${argsMatcher}${wildcard}`;
	}

	protected getRef(root: Item): ItemRef {
		if (this.options?.getRef) {
			return this.options.getRef(root);
		}

		if (root == null) {
			throw new Error('Object is null or undefined, cannot get ref');
		}

		if (typeof root === 'object' && 'id' in root) {
			assertValidRefType(root.id);
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
		return `r${version}`;
	}

	protected parseItem(value: string): Item | null {
		try {
			return this.options.parse(value);
		} catch (err) {
			log.warn(err, `Failed to parse item ${value}, returning null`);
			return null;
		}
	}

	protected stringifyItem(item: Item): string {
		return this.options.serialize(item);
	}
}

function isWildcardOrUndefined(value: unknown): value is '*' | undefined {
	return value === '*' || value === undefined;
}
