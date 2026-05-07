import type { ItemRef } from './item.ts';

export type QueryIndex = [string, QueryIndexValue];
export type QueryIndexValue = string | number | boolean | null;

export type QueryArgs = Record<
	string,
	| string
	| number
	| boolean
	| null
	| Array<string | number | boolean | null>
	| Record<string, string | number | boolean | null>
>;

export interface QueryTag {
	name: string;
	revision: number | undefined;
}

export interface QueryTagWithIndexes extends QueryTag {
	indexes: QueryIndex[];
}

export interface QueryTagWithArgs extends QueryTag {
	args: QueryArgs;
}

export type QueryArgsIndexes<Args extends QueryArgs, T = Record<string, never>> = {
	[K in keyof Args]?: Args[K] extends QueryIndexValue ? true : never;
} & Record<Exclude<keyof T, keyof Args>, never>;

export type IndexedQueryArgs<Args extends QueryArgs, Indexes extends QueryArgsIndexes<Args>> = Pick<
	Args,
	keyof Indexes & keyof Args
>;

export interface QueryTagWithData<T> extends QueryTagWithArgs {
	indexes: QueryIndex[];
	data: null | T | Array<T | null>;
}

export type QueryHelpersWithoutIndexes = {
	invalidateAll: () => Promise<void>;
};

export type QueryHelpersWithIndexes<
	Args extends QueryArgs,
	Indexes extends QueryArgsIndexes<Args>,
> = {
	invalidateAll: () => Promise<void>;
	invalidateByArgs: (
		args: Partial<IndexedQueryArgs<Args, Indexes>> | Partial<IndexedQueryArgs<Args, Indexes>>[],
	) => Promise<void>;
};

export type QueryHelpers<Args extends QueryArgs, Indexes extends QueryArgsIndexes<Args>> =
	Indexes extends Record<string, never>
		? QueryHelpersWithoutIndexes
		: QueryHelpersWithIndexes<Args, Indexes>;

export type QueryResult<Item> = null | Item | Array<null | Item>;

export type ItemFromQueryResult<R> =
	R extends Array<(infer I) | null> ? NonNullable<I> : R extends null ? never : R;

export type QueryOptions<
	Result extends QueryResult<Item>,
	Args extends QueryArgs,
	Indexes extends QueryArgsIndexes<Args, Indexes>,
	Item = ItemFromQueryResult<Result>,
> = {
	resolve: (args: Args) => Result | Promise<Result>;
	indexArgsBy?: Indexes;
	ttlMs?: number;
	revision?: number;
	replaceExistingItems?: boolean;
	onUpdate?: (
		pairs: Array<{ next: Item; previous: Item | null }>,
		helpers: QueryHelpers<Args, Indexes>,
	) => Promise<void> | void;
	onInsert?: (items: Item[], helpers: QueryHelpers<Args, Indexes>) => Promise<void> | void;
	onDelete?: (
		pairs: Array<{ ref: ItemRef; previous: Item | null }>,
		helpers: QueryHelpers<Args, Indexes>,
	) => Promise<void> | void;
};

export type QueryOnUpdateHook<Item> = (
	pairs: Array<{ next: Item; previous: Item | null }>,
) => Promise<void>;

export type QueryOnInsertHook<Item> = (items: Item[]) => Promise<void>;

export type QueryOnDeleteHook<Item> = (
	pairs: Array<{ ref: ItemRef; previous: Item | null }>,
) => Promise<void>;

export type QueryHandle<
	Result extends QueryResult<Item>,
	Args extends QueryArgs,
	Indexes extends QueryArgsIndexes<Args, Indexes>,
	Item = ItemFromQueryResult<Result>,
> = {
	call: (args: Args) => Promise<Result>;
	tag: QueryTag;
	helpers: QueryHelpersWithIndexes<Args, Indexes>;
	hooks: {
		onUpdate?: QueryOnUpdateHook<Item>;
		onInsert?: QueryOnInsertHook<Item>;
		onDelete?: QueryOnDeleteHook<Item>;
	};
};
