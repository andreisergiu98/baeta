/** Optional query arguments */
export type CacheArgsMatcher<T> = {
	[P in keyof T]?: T[P] extends object ? CacheArgsMatcher<T[P]> : T[P] | '*';
};
