import { ForbiddenError } from '@baeta/errors';
import { isGrantedKey } from './grant.ts';
import { isLogicRule, type LogicRule } from './rule.ts';
import { getAuthStore } from './store.ts';

export type ScopesShape = { [key: string]: unknown } | {};

/**
 * Utility type that enforces boolean scopes must be true.
 * For non-boolean scopes, preserves the original type.
 */
export type ScopeRule<T> = T extends boolean ? true : T;

/**
 * Defines the structure of authorization scope rules.
 * Combines individual scope rules with logical operators and granted permissions.
 */
export type ScopeRules<Scopes, Grants extends string> = {
	[K in keyof Scopes]?: ScopeRule<Scopes[K]>;
} & {
	[r in LogicRule]?: ScopeRules<Scopes, Grants>;
} & {
	$granted?: Grants;
};

export async function verifyGrant(
	ctx: unknown,
	grant: string | undefined,
	parentPath: string,
): Promise<true> {
	if (grant == null) {
		throw new Error("Grant key '$granted' must be defined in the scope rules!");
	}

	const store = await getAuthStore(ctx);
	const granted = store.grantCache.getGrants(parentPath);

	if (granted?.includes(grant) !== true) {
		throw new ForbiddenError();
	}

	return true;
}

export async function verifyScope<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants>,
	key: string,
	parentPath: string,
) {
	if (isLogicRule(key)) {
		return await verifyScopes(ctx, scopes[key], key, parentPath);
	}

	if (isGrantedKey(key)) {
		return await verifyGrant(ctx, scopes[key], parentPath);
	}

	const store = await getAuthStore(ctx);
	const value = (scopes as { [k: string]: unknown })[key];
	const resolve = store.scopes[key];
	return await resolve(value);
}

export async function verifyChainScopes<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants>,
	keys: string[],
	parentPath: string,
): Promise<true> {
	for (const key of keys) {
		await verifyScope(ctx, scopes, key, parentPath);
	}

	return true;
}

export async function verifyRaceScopes<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants>,
	keys: string[],
	parentPath: string,
): Promise<true> {
	for (const key of keys) {
		const result = await verifyScope(ctx, scopes, key, parentPath).catch((err) => err);

		if (result === true) {
			return true;
		}
	}

	throw new ForbiddenError();
}

export async function verifyOrScopes<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants>,
	keys: string[],
	parentPath: string,
): Promise<true> {
	const promises: Promise<true>[] = [];

	for (const key of keys) {
		promises.push(verifyScope(ctx, scopes, key, parentPath));
	}

	return await Promise.any(promises);
}

export async function verifyAndScopes<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants>,
	keys: string[],
	parentPath: string,
): Promise<true> {
	const promises: Promise<true>[] = [];

	for (const key of keys) {
		promises.push(verifyScope(ctx, scopes, key, parentPath));
	}

	return await Promise.all(promises).then(() => true as const);
}

export async function verifyScopes<Scopes extends ScopesShape, Grants extends string>(
	ctx: unknown,
	scopes: ScopeRules<Scopes, Grants> | undefined,
	rule: LogicRule,
	parentPath: string,
): Promise<true> {
	if (scopes == null) {
		throw new Error('Scope definitions cannot be empty!');
	}

	const keys = Object.keys(scopes);

	if (keys.length === 0) {
		throw new Error('Scope definitions cannot be empty!');
	}

	if (rule === '$chain') {
		return await verifyChainScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$race') {
		return await verifyRaceScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$or') {
		return await verifyOrScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$and') {
		return await verifyAndScopes(ctx, scopes, keys, parentPath);
	}

	throw new Error("Invalid logic rule! Must be one of '$chain', '$race', '$or', or '$and'.");
}
