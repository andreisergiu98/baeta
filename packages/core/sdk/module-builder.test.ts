import test from '@baeta/testing';
import {
	executeMockedModuleResolvers,
	mockModuleBuilder,
	mockSchemaForModuleBuilder,
} from './__test__/module-mocks.ts';
import { makeSymbol } from './symbols.ts';

test('ModuleBuilder should be created correctly', async (t) => {
	const moduleBuilder = mockModuleBuilder();
	t.is(moduleBuilder.name, 'module');
});

test('ModuleBuilder should handle $schema correctly', async (t) => {
	const module = mockModuleBuilder().toMethods();
	const moduleCompiler = module.$schema(mockSchemaForModuleBuilder(module))[makeSymbol]();

	const result = moduleCompiler.build();
	t.deepEqual(await executeMockedModuleResolvers(result.resolvers), {
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

test('ModuleBuilder should handle $use correctly', async (t) => {
	const module = mockModuleBuilder().toMethods();
	const schema = module
		.$use(async (next) => {
			const result = await next();
			if (typeof result === 'string') {
				return `${result}_1`;
			}
			return result;
		})
		.$schema(mockSchemaForModuleBuilder(module));
	const result = schema[makeSymbol]().build();

	t.deepEqual(await executeMockedModuleResolvers(result.resolvers), {
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

test('ModuleBuilder should handle $directive correctly', async (t) => {
	const module = mockModuleBuilder().toMethods();
	const schema = module
		.$directive((schema) => {
			return schema;
		})
		.$directive([
			(schema) => {
				return schema;
			},
			(schema) => {
				return schema;
			},
		])
		.$schema(mockSchemaForModuleBuilder(module));
	const result = schema[makeSymbol]().build();

	t.is(result.transformers.length, 3);
});

test('ModuleBuilder should handle edit correctly', async (t) => {
	const module = mockModuleBuilder();
	const editableModule = module.edit();

	editableModule.addMiddleware(async (next) => {
		const result = await next();
		if (typeof result === 'string') {
			return `${result}_2`;
		}
		return result;
	});

	editableModule.addTransformer([
		(schema) => {
			return schema;
		},
		(schema) => {
			return schema;
		},
	]);

	const metaKey = Symbol('meta');
	editableModule.mergeMeta(new Map([[metaKey, 'merged']]));

	const editedModule = editableModule.commit().toMethods();
	const editedSchema = editedModule.$schema(mockSchemaForModuleBuilder(editedModule));
	const editedCompiler = editedSchema[makeSymbol]();
	t.is(editedCompiler.useMetadata<string>(metaKey).get(), 'merged');

	const isolatedKey = Symbol('isolated');
	const otherEdit = mockModuleBuilder().edit();
	otherEdit.mergeMeta(new Map([[isolatedKey, 'other']]));
	t.is(editedCompiler.useMetadata<string>(isolatedKey).get(), undefined);

	const finalSchema = editedModule
		.$directive((schema) => {
			return schema;
		})
		.$use(async (next) => {
			const result = await next();
			if (typeof result === 'string') {
				return `${result}_1`;
			}
			return result;
		})
		.$schema(mockSchemaForModuleBuilder(editedModule));
	const result = finalSchema[makeSymbol]().build();

	t.deepEqual(await executeMockedModuleResolvers(result.resolvers), {
		Type1: {
			field1: 'test_1_2',
			field2: 'test_1_2',
		},
		Type2: {
			field1: 'test_1_2',
			field2: 'test_1_2',
		},
	});

	t.is(result.transformers.length, 3);
});
