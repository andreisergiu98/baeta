import test from '@baeta/testing';
import { testStoreLike } from './__test__/store-tests.ts';
import {
	executeMockedSubscriptionResolver,
	mockSubscriptionFieldCompiler,
} from './__test__/subscription-mocks.ts';

test('SubscriptionCompiler should be created correctly', (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	t.is(fieldCompiler.type, 'Subscription');
	t.is(fieldCompiler.field, 'field');
});

test('SubscriptionCompiler should add subscribe middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addSubscribeMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.addSubscribeMiddleware(async (next) => {
		const generator = await next();
		t.is(i++, 1);
		return generator;
	});
	const result = await executeMockedSubscriptionResolver(fieldCompiler.build([]).resolver);

	t.is(i, 2);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should add initial subscribe middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addSubscribeMiddleware((next) => {
		t.is(i++, 1);
		return next();
	});
	fieldCompiler.addTopLevelSubscribeMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	const { resolver } = fieldCompiler.build([]);
	const result = await executeMockedSubscriptionResolver(resolver);

	t.is(i, 2);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should use type subscribe middlewares correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.addTopLevelSubscribeMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.addSubscribeMiddleware(async (next) => {
		t.is(i++, 2);
		return await next();
	});
	const { resolver } = fieldCompiler.build([
		(next) => {
			t.is(i++, 1);
			return next();
		},
	]);
	const result = await executeMockedSubscriptionResolver(resolver);
	t.is(i, 3);
	t.deepEqual(result, ['1']);
});

test('SubscriptionCompiler should use subscribe store correctly', (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	testStoreLike(t, (key) => fieldCompiler.useSubscribeMetadata(key));
});

test('SubscriptionCompiler should use resolve store correctly', (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	testStoreLike(t, (key) => fieldCompiler.useResolveMetadata(key));
});
