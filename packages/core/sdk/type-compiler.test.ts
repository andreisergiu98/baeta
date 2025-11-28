import test from '@baeta/testing';
import { mockTypeCompiler, runTypeResolvers, testUseStoreLike } from './__test__/helpers.ts';

test('TypeCompiler should be created correctly', (t) => {
	const typeCompiler = mockTypeCompiler();
	t.is(typeCompiler.type, 'Type');
	t.is(typeCompiler.fields.length, 2);
});

test('TypeCompiler should handle useStore correctly', (t) => {
	const typeCompiler = mockTypeCompiler();
	testUseStoreLike(t, typeCompiler);
});

test('TypeCompiler should handle addMiddleware correctly', async (t) => {
	const typeCompiler = mockTypeCompiler();
	typeCompiler.addMiddleware(async (next) => {
		const result = await next();
		return `${result}_1`;
	});
	const resolvers = typeCompiler.build([]);
	t.deepEqual(await runTypeResolvers(resolvers), {
		field1: 'test_1',
		field2: 'test_1',
	});
});

test('TypeCompiler should handle build correctly', async (t) => {
	const typeCompiler = mockTypeCompiler();
	const resolvers = typeCompiler.build([]);
	t.deepEqual(await runTypeResolvers(resolvers), {
		field1: 'test',
		field2: 'test',
	});
});
