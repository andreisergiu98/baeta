import test, { sinon } from '@baeta/testing';
import { log } from '@baeta/util-log';
import { createGrantCache } from './grant-cache.ts';
import { type GetGrantFn, type GrantConfig, saveGrants } from './grant.ts';

type TestGrant = 'grant1' | 'grant2';

test.before(() => {
	sinon.stub(log, 'warn');
});

test.after(() => {
	sinon.restore();
});

function createArgs<Result extends object | null | undefined>(result: Result) {
	return {
		result,
		grantCache: createGrantCache(),
		params: { source: {}, args: {}, ctx: {}, info: {} } as const,
	};
}

test('saveGrants attaches a string grant to the result object', async (t) => {
	const args = createArgs({ id: 'r1' });

	await saveGrants(args.params, args.result, 'grant1', args.grantCache);

	t.deepEqual(Array.from(args.grantCache.getGrants(args.result)!), ['grant1']);
});

test('saveGrants attaches multiple grants from an array', async (t) => {
	const args = createArgs({ id: 'r1' });

	await saveGrants<TestGrant, typeof args.result, object, object, object, object>(
		args.params,
		args.result,
		['grant1', 'grant2'],
		args.grantCache,
	);

	t.deepEqual(Array.from(args.grantCache.getGrants(args.result) ?? []).sort(), [
		'grant1',
		'grant2',
	]);
});

test('saveGrants invokes a grant resolver function', async (t) => {
	const args = createArgs({ id: 'r1' });

	const fn = sinon.spy<GetGrantFn<TestGrant, typeof args.result, object, object, object, object>>(
		() => 'grant1',
	);

	await saveGrants(args.params, args.result, fn, args.grantCache);

	t.true(fn.calledOnce);
	t.deepEqual(Array.from(args.grantCache.getGrants(args.result) ?? []), ['grant1']);
});

test('saveGrants distributes grants across array results', async (t) => {
	const a = { id: 'a' };
	const b = { id: 'b' };
	const args = createArgs([a, b]);

	await saveGrants(args.params, args.result, 'grant1', args.grantCache);

	t.deepEqual(Array.from(args.grantCache.getGrants(a)!), ['grant1']);
	t.deepEqual(Array.from(args.grantCache.getGrants(b)!), ['grant1']);
});

test('saveGrants uses GrantConfig.target to relocate grants', async (t) => {
	const inner = { id: 'inner' };
	const wrapper = { inner };
	const args = createArgs(wrapper);

	const config: GrantConfig<TestGrant, typeof wrapper> = {
		grant: 'grant1',
		target: (entry) => entry.inner,
	};

	await saveGrants<TestGrant, typeof wrapper, object, object, object, object>(
		args.params,
		args.result,
		config,
		args.grantCache,
	);

	t.is(args.grantCache.getGrants(wrapper), undefined);
	t.deepEqual(Array.from(args.grantCache.getGrants(inner)!), ['grant1']);
});

test('saveGrants applies GrantConfig.target per element of array results', async (t) => {
	const a = { user: { id: 'a' } };
	const b = { user: { id: 'b' } };
	const args = createArgs([a, b]);

	const config: GrantConfig<TestGrant, (typeof a)[]> = {
		grant: 'grant1',
		target: (entry) => entry.user,
	};

	await saveGrants<TestGrant, (typeof a)[], object, object, object, object>(
		args.params,
		args.result,
		config,
		args.grantCache,
	);

	t.deepEqual(Array.from(args.grantCache.getGrants(a.user) ?? []), ['grant1']);
	t.deepEqual(Array.from(args.grantCache.getGrants(b.user) ?? []), ['grant1']);
});

test('saveGrants is a no-op when result is null', async (t) => {
	const args = createArgs(null);

	await saveGrants(args.params, args.result, 'grant1', args.grantCache);

	// Nothing to assert on, just verify it didn't throw and didn't warn.
	const warn = log.warn as sinon.SinonStub;
	const callsBefore = warn.callCount;
	t.is(args.grantCache.getGrants({}), undefined);
	t.is(warn.callCount, callsBefore);
});

test('saveGrants skips null entries inside array results', async (t) => {
	const live = { id: 'live' };
	const args = createArgs([live, null] as Array<typeof live | null>);

	const warn = log.warn as sinon.SinonStub;
	warn.resetHistory();

	await saveGrants(args.params, args.result, 'grant1', args.grantCache);

	t.deepEqual(Array.from(args.grantCache.getGrants(live)!), ['grant1']);
	t.is(warn.callCount, 0);
});
