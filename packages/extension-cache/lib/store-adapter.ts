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

	protected loader = new DataLoader<Ref, Item | null>(
		async (refs) => {
			const results = await this.loadMany(refs as Ref[]);
			if (results == null) {
				return new Array(refs.length).fill(null);
			}
			return results;
		},
		{
			cache: false,
		},
	);

	abstract saveMany: (items: Item[]) => Promise<void>;

	abstract deleteMany: (refs: Ref[], evictQueries?: boolean) => Promise<void>;

	protected abstract loadMany: (refs: Ref[]) => Promise<Array<Item | null> | null>;

	protected abstract loadQueryResults: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => Promise<{ items: Item[]; isList: boolean } | null>;

	abstract saveQueryResult: (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
		data: Item | Item[],
	) => Promise<void>;

	abstract deleteQueries: (
		queryRef?: string,
		parentRef?: NonNullable<ParentRef>,
		args?: Record<string, unknown>,
	) => Promise<void>;

	createKey(ref: Ref) {
		return `${this.type}:items:${this.getVersion()}:${ref}`;
	}

	createQueryKey(queryRef: string, parentRef: ParentRef, args: Record<string, unknown>) {
		const namespace = this.createQueryKeyNamespace(queryRef);
		const metadata = this.createQueryKeyMetadata(parentRef, args);
		return `${namespace}:${metadata}`;
	}

	get = (ref: Ref): Promise<Item | null> => {
		return this.loader.load(ref);
	};

	getMany = async (refs: Ref[]): Promise<Array<Item> | null> => {
		const results = await this.getManyPartially(refs);
		const isPartial = results?.some((result) => result == null);
		if (results == null || isPartial) {
			return null;
		}
		return results as Item[];
	};

	save = async (item: Item) => {
		return this.saveMany([item]);
	};

	deleteOne = async (ref: Ref, evictQueries = true) => {
		return this.deleteMany([ref], evictQueries);
	};

	getManyPartially = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
		if (refs.length === 0) {
			return null;
		}
		return this.loadMany(refs);
	};

	getQueryResult = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const result = await this.loadQueryResults(queryRef, parentRef, args);
		return result?.items[0] ?? null;
	};

	getQueryResults = async (
		queryRef: string,
		parentRef: ParentRef,
		args: Record<string, unknown>,
	) => {
		const result = await this.loadQueryResults(queryRef, parentRef, args);
		return result?.items ?? null;
	};

	createQueryMiddleware = <T>(
		queryRef: string,
	): Middleware<T, any, any, Record<string, unknown>> => {
		return async (params, next): Promise<T> => {
			const cached = await this.loadQueryResults(queryRef, params.root?.id, params.args);

			if (cached) {
				const isList = cached.isList;
				if (isList) {
					return cached.items as T;
				}

				const item = cached.items[0];
				if (item) {
					return item as T;
				}
			}

			const result = await next();

			if (result) {
				this.saveQueryResult(queryRef, params.root?.id, params.args, result as Item | Item[]);
			}

			return result;
		};
	};

	protected getVersion() {
		const version = this.options?.version?.toString() || '0';
		const hash = this.hash || 'hash';
		return `v${version}_${hash}`;
	}

	protected createKeyByItem(item: Item) {
		return this.createKey(this.getRef(item));
	}

	protected createQueryKeyNamespace(queryRef: string) {
		return `${this.type}:${queryRef}:${this.getVersion()}`;
	}

	protected createQueryKeyMetadata(parentRef: ParentRef, args: Record<string, unknown>) {
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

	protected encodeQueryArgs(args: Record<string, unknown>, catchAll?: string) {
		const encoded: Record<string, string> = {};
		const flattened = flatten(args) as Record<string, string | boolean | null>;

		for (const key in flattened) {
			const value = flattened[key];
			const encodedKey = this.encodeProperty(key);
			const encodedValue = this.encodePrimitive(value, catchAll);

			if (encodedValue == null) {
				continue;
			}

			encoded[encodedKey] = encodedValue;
		}

		const entries = Object.entries(encoded).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
		const serializedPairs = entries.map(([key, value]) => `${key}#${value}`);

		return serializedPairs.join(catchAll ?? ',');
	}

	protected encodePrimitive(
		value: string | number | boolean | null | undefined,
		catchAll?: string,
	) {
		if (catchAll && value === '*') {
			return catchAll;
		}

		if (value === null) {
			return '_null_';
		}

		if (value === undefined) {
			return catchAll ? null : '_null_';
		}

		const type = typeof value;
		const supported = ['string', 'number', 'boolean'];
		const isSupported = supported.includes(type);

		if (!isSupported) {
			return catchAll ? null : '_empty_';
		}

		const str = value.toString();

		if (str === '' && catchAll) {
			return catchAll ? null : '_empty_';
		}

		if (!this.shouldEncode(str)) {
			return str;
		}

		return encodeBase64Url(value.toString());
	}

	protected encodeProperty(value: string) {
		const key = value.replaceAll('.', '_');
		if (!this.shouldEncode(key)) {
			return key;
		}
		return encodeBase64Url(key);
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
			if (typeof root.id !== 'string' && typeof root.id !== 'number') {
				throw new Error(
					'Object id must be string or number. Define getRef function in cache options',
				);
			}
			return root.id;
		}

		throw new Error('Object does not have id. Define getRef function in cache options');
	}
}
