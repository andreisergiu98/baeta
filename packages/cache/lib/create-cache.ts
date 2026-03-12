import { log } from '@baeta/util-log';
import type { CacheClient } from './client.ts';
import type { QueryDefinitionMap, QueryMethod, QueryMethodMap } from './define-query.ts';
import type { ItemRef, RefCompatibleItem } from './item.ts';
import type { CacheOptions, OptionalGetRef, RequiredGetRef } from './options.ts';
import type { QueryOnDeleteHook, QueryOnInsertHook, QueryOnUpdateHook, QueryTag } from './query.ts';
import { CacheStore } from './store.ts';
import { toArray, zip } from './utils.ts';

export type CacheHooksOptions = {
	/**
	 * If true, hooks will be awaited. If false, hooks will be fired asynchronously and will not block cache methods.
	 * @defaultValue false
	 */
	waitForHooks?: boolean;
};

export type Cache<Item> = {
	get(ref: ItemRef): Promise<Item | null>;
	getMany(refs: ItemRef[]): Promise<Item[] | null>;
	getPartial(refs: ItemRef[]): Promise<Array<Item | null>>;
	update(item: Item | Item[]): Promise<void>;
	insert(item: Item | Item[]): Promise<void>;
	delete(ref: ItemRef | ItemRef[]): Promise<void>;
};

export type CacheWithQueries<Item, QueryDefinitions extends QueryDefinitionMap<Item>> = {
	get(ref: ItemRef): Promise<Item | null>;
	getMany(refs: ItemRef[]): Promise<Item[] | null>;
	getPartial(refs: ItemRef[]): Promise<Array<Item | null>>;
	update(item: Item | Item[], options?: CacheHooksOptions): Promise<void>;
	insert(item: Item | Item[], options?: CacheHooksOptions): Promise<void>;
	delete(ref: ItemRef | ItemRef[], options?: CacheHooksOptions): Promise<void>;
	deleteQueries(): Promise<void>;
	queries: QueryMethodMap<QueryDefinitions>;
};

export type CreateCacheFactory<Item> = {
	build: () => Cache<Item>;
	withQueries: <QueryDefinitions extends QueryDefinitionMap<Item>>(
		definitions: QueryDefinitions,
	) => {
		build: () => CacheWithQueries<Item, QueryDefinitions>;
	};
};

export function createCache<Item extends RefCompatibleItem>(
	client: CacheClient,
	options: CacheOptions<Item> & OptionalGetRef<Item>,
): CreateCacheFactory<Item>;
export function createCache<Item>(
	client: CacheClient,
	options: CacheOptions<Item> & RequiredGetRef<Item>,
): CreateCacheFactory<Item>;
export function createCache<Item>(
	client: CacheClient,
	options: CacheOptions<Item> & OptionalGetRef<Item>,
): CreateCacheFactory<Item> {
	const storeClient = new CacheStore<Item>({
		client,
		name: options.name,
		parse: options.parse,
		serialize: options.serialize,
		getRef: options.getRef,
		ttlMs: options.ttlMs ?? client.options?.ttlMs,
		namespace: options.namespace ?? client.options?.namespace,
		revision: options.revision ?? client.options?.revision,
	});
	return {
		build: () =>
			createCacheMethods(
				storeClient,
				{
					onUpdateHook: options.onUpdate,
					onInsertHook: options.onInsert,
					onDeleteHook: options.onDelete,
				},
				{
					onUpdateHooks: [],
					onInsertHooks: [],
					onDeleteHooks: [],
				},
			),
		withQueries: (definitions) => {
			return {
				build: () => createCacheMethodsWithQueries(storeClient, options, definitions),
			};
		},
	};
}

