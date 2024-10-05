import type { Middleware } from '@baeta/core';
import { encodeBase64Url } from '@baeta/util-encoding';
import DataLoader from 'dataloader';
import { flatten } from 'flat';

export type Ref = string;
export type ParentRef = Ref | null | undefined;

export interface StoreAdapterOptions {
	ttl?: number;
}

export interface StoreOptions<Root> extends StoreAdapterOptions {
	getRef?: (root: Root) => Ref;
	version?: number;
}
export abstract class StoreAdapter<Item> {
	constructor(
		protected options: StoreOptions<Item> | undefined,
		protected type: string,
		protected hash: string,
	) {}

	abstract saveMany: (items: Item[]) => Promise<void>;

	abstract deleteMany: (refs: Ref[], evictQueries?: boolean) => Promise<void>;

	protected abstract loadMany: (refs: Ref[]) => Promise<Array<Item | null> | null>;

	protected abstract saveQueryMetadata: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		meta: string[],
	) => Promise<void>;

	protected abstract loadQueryMetadata: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => Promise<string[] | null>;

	abstract deleteQueries: (
		queryRef?: string,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) => Promise<void>;

	protected loaderFn = async (refs: readonly Ref[]) => {
		const results = await this.loadMany(refs as Ref[]);
		if (results != null) {
			return results;
		}
		return new Array(refs.length).fill(null);
	};

	protected loader = new DataLoader<Ref, Item | null>(this.loaderFn, {
		cache: false,
	});

	createKey(ref: Ref) {
		return `${this.type}:items:${this.getVersion()}:${ref}`;
	}

	createKeyByItem(item: Item) {
		return this.createKey(this.getRef(item));
	}

	createKeyByQuery(queryRef: string, parentRef: ParentRef, args: Record<string, unknown>) {
		const namespace = this.createQueryKeyNamespace(queryRef);
		const metadata = this.createQueryKeyHeader(parentRef, args);
		return `${namespace}:${metadata}`;
	}

	protected getVersion() {
		const version = this.options?.version?.toString() || '0';
		const hash = this.hash || 'hash';
		return `v${version}_${hash}`;
	}

	protected createQueryKeyNamespace(queryRef: string) {
		return `${this.type}:${queryRef}:${this.getVersion()}`;
	}

	protected createQueryKeyHeader(parentRef: ParentRef, args: Record<string, unknown>) {
		const encodedArgs = this.encodeQueryArgs(args);
		const encodedParentRef = this.encodePrimitive(parentRef);
		return `parent#${encodedParentRef}#args#${encodedArgs}`;
	}

	get = (ref: Ref): Promise<Item | null> => {
		return this.loader.load(ref);
	};

	getMany = async (refs: Ref[]): Promise<Array<Item> | null> => {
		const results = await this.getPartialMany(refs);

		if (results == null) {
			return null;
		}

		const isPartial = results.some((result) => result == null);

		if (isPartial) {
			return null;
		}

		return results as Item[];
	};

	getPartialMany = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		return this.loadMany(refs);
	};

	save = async (item: Item) => {
		return this.saveMany([item]);
	};

	delete = (ref: Ref, evictQueries?: boolean) => {
		return this.deleteMany([ref], evictQueries);
	};

	getQueryResult = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const result = await this.loadQueryResults(queryRef, parentRef, args);
		if (result == null) {
			return null;
		}
		return { query: result.items[0] };
	};

	getQueryResults = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const result = await this.loadQueryResults(queryRef, parentRef, args);
		if (result == null) {
			return null;
		}
		return { query: result.items };
	};

	saveQueryResult = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		data: null | Item | Array<Item | null>,
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

		return this.saveQueryMetadata(queryRef, parentRef, args, itemsData);
	};

	protected async loadQueryResults(
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	): Promise<{ items: Array<Item | null>; isList: boolean } | null> {
		const meta = await this.loadQueryMetadata(queryRef, parentRef, args);

		if (meta == null) {
			return null;
		}

		const [isListIndicator, ...encodedRefs] = meta;

		const isList = isListIndicator === '1';

		const nullableRefs = encodedRefs.map((encodedRef) => this.decodeQueryItemRef(encodedRef));
		const refs = nullableRefs.filter((ref) => ref != null);

		const items = await this.getMany(refs);

		if (items == null) {
			return null;
		}

		const ordered: Array<Item | null> = [];

		for (let i = 0, j = 0; i < nullableRefs.length; i++) {
			if (nullableRefs[i] == null) {
				ordered.push(null);
			} else {
				ordered.push(items[j]);
				j++;
			}
		}

		return { items: ordered, isList };
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

	createQueryMiddleware = <T extends null | Item | Item[] | Array<Item | null>>(
		queryRef: string,
	): Middleware<T, any, any, Record<string, unknown>> => {
		return async (params, next): Promise<T> => {
			const cached = await this.loadQueryResults(queryRef, params.root?.id, params.args);

			if (cached) {
				return (cached.isList ? cached.items : cached.items[0]) as T;
			}

			const result = await next();

			this.saveQueryResult(queryRef, params.root?.id, params.args, result);

			return result;
		};
	};

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

	protected encodeQueryArgs(args: Record<string, unknown>, catchAll?: string) {
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

	protected shouldEncode(value: string) {
		return /^[a-z0-9_]+$/i.test(value) === false;
	}

	protected getRef(root: Item): Ref {
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

	protected validateRefType(ref: unknown): asserts ref is string | number | bigint {
		if (typeof ref !== 'string' && typeof ref !== 'number' && typeof ref !== 'bigint') {
			throw new Error(
				'Reference must be string, number or bigint. Define getRef function in cache options',
			);
		}
	}
}
