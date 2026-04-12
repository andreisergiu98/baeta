import {
	type CacheClient,
	type CacheOptions,
	createCache,
	type RequiredGetRef,
} from '@baeta/cache';
import type { ResolverParams } from '@baeta/core';
import { Extension, type FieldBuilder, type TypeBuilder } from '@baeta/core/sdk';

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {
			cacheExtension: CacheExtension;
		}
	}
}

export class CacheExtension extends Extension<never> {
	readonly stateKey = Symbol('cache-extension-state');
	private readonly client: CacheClient;
	constructor(client: CacheClient) {
		super();
		this.client = client;
	}

	getTypeExtensions<Source, Context, Info, ModuleName extends string, TypeName extends string>(
		builder: TypeBuilder<Source, Context, Info, ModuleName, TypeName>,
	): BaetaExtensions.TypeExtensions<Source, Context, Info, ModuleName, TypeName> {
		return {
			$createCache: (options) => {
				return createCache<Source>(this.client, {
					...(options as CacheOptions<Source> & RequiredGetRef<Source>),
					name: `glq.${builder.type}`,
				});
			},
		};
	}

	getFieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName extends string,
		TypeName extends string,
		FieldName extends string,
	>(
		builder: FieldBuilder<Result, Source, Context, Args, Info, ModuleName, TypeName, FieldName>,
	): BaetaExtensions.FieldExtensions<
		Result,
		Source,
		Context,
		Args,
		Info,
		ModuleName,
		TypeName,
		FieldName
	> {
		return {
			$resolveCache: <CacheResult, CacheArgs = Record<string, never>>(
				query: (args: CacheArgs) => CacheResult | Promise<CacheResult>,
				mapper: (
					params: ResolverParams<Source, Context, Args, Info>,
				) => CacheArgs | PromiseLike<CacheArgs>,
			) => {
				return builder.toMethods().map(async (params) => {
					const args = await mapper(params);
					return query(args);
				});
			},
		};
	}
}
