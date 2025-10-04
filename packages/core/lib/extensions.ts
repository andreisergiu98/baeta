import type { Extension } from '../sdk/index.ts';

/**
 * Creates a collection of Baeta extensions to be used in modules.
 * The result must be exported as default, and the file path registered in `baeta.ts`.
 * See https://baeta.io/docs/extensions/
 *
 * @param extensions - Array of extension factory functions
 * @returns Array of extension factory functions that can be used by Baeta modules
 *
 * @example
 * ```typescript
 * // auth-extension.ts
 * export const authExt = authExtension(...);
 *
 * // cache-extension.ts
 * export const cacheExt = cacheExtension(...);
 *
 * // extensions.ts
 * import { createExtensions } from '@baeta/core';
 * import { authExt } from './auth-extension.ts';
 * import { cacheExt } from './cache-extension.ts';
 *
 * export default createExtensions(authExt, cacheExt);
 * ```
 *
 * @remarks
 * Extensions are executed in the order they are provided.
 */
export function createExtensions(extensions: BaetaExtensions.Extensions): Extension[] {
	return Object.values(extensions);
}
