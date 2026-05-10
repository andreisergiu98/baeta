import test from '@baeta/testing';
import { testStoreLike } from './__test__/store-tests.ts';
import { executeMockedTypeResolvers, mockTypeCompiler } from './__test__/type-mocks.ts';

test('TypeCompiler should be created correctly', (t) => {
	const typeCompiler = mockTypeCompiler();
	t.is(typeCompiler.type, 'Type');
	t.is(typeCompiler.fields.length, 2);
});

test('TypeCompiler should handle metadata correctly', (t) => {
	const typeCompiler = mockTypeCompiler();
	testStoreLike(t, (key) => typeCompiler.useMetadata(key));
});

test('TypeCompiler should handle addMiddleware correctly', async (t) => {
	const typeCompiler = mockTypeCompiler();
	typeCompiler.addMiddleware(async (next) => {
		const result = await next();
		return `${result}_1`;
	});
	const { resolvers } = typeCompiler.build([]);
	t.deepEqual(await executeMockedTypeResolvers(resolvers), {
		field1: 'test_1',
		field2: 'test_1',
	});
});

test('TypeCompiler should handle build correctly', async (t) => {
	const typeCompiler = mockTypeCompiler();
	const { resolvers } = typeCompiler.build([]);
	t.deepEqual(await executeMockedTypeResolvers(resolvers), {
		field1: 'test',
		field2: 'test',
	});
});
