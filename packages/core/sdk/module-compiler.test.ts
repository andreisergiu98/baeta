import test from '@baeta/testing';
import { GraphQLScalarType } from 'graphql';
import { executeMockedModuleResolvers, mockModuleCompiler } from './__test__/module-mocks.ts';
import { createAppPluginId } from './app-plugin.ts';

test('ModuleCompiler should be created correctly', (t) => {
	const moduleCompiler = mockModuleCompiler();
	t.is(moduleCompiler.name, 'module');
	t.is(moduleCompiler.types.length, 2);
});

test('ModuleCompiler should read plugin state correctly', (t) => {
	const plugin1 = createAppPluginId<number>('1');
	const plugin2 = createAppPluginId<number>('2');
	const moduleCompiler = mockModuleCompiler({}, new Map([[plugin1.key, 1]]));

	t.is(moduleCompiler.hasPluginState(plugin1), true);
	t.is(moduleCompiler.getPluginState(plugin1), 1);
	t.is(moduleCompiler.hasPluginState(plugin2), false);
	t.is(moduleCompiler.getPluginState(plugin2), undefined);
});

test('ModuleCompiler should handle addMiddleware correctly', async (t) => {
	const moduleCompiler = mockModuleCompiler();
	moduleCompiler.addMiddleware(async (next) => {
		const result = await next();
		return `${result}_1`;
	});
	const result = moduleCompiler.build();
	t.deepEqual(await executeMockedModuleResolvers(result.fields), {
		Type1: {
			field1: 'test_1',
			field2: 'test_1',
		},
		Type2: {
			field1: 'test_1',
			field2: 'test_1',
		},
	});
});

test('ModuleCompiler should handle build correctly', async (t) => {
	const moduleCompiler = mockModuleCompiler();
	const result = moduleCompiler.build();
	t.deepEqual(await executeMockedModuleResolvers(result.fields), {
		Type1: {
			field1: 'test',
			field2: 'test',
		},
		Type2: {
			field1: 'test',
			field2: 'test',
		},
	});
});

test('ModuleCompiler should handle scalars correctly', async (t) => {
	const scalar = new GraphQLScalarType({
		name: 'Scalar',
		serialize: (value) => value,
	});
	const moduleCompiler = mockModuleCompiler({ Scalar: scalar });
	t.is(moduleCompiler.types.length, 2);

	const result = moduleCompiler.build();

	t.deepEqual(await executeMockedModuleResolvers(result.fields), {
		Type1: {
			field1: 'test',
			field2: 'test',
		},
		Type2: {
			field1: 'test',
			field2: 'test',
		},
	});

	t.deepEqual(result.scalars, [{ type: 'Scalar', scalar }]);
});
