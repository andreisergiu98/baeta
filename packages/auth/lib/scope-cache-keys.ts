import type { ScopesShape } from './scope-shape.ts';

/**
 * Builds a cache key for a single scope. The returned value must be stable —
 * equal inputs must produce a value that compares equal as a `Map` key (a
 * string, or a stable object reference).
 */
export type ScopeCacheKeyFn<Param> = (param: Param) => unknown;

/**
 * Provide an entry when the scope's argument can't be safely
 * auto-serialized in a stable manner or when a more compact key
 * is preferable.
 */
export type ScopeCacheKeyMap<Scopes extends ScopesShape> = {
	[K in keyof Scopes as Scopes[K] extends boolean ? never : K]?: ScopeCacheKeyFn<Scopes[K]>;
};
