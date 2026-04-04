/** biome-ignore-all lint/correctness/noUnusedVariables: arguments used for inference */
import type {
	CacheOptions,
	CreateCacheFactory,
	OptionalGetRef,
	RequiredGetRef,
} from '@baeta/cache';
import type { ResolverParams } from '@baeta/core';
import type { Field } from '@baeta/core/sdk';
import type { RefCompatibleItem } from '../../cache/lib/item.ts';

declare global {
	export namespace BaetaExtensions {
		export interface TypeExtensions<Source, Context, Info> {
			/**
			 * Creates a cache store for a specific type with optional query definitions.
			 *
			 * @param options - Cache configuration and optional query definitions
			 * @returns CacheStore with item operations and query caches
			 *
			 * @example
			 * ```typescript
			 * const userCache = User.$createCache({
			 *   revision: 2,
			 *   parse: (v) => JSON.parse(v),
			 *   serialize: (v) => JSON.stringify(v),
			 *   queries: {
			 *     findUser: async (args: { id?: string }) =>
			 *       db.user.findFirst({ where: args }),
			 *   },
			 * });
			 * ```
			 */
			$createCache: (
				options: Source extends RefCompatibleItem
					? Omit<CacheOptions<Source>, 'name'> & OptionalGetRef<Source>
					: Omit<CacheOptions<Source>, 'name'> & RequiredGetRef<Source>,
			) => CreateCacheFactory<Source>;
		}

		export interface FieldExtensions<Result, Source, Context, Args, Info> {
			/**
			 * Resolves a field using a cached query.
			 *
			 * @param query - A QueryCache instance from a CacheStore
			 * @param mapper - Maps resolver params to cache query args
			 * @returns Field resolver that checks cache before executing
			 *
			 * @example
			 * ```typescript
			 * Query.user.$resolveCache(
			 *   userCache.findUser,
			 *   ({ args }) => ({ id: args.where.id }),
			 * )
			 * ```
			 */
			$resolveCache: <CacheResult, CacheArgs = Record<string, never>>(
				query: (args: CacheArgs) => CacheResult | Promise<CacheResult>,
				mapper: (
					params: ResolverParams<Source, Context, Args, Info>,
				) => CacheArgs | PromiseLike<CacheArgs>,
			) => Field<Result, CacheResult, Source, Context, Args, Info>;
		}
	}
}
