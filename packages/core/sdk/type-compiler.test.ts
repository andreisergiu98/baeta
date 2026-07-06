import test from '@baeta/testing';
import { executeMockedTypeResolvers, mockTypeCompiler } from './__test__/type-mocks.ts';
import { createAppPluginId } from './app-plugin.ts';

test('TypeCompiler should be created correctly', (t) => {
	const typeCompiler = mockTypeCompiler();
	t.is(typeCompiler.type, 'Type');
	t.is(typeCompiler.fields.length, 2);
});

test('TypeCompiler should read plugin state correctly', (t) => {
	const plugin1 = createAppPluginId<number>('1');
	const plugin2 = createAppPluginId<number>('2');
	const typeCompiler = mockTypeCompiler({ state: new Map([[plugin1.key, 1]]) });

	t.is(typeCompiler.hasPluginState(plugin1), true);
	t.is(typeCompiler.getPluginState(plugin1), 1);
	t.is(typeCompiler.hasPluginState(plugin2), false);
	t.is(typeCompiler.getPluginState(plugin2), undefined);
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
