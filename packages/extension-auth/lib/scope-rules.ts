import { ForbiddenError } from '@baeta/errors';
import { isGrantedKey } from './grant';
import { LogicRule, isLogicRule } from './rule';
import { getAuthStore } from './store';

export type Scopes = keyof AuthExtension.Scopes;

type ScopeRule<T> = T extends boolean ? true : T;

export type ScopeRules = {
	[K in Scopes]?: ScopeRule<AuthExtension.Scopes[K]>;
} & {
	[r in LogicRule]?: ScopeRules;
} & {
	$granted?: AuthExtension.Grants;
};

async function verifyGrant(
	ctx: unknown,
	grant: string | undefined,
	parentPath: string,
): Promise<true> {
	if (grant == null) {
		throw new Error();
	}

	const store = await getAuthStore(ctx);
	const granted = store.grantCache.getGrants(parentPath);

	if (granted?.includes(grant) !== true) {
		throw new ForbiddenError();
	}

	return true;
}

async function verifyScope(ctx: unknown, scopes: ScopeRules, key: string, parentPath: string) {
	if (isLogicRule(key)) {
		return verifyScopes(ctx, scopes[key], key, parentPath);
	}

	if (isGrantedKey(key)) {
		return verifyGrant(ctx, scopes[key], parentPath);
	}

	const store = await getAuthStore(ctx);
	const value = scopes[key as Scopes];
	const resolve = store.scopes[key];
	return resolve(value);
}

async function verifyChainScopes(
	ctx: unknown,
	scopes: ScopeRules,
	keys: string[],
	parentPath: string,
): Promise<true> {
	for (const key of keys) {
		await verifyScope(ctx, scopes, key, parentPath);
	}

	return true;
}

async function verifyRaceScopes(
	ctx: unknown,
	scopes: ScopeRules,
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

async function verifyOrScopes(
	ctx: unknown,
	scopes: ScopeRules,
	keys: string[],
	parentPath: string,
): Promise<true> {
	const promises: Promise<true>[] = [];

	for (const key of keys) {
		promises.push(verifyScope(ctx, scopes, key, parentPath));
	}

	return Promise.any(promises);
}

async function verifyAndScopes(
	ctx: unknown,
	scopes: ScopeRules,
	keys: string[],
	parentPath: string,
): Promise<true> {
	const promises: Promise<true>[] = [];

	for (const key of keys) {
		promises.push(verifyScope(ctx, scopes, key, parentPath));
	}

	return Promise.all(promises).then(() => true as const);
}

export async function verifyScopes(
	ctx: unknown,
	scopes: ScopeRules | undefined,
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
		return verifyChainScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$race') {
		return verifyRaceScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$or') {
		return verifyOrScopes(ctx, scopes, keys, parentPath);
	}

	if (rule === '$and') {
		return verifyAndScopes(ctx, scopes, keys, parentPath);
	}

	throw new Error("This line shouldn't be reached.");
}
