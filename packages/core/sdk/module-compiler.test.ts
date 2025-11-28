import test from '@baeta/testing';
import { GraphQLScalarType } from 'graphql';
import { mockModuleCompiler, runModuleResolvers, testUseStoreLike } from './__test__/helpers.ts';

test('ModuleCompiler should be created correctly', (t) => {
	const moduleCompiler = mockModuleCompiler();
	t.is(moduleCompiler.name, 'module');
	t.is(moduleCompiler.types.length, 2);
	t.is(moduleCompiler.extensions.length, 0);
});

test('ModuleCompiler should handle useStore correctly', (t) => {
	const moduleCompiler = mockModuleCompiler();
	testUseStoreLike(t, moduleCompiler);
});

test('ModuleCompiler should handle addMiddleware correctly', async (t) => {
	const moduleCompiler = mockModuleCompiler();
	moduleCompiler.addMiddleware(async (next) => {
		const result = await next();
		return `${result}_1`;
	});
	const result = moduleCompiler.build();
	t.deepEqual(await runModuleResolvers(result.resolvers), {
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
	t.deepEqual(await runModuleResolvers(result.resolvers), {
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
	const moduleCompiler = mockModuleCompiler({
		Scalar: new GraphQLScalarType({
			name: 'Scalar',
			serialize: (value) => value,
		}),
	});
	t.is(moduleCompiler.types.length, 2);

	const result = moduleCompiler.build();

	t.deepEqual(await runModuleResolvers(result.resolvers), {
		Type1: {
			field1: 'test',
			field2: 'test',
		},
		Type2: {
			field1: 'test',
			field2: 'test',
		},
	});

	t.is(result.resolvers.Scalar instanceof GraphQLScalarType, true);
});

test('ModuleCompiler should handle defaultResolvers correctly', async (t) => {
	const moduleCompiler = mockModuleCompiler(
		{
			Scalar: new GraphQLScalarType({
				name: 'Scalar',
				serialize: (value) => value,
			}),
		},
		{
			Union: () => 'union',
		},
	);
	const result = moduleCompiler.build();

	t.deepEqual(await runModuleResolvers(result.resolvers), {
		Type1: {
			field1: 'test',
			field2: 'test',
		},
		Type2: {
			field1: 'test',
			field2: 'test',
		},
	});

	t.is(typeof result.resolvers.Union, 'function');
	const unionFn = result.resolvers.Union as () => unknown;
	t.is(unionFn(), 'union');
});
