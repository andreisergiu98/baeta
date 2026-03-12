import type { CacheClient } from '@baeta/cache';
import './lib/global-types.ts';
import { CacheExtension } from './lib/cache-extension.ts';

/**
 * Creates a cache extension
 *
 * @param client - Cache client instance to be used by the extension
 * @returns Extension factory function
 *
 * @example
 * ```typescript

 * ```
 */
export function cacheExtension(client: CacheClient) {
	return new CacheExtension(client);
}
