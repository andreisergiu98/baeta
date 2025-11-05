import test from '@baeta/testing';
import {
	type MockArgs,
	type MockContext,
	type MockInfo,
	type MockResult,
	type MockSource,
	mockMiddleware,
	mockTypeMiddleware,
	runMockedResolver,
	testUseStoreLike,
} from './__test__/helpers.ts';
import { FieldCompiler } from './field-compiler.ts';

function mockFieldCompiler() {
	return new FieldCompiler<MockResult, MockSource, MockContext, MockArgs, MockInfo>(
		'Test',
		'test',
		new Map(),
		[],
		() => 'test',
	);
}

test('FieldCompiler should be created correctly', (t) => {
	const fieldCompiler = mockFieldCompiler();
	t.is(fieldCompiler.type, 'Test');
	t.is(fieldCompiler.field, 'test');
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
	const resolver = fieldCompiler.build([]);
	t.is(await runMockedResolver(resolver), 'test');
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
	fieldCompiler.addInitialMiddleware(
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
	const resolver = fieldCompiler.build([]);
	t.is(await runMockedResolver(resolver), 'test_1_2');
	t.is(i, 2);
});

test('FieldCompiler should use type middlewares correctly', async (t) => {
	let i = 0;
	const fieldCompiler = mockFieldCompiler();
	fieldCompiler.addInitialMiddleware(
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
	const resolver = fieldCompiler.build([
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
	t.is(await runMockedResolver(resolver), 'test_1_2_3');
	t.is(i, 3);
});

test('FieldCompiler should use store correctly', async (t) => {
	const fieldCompiler = mockFieldCompiler();
	testUseStoreLike(t, fieldCompiler);
});
