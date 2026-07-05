import type { ScopeRule, ScopeRules } from './scope-rules.ts';
import type { ScopesShape } from './scope-shape.ts';

export type ScopeAccessor<Scopes extends ScopesShape, Grants extends string> = {
	[K in keyof Scopes]: Scopes[K] extends boolean
		? ScopeRules<Scopes, Grants>
		: (param: Scopes[K]) => ScopeRules<Scopes, Grants>;
} & {
	$granted: <G extends Grants>(grant: G) => ScopeRule<Scopes, G>;
};

type ScopeAccessorResult<Scopes extends ScopesShape, Grants extends string> =
	| ScopeRule<Scopes, Grants>
	| ((param: Scopes[keyof Scopes]) => ScopeRules<Scopes, Grants>)
	| ((grant: Grants) => ScopeRule<Scopes, Grants>);

export function defineScopes<Scopes extends ScopesShape, Grants extends string>(): ScopeAccessor<
	Scopes,
	Grants
> {
	const cache = new Map<string, ScopeAccessorResult<Scopes, Grants>>();
	const resolveScope = (prop: string): ScopeAccessorResult<Scopes, Grants> => {
		if (prop === '$granted') {
			return <G extends Grants>(grant: G) => makeGrant(grant);
		}
		// We can't tell at runtime whether the scope is boolean or parameterized,
		// so we return something that works as BOTH: a callable object.
		const leaf = makeProp(prop, true);
		const fn = (param: unknown) => makeProp(prop, param);
		return Object.assign(fn, leaf);
	};
	return new Proxy({} as ScopeAccessor<Scopes, Grants>, {
		get(_target, prop: string) {
			const cached = cache.get(prop);
			if (cached) return cached;
			const result = resolveScope(prop);
			cache.set(prop, result);
			return result;
		},
	});
}

function makeGrant<Grants extends string>(grant: Grants): ScopeRule<any, Grants> {
	return {
		type: 'grant',
		grant,
	};
}

function makeProp(prop: string, value: unknown): ScopeRule<any, any> {
	return {
		type: 'scope' as const,
		key: prop,
		value,
	};
}
