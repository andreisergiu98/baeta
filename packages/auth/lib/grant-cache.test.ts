import test, { sinon } from '@baeta/testing';
import { createGrantCache } from './grant-cache.ts';
import { logger } from './logger.ts';

test.before(() => {
	sinon.stub(logger, 'warn');
});

test.after(() => {
	sinon.restore();
});

test('getGrants returns undefined for unknown target', (t) => {
	const cache = createGrantCache();
	t.is(cache.getGrants({}), undefined);
});

test('addGrants stores grants on the target object', (t) => {
	const cache = createGrantCache();
	const target = { id: 1 };
	cache.addGrants(target, ['grant1']);

	const grants = cache.getGrants(target);
	t.true(grants instanceof Set);
	t.deepEqual(Array.from(grants!), ['grant1']);
});

test('addGrants merges with existing grants for the same target', (t) => {
	const cache = createGrantCache();
	const target = { id: 1 };
	cache.addGrants(target, ['grant1']);
	cache.addGrants(target, ['grant2']);

	t.deepEqual(Array.from(cache.getGrants(target)!), ['grant1', 'grant2']);
});

test('addGrants deduplicates repeated grants', (t) => {
	const cache = createGrantCache();
	const target = { id: 1 };
	cache.addGrants(target, ['grant1', 'grant1']);
	cache.addGrants(target, ['grant1']);

	t.deepEqual(Array.from(cache.getGrants(target)!), ['grant1']);
});

test('addGrants keeps targets isolated', (t) => {
	const cache = createGrantCache();
	const a = { id: 1 };
	const b = { id: 2 };
	cache.addGrants(a, ['grantA']);
	cache.addGrants(b, ['grantB']);

	t.deepEqual(Array.from(cache.getGrants(a) ?? []), ['grantA']);
	t.deepEqual(Array.from(cache.getGrants(b) ?? []), ['grantB']);
});

test('addGrants ignores non-object targets and logs a warning', (t) => {
	const warn = logger.warn as sinon.SinonStub;
	warn.resetHistory();

	const cache = createGrantCache();
	cache.addGrants('not-an-object', ['grant1']);
	cache.addGrants(undefined, ['grant1']);
	cache.addGrants(null, ['grant1']);

	t.is(cache.getGrants('not-an-object'), undefined);
	t.is(cache.getGrants(null), undefined);
	t.is(warn.callCount, 3);
});

test('addGrants accepts an empty grants array', (t) => {
	const cache = createGrantCache();
	const target = { id: 1 };
	cache.addGrants(target, []);

	const grants = cache.getGrants(target);
	t.true(grants instanceof Set);
	t.is(grants?.size, 0);
});
