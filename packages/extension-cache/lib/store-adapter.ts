import { Middleware } from '@baeta/core';
import { encodeBase64Url } from '@baeta/util-encoding';
import DataLoader from 'dataloader';
import { flatten } from 'flat';

export type Ref = string | number;

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

	protected abstract loadQueryResults: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => Promise<{ items: Array<Item>; isList: boolean } | null>;

	abstract saveQueryResult: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		data: Item | Array<Item>,
	) => Promise<void>;

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
		const metadata = this.createQueryKeyMetadata(parentRef, args);
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

	protected createQueryKeyMetadata(parentRef: ParentRef, args: Record<string, unknown>) {
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

	createQueryMiddleware = <T extends Item | Item[]>(
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
			return key;
		}
		return `_base64_${encodeBase64Url(key)}`;
	}

	protected encodePrimitive(value: unknown, catchAll?: string) {
		if (value === null) {
			return '_null_';
		}

		if (value === undefined) {
			return catchAll ? null : '_null_';
		}

		if (value === '') {
			return catchAll ? null : '_empty_';
		}

		if (value === '*') {
			return catchAll ? catchAll : '_wildcard_';
		}

		const type = typeof value;
		const supported = ['string', 'number', 'boolean', 'bigint'];
		const isSupported = supported.includes(type);

		if (!isSupported) {
			return catchAll ? null : '_empty_';
		}

		const prefixed = `_${type}_${value}`;

		if (!this.shouldEncode(prefixed)) {
			return prefixed;
		}

		return `_base64_${encodeBase64Url(prefixed)}`;
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
			return root.id;
		}

		throw new Error('Object does not have id. Define getRef function in cache options');
	}

	protected validateRefType(ref: unknown): asserts ref is Ref {
		if (typeof ref !== 'string' && typeof ref !== 'number') {
			throw new Error('Reference must be string or number');
		}
	}
}
