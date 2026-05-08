import test, { sleep } from '@baeta/testing';
import { isPromise } from '../utils/promise.ts';
import {
	type MockArgs,
	type MockContext,
	type MockInfo,
	type MockResult,
	mockInfo,
} from './__test__/mocks.ts';
import {
	testSetStoreLike,
	testUseStoreLike,
	testUseStoreMutations,
} from './__test__/store-tests.ts';
import {
	executeMockedSubscriptionField,
	executeMockedSubscriptionResolver,
	type MockSubscriptionSource,
	makeMockedSubscriptionField,
	mockSubscriptionFieldBuilder,
	mockSubscriptionFieldResolver,
	mockSubscriptionGenerator,
} from './__test__/subscription-mocks.ts';
import { SubscriptionBuilder } from './subscription-builder.ts';

test('createSubscriptionBuilder should create a subscription field correctly', async (t) => {
	const subscriptionBuilder = new SubscriptionBuilder<
		MockResult,
		MockSubscriptionSource,
		MockContext,
		MockArgs,
		MockInfo
	>({
		field: 'field',
		extensions: [],
		store: new Map(),
		middlewares: [],
	});

	const subscriptionField = subscriptionBuilder
		.toMethods()
		.subscribe(() => mockSubscriptionGenerator())
		.resolve((params) => `with_resolver_${params.source.value}`);

	const asyncSubscriptionField = subscriptionBuilder
		.toMethods()
		.subscribe(async () => {
			await sleep(5);
			return mockSubscriptionGenerator();
		})
		.resolve((params) => `with_resolver_${params.source.value}`);

	const results = await executeMockedSubscriptionField(subscriptionField);
	const asyncResults = await executeMockedSubscriptionField(asyncSubscriptionField);

	t.deepEqual(results, ['with_resolver_1', 'with_resolver_2', 'with_resolver_3']);
	t.deepEqual(asyncResults, ['with_resolver_1', 'with_resolver_2', 'with_resolver_3']);
});

test('SubscriptionBuilder should be created correctly', (t) => {
	const fieldBuilder = mockSubscriptionFieldBuilder();
	t.is(fieldBuilder.field, 'field');
});

test('SubscriptionBuilder should handle key correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) => methods.key('value'));
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle map correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map((params) => `with_map_${params.source.value}`),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), [
		'with_map_1',
		'with_map_2',
		'with_map_3',
	]);
});

test('SubscriptionBuilder should handle async map correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map(async (params) => {
			await sleep(5);
			return `with_async_map_${params.source.value}`;
		}),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), [
		'with_async_map_1',
		'with_async_map_2',
		'with_async_map_3',
	]);
});

test('SubscriptionBuilder should handle resolve correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.resolve((params) => `with_resolve_${params.source.value}`),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), [
		'with_resolve_1',
		'with_resolve_2',
		'with_resolve_3',
	]);
});

test('SubscriptionBuilder should handle async resolve correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.resolve(async (params) => {
			await sleep(5);
			return `with_async_resolve_${params.source.value}`;
		}),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), [
		'with_async_resolve_1',
		'with_async_resolve_2',
		'with_async_resolve_3',
	]);
});

test('SubscriptionBuilder should handle map helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map((params) => params.source).map((params) => params.source.value),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle async map helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods
			.map(async (params) => {
				await sleep(5);
				return params.source;
			})
			.map(async (params) => {
				await sleep(5);
				return params.source.value;
			}),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle resolve helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map((params) => params.source).resolve((params) => params.source.value),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle async resolve helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods
			.map(async (params) => {
				await sleep(5);
				return params.source;
			})
			.resolve(async (params) => {
				await sleep(5);
				return params.source.value;
			}),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle key helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map((params) => params.source).key('value'),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle to helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map((params) => params.source.value).to((value) => value?.toLocaleUpperCase() ?? null),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['1', '2', '3']);
});

test('SubscriptionBuilder should handle withDefault helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map(() => null).withDefault('default'),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), ['default', 'default', 'default']);
});

test('SubscriptionBuilder should handle undefinedAsNull helper correctly', async (t) => {
	const resolver = mockSubscriptionFieldResolver((methods) =>
		methods.map(() => undefined).undefinedAsNull(),
	);
	t.deepEqual(await executeMockedSubscriptionResolver(resolver), [null, null, null]);
});

test('SubscriptionBuilder should handle middlewares correctly', async (t) => {
	const fieldBuilder = mockSubscriptionFieldBuilder();

	let i = 0;

	const fieldWithMake = fieldBuilder
		.toMethods()
		.$use(async (next) => {
			await sleep(5);
			t.is(i, 0);
			i++;
			return await next();
		})
		.$use((next) => {
			t.is(i, 1);
			i++;
			return next();
		})
		.$use(async (next) => {
			const result = await next();
			t.is(i, 3);
			i++;
			return result;
		})
		.subscribe(() => {
			t.is(i, 2);
			i++;
			return mockSubscriptionGenerator(3);
		})
		.key('value');

	const results = await executeMockedSubscriptionField(fieldWithMake);
	t.is(i, 4);
	t.deepEqual(results, ['1', '2', '3']);
});

test('SubscriptionBuilder edit should handle store correctly', async (t) => {
	const fieldBuilder = mockSubscriptionFieldBuilder();
	const edit = fieldBuilder.edit();
	testUseStoreLike(t, edit);
	testSetStoreLike(t, edit);
	testUseStoreMutations(t, edit, edit.commit().edit());
});

test('SubscriptionBuilder should assign parameters correctly', async (t) => {
	const source = {};
	const payload = 'test';
	const args = { userId: '123' };
	const ctx = { user: { name: 'test' } };
	const info = mockInfo();

	const fieldBuilder = mockSubscriptionFieldBuilder();

	const generator = {
		async *[Symbol.asyncIterator]() {
			yield payload;
		},
	};

	const field = fieldBuilder
		.toMethods()
		.subscribe((params) => {
			t.is(params.source, source);
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			return generator;
		})
		.resolve((params) => {
			t.is(params.source, payload);
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			return params.source;
		})
		.map((params) => {
			t.is(params.source, 'test');
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			return params.source;
		})
		.map((params) => ({ name: params.source }))
		.key('name')
		.to((value) => value?.toLocaleUpperCase())
		.undefinedAsNull()
		.withDefault('default')
		.map((params) => {
			t.is(params.source, 'TEST');
			t.is(params.args, args);
			t.is(params.ctx, ctx);
			t.is(params.info, info);
			return params.source;
		});

	const resolver = makeMockedSubscriptionField(field).build([]);

	const generatorPromise = resolver.subscribe(source, args, ctx, info);
	const awaitedGenerator = isPromise(generatorPromise) ? await generatorPromise : generatorPromise;

	for await (const payload of awaitedGenerator) {
		const result = await resolver.resolve(payload, args, ctx, info);
		t.is(result, 'TEST');
	}
});
