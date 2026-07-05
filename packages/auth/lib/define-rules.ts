import type { ScopeRules } from './scope-rules.ts';
import type { ScopesShape } from './scope-shape.ts';

export type RuleAccessor<Scopes extends ScopesShape, Grants extends string> = {
	and(
		scope: ScopeRules<Scopes, Grants>,
		...scopes: ScopeRules<Scopes, Grants>[]
	): ScopeRules<Scopes, Grants>;
	or(
		scope: ScopeRules<Scopes, Grants>,
		...scopes: ScopeRules<Scopes, Grants>[]
	): ScopeRules<Scopes, Grants>;
	chain(
		scope: ScopeRules<Scopes, Grants>,
		...scopes: ScopeRules<Scopes, Grants>[]
	): ScopeRules<Scopes, Grants>;
	race(
		scope: ScopeRules<Scopes, Grants>,
		...scopes: ScopeRules<Scopes, Grants>[]
	): ScopeRules<Scopes, Grants>;
};

export function defineRules<Scopes extends ScopesShape, Grants extends string>(): RuleAccessor<
	Scopes,
	Grants
> {
	return {
		and(...scopes) {
			return {
				type: 'rule',
				rule: 'and',
				scopes,
			};
		},
		or(...scopes) {
			return {
				type: 'rule',
				rule: 'or',
				scopes,
			};
		},
		chain(...scopes) {
			return {
				type: 'rule',
				rule: 'chain',
				scopes,
			};
		},
		race(...scopes) {
			return {
				type: 'rule',
				rule: 'race',
				scopes,
			};
		},
	};
}