function createCacheMethods<Item>(
	storeClient: CacheStore<Item>,
	itemHooks: {
		onUpdateHook?: (item: Item[]) => void | Promise<void>;
		onInsertHook?: (item: Item[]) => void | Promise<void>;
		onDeleteHook?: (ref: ItemRef[]) => void | Promise<void>;
	},
	queryHooks: {
		onUpdateHooks: Array<QueryOnUpdateHook<Item>>;
		onInsertHooks: Array<QueryOnInsertHook<Item>>;
		onDeleteHooks: Array<QueryOnDeleteHook<Item>>;
	},
): Cache<Item> | Omit<CacheWithQueries<Item, any>, 'queries' | 'deleteQueries'> {
	return {
		get: (ref) => storeClient.get(ref),
		getMany: (refs) => storeClient.getMany(refs),
		getPartial: (refs) => storeClient.getPartial(refs),
		update: async (item, options) => {
			if (queryHooks.onUpdateHooks.length === 0) {
				await storeClient.save(item);
				await fireHook(itemHooks.onUpdateHook, toArray(item), options);
			} else {
				const items = toArray(item);
				const previous = await storeClient.saveWithDiff(items);
				const pairs = zip(items, previous, (next, previous) => ({ next, previous }));
				await Promise.all([
					fireHook(itemHooks.onUpdateHook, items, options),
					fireHooks(queryHooks.onUpdateHooks, pairs, options),
				]);
			}
		},
		insert: async (item, options) => {
			await storeClient.save(item);
			if (queryHooks.onInsertHooks.length === 0) {
				await fireHook(itemHooks.onInsertHook, toArray(item), options);
			} else {
				const items = toArray(item);
				await Promise.all([
					fireHook(itemHooks.onInsertHook, items, options),
					fireHooks(queryHooks.onInsertHooks, items, options),
				]);
			}
		},
		delete: async (ref, options) => {
			if (queryHooks.onDeleteHooks.length === 0) {
				await storeClient.delete(ref);
				await fireHook(itemHooks.onDeleteHook, toArray(ref), options);
			} else {
				const refs = toArray(ref);
				const previous = await storeClient.deleteWithDiff(refs);
				await storeClient.delete(refs);
				const pairs = zip(refs, previous, (ref, previous) => ({ ref, previous }));
				await Promise.all([
					fireHook(itemHooks.onDeleteHook, refs, options),
					fireHooks(queryHooks.onDeleteHooks, pairs, options),
				]);
			}
		},
	};
}

function createCacheMethodsWithQueries<Item, QueryDefinitions extends QueryDefinitionMap<Item>>(
	storeClient: CacheStore<Item>,
	options: CacheOptions<Item> & OptionalGetRef<Item>,
	definitions: QueryDefinitions,
): CacheWithQueries<Item, QueryDefinitions> {
	const { queries, queryTags, onUpdateHooks, onInsertHooks, onDeleteHooks } = createQueriesAndHooks<
		Item,
		QueryDefinitions
	>(definitions, storeClient);
	return {
		...createCacheMethods(
			storeClient,
			{
				onUpdateHook: options.onUpdate,
				onInsertHook: options.onInsert,
				onDeleteHook: options.onDelete,
			},
			{ onUpdateHooks, onInsertHooks, onDeleteHooks },
		),
		deleteQueries: async () => {
			const promises = queryTags.map((tag) =>
				storeClient.deleteQueries({
					...tag,
					indexes: [],
				}),
			);
			await Promise.all(promises);
		},
		queries,
	};
}

function createQueriesAndHooks<Item, QueryDefinitions extends QueryDefinitionMap<Item>>(
	definitions: QueryDefinitions | undefined,
	store: CacheStore<Item>,
) {
	const queries: Partial<QueryMethodMap<QueryDefinitions>> = {};
	const queryTags: QueryTag[] = [];
	const onUpdateHooks: Array<QueryOnUpdateHook<Item>> = [];
	const onInsertHooks: Array<QueryOnInsertHook<Item>> = [];
	const onDeleteHooks: Array<QueryOnDeleteHook<Item>> = [];
	for (const [queryName, buildQuery] of Object.entries(definitions ?? {})) {
		const queryHandler = buildQuery(store, queryName);
		queries[queryName as keyof QueryDefinitions] = queryHandler.call as QueryMethod<
			QueryDefinitions[keyof QueryDefinitions]
		>;
		queryTags.push(queryHandler.tag);
		if (queryHandler.hooks.onUpdate) {
			onUpdateHooks.push(queryHandler.hooks.onUpdate);
		}
		if (queryHandler.hooks.onDelete) {
			onDeleteHooks.push(queryHandler.hooks.onDelete);
		}
		if (queryHandler.hooks.onInsert) {
			onInsertHooks.push(queryHandler.hooks.onInsert);
		}
	}
	return {
		queries: queries as QueryMethodMap<QueryDefinitions>,
		queryTags,
		onUpdateHooks,
		onInsertHooks,
		onDeleteHooks,
	};
}

async function fireHook<T>(
	hook: ((v: T) => void | Promise<void>) | undefined,
	value: T,
	options?: CacheHooksOptions,
) {
	if (hook == null) {
		return;
	}
	if (options?.waitForHooks) {
		await hook(value);
	} else {
		Promise.resolve()
			.then(() => hook(value))
			.catch((err) => {
				log.error(err, 'Error in cache hook');
			});
	}
}

async function fireHooks<T>(
	hooks: Array<(v: T) => Promise<void>>,
	value: T,
	options?: CacheHooksOptions,
) {
	await Promise.all(hooks.map((hook) => fireHook(hook, value, options)));
}
