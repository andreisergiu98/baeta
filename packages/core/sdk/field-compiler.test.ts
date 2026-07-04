import test from '@baeta/testing';
import {
	executeMockedResolver,
	mockFieldCompiler,
	mockMiddleware,
} from './__test__/field-mocks.ts';
import { testStoreLike } from './__test__/store-tests.ts';
import { mockTypeMiddleware } from './__test__/type-mocks.ts';

test('FieldCompiler should be created correctly', (t) => {
	const fieldCompiler = mockFieldCompiler();
	t.is(fieldCompiler.type, 'Type');
	t.is(fieldCompiler.field, 'field');
});

test('FieldCompiler should add middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockFieldCompiler();
	fieldCompiler.addMiddleware(
		mockMiddleware(async () => {
			t.is(i++, 0);
		}),
	);
	fieldCompiler.addMiddleware(
		mockMiddleware(async () => {
			t.is(i++, 1);
		}),
	);
	const { resolver } = fieldCompiler.build([]);
	t.is(await executeMockedResolver(resolver), 'test');
	t.is(i, 2);
});

test('FieldCompiler should add initial middleware correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockFieldCompiler();
	fieldCompiler.addMiddleware(
		mockMiddleware(
			async () => {
				t.is(i++, 1);
			},
			async (result) => {
				t.is(result, 'test');
				return `${result}_1`;
			},
		),
	);
	fieldCompiler.addTopLevelMiddleware(
		mockMiddleware(
			async () => {
				t.is(i++, 0);
			},
			async (result) => {
				t.is(result, 'test_1');
				return `${result}_2`;
			},
		),
	);
	const { resolver } = fieldCompiler.build([]);
	t.is(await executeMockedResolver(resolver), 'test_1_2');
	t.is(i, 2);
});

test('FieldCompiler should use type middlewares correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockFieldCompiler();
	fieldCompiler.addTopLevelMiddleware(
		mockMiddleware(
			async () => {
				t.is(i++, 0);
			},
			async (result) => {
				t.is(result, 'test_1_2');
				return `${result}_3`;
			},
		),
	);
	fieldCompiler.addMiddleware(
		mockMiddleware(
			async () => {
				t.is(i++, 2);
			},
			async (result) => {
				t.is(result, 'test');
				return `${result}_1`;
			},
		),
	);
	const { resolver } = fieldCompiler.build([
		mockTypeMiddleware(
			async () => {
				t.is(i++, 1);
			},
			async (result) => {
				t.is(result, 'test_1');
				return `${result}_2`;
			},
		),
	]);
	t.is(await executeMockedResolver(resolver), 'test_1_2_3');
	t.is(i, 3);
});

test('FieldCompiler should use state correctly', async (t) => {
	const fieldCompiler = mockFieldCompiler();
	testStoreLike(t, (key) => fieldCompiler.useState(key));
});
