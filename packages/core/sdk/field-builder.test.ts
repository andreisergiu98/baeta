import test, { sleep } from '@baeta/testing';
import type { GraphQLResolveInfo } from 'graphql';
import {
	executeMockedResolver,
	mockFieldBuilder,
	mockMiddleware,
	mockResolver,
} from './__test__/field-mocks.ts';
import {
	type MockArgs,
	type MockContext,
	type MockInfo,
	type MockResult,
	type MockSource,
	mockInfo,
} from './__test__/mocks.ts';
import { createFieldBuilder } from './field.ts';
import { makeSymbol } from './symbols.ts';

test('createFieldBuilder should create a type field correctly', async (t) => {
	const fieldBuilder = createFieldBuilder<MockResult, MockSource, MockContext, MockArgs, MockInfo>(
		'type',
		'field',
	);
	const field = fieldBuilder.map((params) => params.source.name);
	const { resolver } = field[makeSymbol]().build([]);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should be created correctly', (t) => {
	const fieldBuilder = mockFieldBuilder();
	t.is(fieldBuilder.type, 'Type');
	t.is(fieldBuilder.field, 'field');
});

test('FieldBuilder should handle key correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.key('name'));
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle map correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.map((params) => params.source.name));
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle async map correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods.map(async (params) => {
			await sleep(5);
			return params.source.name;
		}),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle resolve correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.resolve((params) => params.source.name));
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle async resolve correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods.resolve(async (params) => {
			await sleep(5);
			return params.source.name;
		}),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle map helper correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods.map((params) => params.source).map((params) => params.source.name),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle async map helper correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods
			.map(async (params) => {
				await sleep(5);
				return params.source;
			})
			.map(async (params) => {
				await sleep(5);
				return params.source.name;
			}),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle resolve helper correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods.map((params) => params.source).resolve((params) => params.source.name),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle async resolve helper correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods
			.map(async (params) => {
				await sleep(5);
				return params.source;
			})
			.resolve(async (params) => {
				await sleep(5);
				return params.source.name;
			}),
	);
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle key helper correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.map((params) => params.source).key('name'));
	t.is(await executeMockedResolver(resolver), 'test');
});

test('FieldBuilder should handle to helper correctly', async (t) => {
	const resolver = mockResolver((methods) =>
		methods.map((params) => params.source.name).to((value) => value.toLocaleUpperCase()),
	);
	t.is(await executeMockedResolver(resolver), 'TEST');
});

test('FieldBuilder should handle withDefault helper correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.map(() => null).withDefault('default'));
	t.is(await executeMockedResolver(resolver), 'default');
});

test('FieldBuilder should handle undefinedAsNull helper correctly', async (t) => {
	const resolver = mockResolver((methods) => methods.map(() => undefined).undefinedAsNull());
	t.is(await executeMockedResolver(resolver), null);
});

test('FieldBuilder should handle middlewares correctly', async (t) => {
	let i = 0;

	const middleware1 = mockMiddleware(
		async () => {
			t.is(i++, 0);
			await sleep(5);
		},
		async (result) => {
			t.is(result, 'test_1');
			return `${result}_2`;
		},
	);

	const middleware2 = mockMiddleware(
		async () => {
			t.is(i++, 1);
			await sleep(5);
		},
		async (result) => {
			t.is(result, 'test');
			return `${result}_1`;
		},
	);

	const resolver = mockResolver((methods) =>
		methods
			.$use(middleware1)
			.$use(middleware2)
			.map(() => 'test'),
	);
	t.is(await executeMockedResolver(resolver), 'test_1_2');
	t.is(i, 2);
});

test('FieldBuilder edit should handle addMiddleware correctly', async (t) => {
	let i = 0;
	const fieldBuilder = mockFieldBuilder();
	const edit = fieldBuilder.edit();

	const middleware1 = mockMiddleware(
		async () => {
			t.is(i++, 0);
		},
		async (result) => {
			t.is(result, 'test_1');
			return `${result}_2`;
		},
	);

	const middleware2 = mockMiddleware(
		async () => {
			t.is(i++, 1);
		},
		async (result) => {
			t.is(result, 'test');
			return `${result}_1`;
		},
	);

	edit.addMiddleware(middleware1);

	const fieldBuilder2 = edit.commit();
	t.is(fieldBuilder === fieldBuilder2, false);

	const fieldWithMake = fieldBuilder2.toMethods().$use(middleware2).key('name');
	const fieldCompiler = fieldWithMake[makeSymbol]();
	const { resolver } = fieldCompiler.build([]);
	t.is(await executeMockedResolver(resolver), 'test_1_2');
	t.is(i, 2);
});

test('FieldBuilder edit should handle mergeMeta correctly', (t) => {
	const key1 = Symbol('1');
	const key2 = Symbol('2');

	const edit1 = mockFieldBuilder().edit();
	edit1.mergeMeta(new Map([[key1, 1]]));
	edit1.mergeMeta(new Map([[key2, 2]]));

	const edit2 = mockFieldBuilder().edit();
	edit2.mergeMeta(new Map([[key1, 99]]));

	const compiler1 = edit1.commitToMethods().key('name')[makeSymbol]();
	const compiler2 = edit2.commitToMethods().key('name')[makeSymbol]();

	t.is(compiler1.useMetadata<number>(key1).get(), 1);
	t.is(compiler1.useMetadata<number>(key2).get(), 2);
	t.is(compiler2.useMetadata<number>(key1).get(), 99);
	t.is(compiler2.useMetadata<number>(key2).get(), undefined);
});

test('FieldBuilder should assign parameters correctly', async (t) => {
	const source = { name: 'test' };
	const args = { userId: '123' };
	const ctx = { user: { name: 'test' } };
	const info = mockInfo();

	const resolver = mockResolver((methods) =>
		methods
			.resolve((params) => {
				t.is(params.source, source);
				t.is(params.args, args);
				t.is(params.ctx, ctx);
				t.is(params.info, info);
				return params.source.name;
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
			}),
	);

	t.is(await resolver(source, args, ctx, info as GraphQLResolveInfo), 'TEST');
});
