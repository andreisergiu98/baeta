import test from '@baeta/testing';
import { defineRules } from './define-rules.ts';
import type { ScopeRules } from './scope-rules.ts';

type Scopes = { isPublic: boolean; role: string };
type Grants = 'g1';

const scope: ScopeRules<Scopes, Grants> = { type: 'scope', key: 'isPublic', value: true };
const other: ScopeRules<Scopes, Grants> = { type: 'scope', key: 'role', value: 'admin' };

test('and produces a rule with rule="and" and the scopes', (t) => {
	const rule = defineRules<Scopes, Grants>();
	t.deepEqual(rule.and(scope, other), {
		type: 'rule',
		rule: 'and',
		scopes: [scope, other],
	});
});

test('or produces a rule with rule="or"', (t) => {
	const rule = defineRules<Scopes, Grants>();
	const result = rule.or(scope);
	t.is(result.type, 'rule');
	if (result.type !== 'rule') return;
	t.is(result.rule, 'or');
	t.deepEqual(result.scopes, [scope]);
});

test('chain produces a rule with rule="chain"', (t) => {
	const rule = defineRules<Scopes, Grants>();
	const result = rule.chain(scope, other);
	if (result.type !== 'rule') return t.fail('expected rule');
	t.is(result.rule, 'chain');
});

test('race produces a rule with rule="race"', (t) => {
	const rule = defineRules<Scopes, Grants>();
	const result = rule.race(scope, other);
	if (result.type !== 'rule') return t.fail('expected rule');
	t.is(result.rule, 'race');
});

test('nested rules round-trip through the discriminated union', (t) => {
	const rule = defineRules<Scopes, Grants>();
	const nested = rule.and(scope, rule.or(scope, other));
	if (nested.type !== 'rule') return t.fail('expected rule');
	t.is(nested.rule, 'and');
	t.is(nested.scopes.length, 2);

	const inner = nested.scopes[1];
	if (inner.type !== 'rule') return t.fail('expected nested rule');
	t.is(inner.rule, 'or');
	t.is(inner.scopes.length, 2);
});
