import { log } from '@baeta/util-log';
import type {
	IndexedQueryArgs,
	ItemFromQueryResult,
	QueryArgs,
	QueryArgsIndexes,
	QueryHandle,
	QueryHelpers,
	QueryHelpersWithIndexes,
	QueryIndex,
	QueryOptions,
	QueryResult,
	QueryTag,
} from './query.ts';
import type { CacheStore } from './store.ts';

export type QueryFactory<
	Result extends QueryResult<Item>,
	Args extends QueryArgs,
	Indexes extends QueryArgsIndexes<Args, Indexes>,
	Item = ItemFromQueryResult<Result>,
> = (store: CacheStore<Item>, name: string) => QueryHandle<Result, Args, Indexes, Item>;

export type QueryMethod<T extends QueryFactory<any, any, any>> =
	T extends QueryFactory<infer Result, infer Args, any, any>
		? (args: Args) => Promise<Result>
		: never;

export type QueryDefinitionMap<Item> = Record<
	string,
	QueryFactory<QueryResult<Item>, any, any, Item>
>;

export type QueryMethodMap<Definitions extends QueryDefinitionMap<any>> = {
	[K in keyof Definitions]: QueryMethod<Definitions[K]>;
};

export function defineQuery<
	Result extends QueryResult<Item>,
	Args extends QueryArgs = Record<string, never>,
	Indexes extends QueryArgsIndexes<Args, Indexes> = Record<string, never>,
	Item = ItemFromQueryResult<Result>,
>(options: QueryOptions<Result, Args, Indexes, Item>): QueryFactory<Result, Args, Indexes, Item> {
	return (store: CacheStore<Item>, name: string) => {
		const tag: QueryTag = {
			name,
			revision: options.revision,
		};

		const resolve = async (args: Args): Promise<Result> => {
			const fromCache = await store
				.getQuery({
					...tag,
					args,
				})
				.catch((err) => {
					log.error(err, `Failed to get query result for ${name}. Proceeding without caching.`);
					return null;
				});

			if (fromCache != null) {
				return fromCache.query as Result;
			}

			const data = await options.resolve(args);

			await store
				.saveQuery(
					{
						...tag,
						args,
						data,
						indexes: buildIndexes(args, options.indexArgsBy),
					},
					options.replaceExistingItems,
				)
				.catch((err) => {
					log.error(err, `Failed to save query result for ${name}. Proceeding without caching.`);
				});

			return data;
		};

		const invalidateAll = async () => {
			await store.deleteQueries({
				...tag,
				indexes: [],
			});
		};

		const invalidateByArgs = async (
			args: Partial<IndexedQueryArgs<Args, Indexes>> | Partial<IndexedQueryArgs<Args, Indexes>>[],
		) => {
			const argsArray = Array.isArray(args) ? args : [args];
			const deletePromises = argsArray.map((args) =>
				store.deleteQueries({
					...tag,
					indexes: buildIndexes(args, options.indexArgsBy),
				}),
			);
			await Promise.all(deletePromises);
		};

		const helpers: QueryHelpersWithIndexes<Args, Indexes> = {
			invalidateAll,
			invalidateByArgs,
		};
		const helpersCast: QueryHelpers<Args, Indexes> = helpers as QueryHelpers<Args, Indexes>;

		const { onUpdate, onDelete, onInsert } = options;

		const hooks = {
			onUpdate: hookWithHelpers(helpersCast, onUpdate),
			onInsert: hookWithHelpers(helpersCast, onInsert),
			onDelete: hookWithHelpers(helpersCast, onDelete),
		};

		return {
			call: resolve,
			tag,
			helpers,
			hooks,
		};
	};
}

function hookWithHelpers<Helpers, Args>(
	helpers: Helpers,
	hook?: (args: Args, helpers: Helpers) => void | Promise<void>,
) {
	if (!hook) {
		return undefined;
	}
	const hookWithHelpers = async (args: Args) => {
		await hook(args, helpers);
	};
	return hookWithHelpers;
}

function buildIndexes<Args extends QueryArgs, Indexes extends QueryArgsIndexes<Args, Indexes>>(
	args: Partial<Args>,
	indexArgsBy?: Indexes,
): QueryIndex[] {
	if (!indexArgsBy) {
		return [];
	}
	const indexes: QueryIndex[] = [];
	for (const key in indexArgsBy) {
		if (!Object.hasOwn(args, key)) {
			continue;
		}
		const value = args[key];
		if (value === undefined) {
			continue;
		}
		if (Array.isArray(value)) {
			continue;
		}
		if (typeof value === 'object' && value !== null) {
			continue;
		}
		indexes.push([key, value]);
	}
	return indexes;
}
