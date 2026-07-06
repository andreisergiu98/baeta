import test from '@baeta/testing';
import {
	executeMockedSubscriptionResolver,
	mockSubscriptionFieldCompiler,
} from './__test__/subscription-mocks.ts';
import { createAppPluginId } from './app-plugin.ts';

test('SubscriptionCompiler should be created correctly', (t) => {
	const fieldCompiler = mockSubscriptionFieldCompiler();
	t.is(fieldCompiler.type, 'Subscription');
	t.is(fieldCompiler.field, 'field');
});

test('SubscriptionCompiler should add subscribe middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockSubscriptionFieldCompiler();
	fieldCompiler.subscribe.addMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.subscribe.addMiddleware(async (next) => {
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
	fieldCompiler.subscribe.addMiddleware((next) => {
		t.is(i++, 1);
		return next();
	});
	fieldCompiler.subscribe.addTopLevelMiddleware((next) => {
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
	fieldCompiler.subscribe.addTopLevelMiddleware((next) => {
		t.is(i++, 0);
		return next();
	});
	fieldCompiler.subscribe.addMiddleware(async (next) => {
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

test('SubscriptionCompiler should read subscribe plugin state correctly', (t) => {
	const plugin1 = createAppPluginId<number>('1');
	const plugin2 = createAppPluginId<number>('2');
	const fieldCompiler = mockSubscriptionFieldCompiler({
		subscribeState: new Map([[plugin1.key, 1]]),
	});

	t.is(fieldCompiler.subscribe.hasPluginState(plugin1), true);
	t.is(fieldCompiler.subscribe.getPluginState(plugin1), 1);
	t.is(fieldCompiler.subscribe.hasPluginState(plugin2), false);
	t.is(fieldCompiler.subscribe.getPluginState(plugin2), undefined);
});

test('SubscriptionCompiler should read resolve plugin state correctly', (t) => {
	const plugin1 = createAppPluginId<number>('1');
	const plugin2 = createAppPluginId<number>('2');
	const fieldCompiler = mockSubscriptionFieldCompiler({
		resolveState: new Map([[plugin1.key, 1]]),
	});

	t.is(fieldCompiler.resolve.hasPluginState(plugin1), true);
	t.is(fieldCompiler.resolve.getPluginState(plugin1), 1);
	t.is(fieldCompiler.resolve.hasPluginState(plugin2), false);
	t.is(fieldCompiler.resolve.getPluginState(plugin2), undefined);
});
