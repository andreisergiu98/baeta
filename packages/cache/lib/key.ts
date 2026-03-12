import { encodeBase64 } from '@baeta/util-encoding';
import { hash } from 'ohash';
import type { QueryArgs, QueryIndex } from './query.ts';

export type QueryCacheKey = `${QueryCacheKeyPrefix}:${QueryCacheKeyId}`;
export type QueryCacheIndexKey = `${QueryCacheKeyPrefix}:${QueryCacheIndexKeyId}`;
export type QueryCacheKeyId = `id:${string}`;
export type QueryCacheIndexKeyId = `idx:${string}`;
export type QueryCacheKeyPrefix = `${string}:${string}:query:${string}:${CacheRevisionId}`; // $namespace:$storeName:query:$queryName:rev_$value

export type ItemCacheKey = `${ItemCacheKeyPrefix}:${ItemCacheKeyId}`;
export type ItemCacheKeyId = `id:${string}`;
export type ItemCacheKeyPrefix = `${string}:${string}:item:${CacheRevisionId}`; // $namespace:$storeName:item:rev_$value

export type CacheRevisionId = `rev_${string}`;

export function buildCacheRevisionId(revision: string): CacheRevisionId {
	return `rev_${revision}`;
}

export function buildItemCacheKeyId(id: string): ItemCacheKeyId {
	return `id:${id}`;
}

export function buildQueryCacheKeyId(args: QueryArgs): QueryCacheKeyId {
	return `id:${hash(args)}`;
}

export function buildQueryCacheIndexKeyId(index?: QueryIndex | undefined): QueryCacheIndexKeyId {
	if (index == null) {
		return 'idx:';
	}
	const key = index[0];
	const value = index[1];
	const safeValue = value === null ? 'null' : `_${encodeBase64(value.toString())}`;
	return `idx:${hash(`${key}=${safeValue}`)}`;
}

export function buildQueryCacheIndexKeysIds(indexes: QueryIndex[]): QueryCacheIndexKeyId[] {
	if (indexes.length === 0) {
		return ['idx:'];
	}
	return indexes.map((idx) => buildQueryCacheIndexKeyId(idx));
}
