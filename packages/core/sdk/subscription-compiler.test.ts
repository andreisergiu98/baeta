import test from '@baeta/testing';
import { testUseStoreLike } from './__test__/store-tests.ts';
import {
	executeMockedSubscriptionResolver,
	mockSubscriptionFieldCompiler,
} from './__test__/subscription-mocks.ts';

test('SubscriptionCompiler should be created correctly', (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	t.is(fieldCompiler.type, 'Subscription');
	t.is(fieldCompiler.field, 'field');
});

test('SubscriptionCompiler should add middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.addMiddleware(async (next) => {
		const generator = await next();
		t.is(i++, 1);
		return generator;
	});
	const result = await executeMockedSubscriptionResolver(fieldCompiler.build([]));

	t.is(i, 2);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should add initial middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addMiddleware((next) => {
		t.is(i++, 1);
		return next();
	});
	fieldCompiler.addInitialMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	const resolver = fieldCompiler.build([]);
	const result = await executeMockedSubscriptionResolver(resolver);

	t.is(i, 2);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should use type middlewares correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addInitialMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.addMiddleware(async (next) => {
		t.is(i++, 2);
		return next();
	});
	const resolver = fieldCompiler.build([
		(next) => {
			t.is(i++, 1);
			return next();
		},
	]);
	const result = await executeMockedSubscriptionResolver(resolver);
	t.is(i, 3);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should use store correctly', async (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	testUseStoreLike(t, fieldCompiler);
});
