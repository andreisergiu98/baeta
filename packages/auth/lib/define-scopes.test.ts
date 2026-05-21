import test from '@baeta/testing';
import { defineScopes } from './define-scopes.ts';

type Scopes = { isPublic: boolean; role: string };
type Grants = 'g1' | 'g2';

test('boolean scope accessor produces a ScopeRule with value=true', (t) => {
	const scope = defineScopes<Scopes, Grants>();
	const accessor = scope.isPublic as unknown as { type: string; key: string; value: unknown };
	t.is(accessor.type, 'scope');
	t.is(accessor.key, 'isPublic');
	t.is(accessor.value, true);
});

test('parameterized scope accessor produces a ScopeRule with the supplied value', (t) => {
	const scope = defineScopes<Scopes, Grants>();
	t.deepEqual(scope.role('admin'), {
		type: 'scope',
		key: 'role',
		value: 'admin',
	});
});

test('parameterized scope accessor returns distinct rules per argument', (t) => {
	const scope = defineScopes<Scopes, Grants>();
	const a = scope.role('admin');
	const b = scope.role('user');
	t.not(a, b);
	if (a.type !== 'scope' || b.type !== 'scope') return t.fail('expected scope rules');
	t.not(a.value, b.value);
});

test('$granted produces a grant rule', (t) => {
	const scope = defineScopes<Scopes, Grants>();
	t.deepEqual(scope.$granted('g1'), {
		type: 'grant',
		grant: 'g1',
	});
});

test('accessor identity is memoized per scope name', (t) => {
	const scope = defineScopes<Scopes, Grants>();
	t.is(scope.isPublic, scope.isPublic);
	t.is(scope.$granted, scope.$granted);
});

test('callable accessor is also usable as a boolean scope rule', (t) => {
	// The dual-leaf trick: scope.isPublic is both a callable and a ScopeRule.
	const scope = defineScopes<Scopes, Grants>();
	const accessor = scope.isPublic as unknown as {
		type: 'scope';
		key: string;
		value: unknown;
	};
	t.is(accessor.type, 'scope');
	t.is(accessor.key, 'isPublic');
	t.is(accessor.value, true);
});
