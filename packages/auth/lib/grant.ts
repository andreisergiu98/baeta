import type { ResolverParams } from '@baeta/core';
import type { GrantCache } from './grant-cache.ts';

/**
 * Represents the result of a grant operation.
 * Can be either a single grant or an array of grants defined in AuthExtension.GrantsMap.
 */
export type GetGrantResult<Grant extends string, Result> =
	| Grant
	| Grant[]
	| GrantConfig<Grant, Result>
	| GrantConfig<Grant, Result>[];

/**
 * Attaches a grant to a specific object derived from the resolver result,
 * instead of the result itself. For array results, `target` is invoked per
 * entry. `target` must return a non-primitive value.
 */
export type GrantConfig<Grant extends string, Result> = {
	grant: Grant | Grant[];
	target: (result: GrantTarget<Result>) => unknown;
};

type GrantTarget<Result> = Result extends Array<infer U> ? U : Result;

/**
 * Function that determines grants based on resolver parameters and result.
 * Used for dynamic permission granting based on resolved data.
 */
export type GetGrantFn<Grants extends string, Result, Source, Context, Args, Info> = (
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
) => GetGrantResult<Grants, Result> | PromiseLike<GetGrantResult<Grants, Result>>;

/**
 * Union type for grant specifications.
 * Can be either a static grant result or a function that determines grants dynamically.
 */
export type GetGrant<Grants extends string, Result, Source, Context, Args, Info> =
	| GetGrantFn<Grants, Result, Source, Context, Args, Info>
	| GetGrantResult<Grants, Result>;

export async function saveGrants<Grants extends string, Result, Source, Context, Args, Info>(
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
	grants: GetGrant<Grants, Result, Source, Context, Args, Info>,
	grantCache: GrantCache,
) {
	if (result == null) return;
	const resolvedGrants = await resolveGrants(params, result, grants);
	const entries = Array.isArray(result) ? result : [result];
	resolvedGrants.forEach(({ grant, target }) => {
		for (const entry of entries) {
			if (entry == null) continue;
			grantCache.addGrants(target(entry), grant);
		}
	});
}

function defaultTarget<Entry>(entry: Entry) {
	return entry;
}

function normalizeGrant<Grant extends string, Result>(
	grants: Grant | GrantConfig<Grant, Result>,
): { grant: Grant[]; target: (entry: GrantTarget<Result>) => unknown } {
	if (typeof grants === 'string') {
		return { grant: [grants], target: defaultTarget };
	}
	return {
		grant: Array.isArray(grants.grant) ? grants.grant : [grants.grant],
		target: grants.target,
	};
}

function normalizeGrants<Grant extends string, Result>(
	grants: GetGrantResult<Grant, Result>,
): Array<{ grant: Grant[]; target: (entry: GrantTarget<Result>) => unknown }> {
	if (Array.isArray(grants)) {
		return grants.map((el) => normalizeGrant(el));
	}
	return [normalizeGrant(grants)];
}

async function resolveGrants<Grants extends string, Result, Source, Context, Args, Info>(
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
	grants: GetGrant<Grants, Result, Source, Context, Args, Info>,
) {
	if (typeof grants !== 'function') {
		return normalizeGrants(grants);
	}
	const grantFnResult = await grants(params, result);
	return normalizeGrants(grantFnResult);
}
