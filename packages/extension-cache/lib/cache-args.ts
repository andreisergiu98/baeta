/** Optional query arguments */
export type CacheArgs<T> = {
	[P in keyof T]?: T[P] extends object ? CacheArgs<T[P]> : T[P];
};
