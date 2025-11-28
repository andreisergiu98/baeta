import test from '@baeta/testing';
import {
	mockDefaultModuleBuilder,
	mockSchemaForDefaultModuleBuilder,
	runModuleResolvers,
	testSetStoreLike,
	testUseStoreLike,
	testUseStoreMutations,
} from './__test__/helpers.ts';

test('ModuleBuilder should be created correctly', async (t) => {
	const moduleBuilder = mockDefaultModuleBuilder();
	t.is(moduleBuilder.name, 'module');
});

test('ModuleBuilder should handle $schema correctly', async (t) => {
	const module = mockDefaultModuleBuilder().toMethods();
	const moduleCompiler = module.$schema(mockSchemaForDefaultModuleBuilder(module)).__make();

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

test('ModuleBuilder should handle $use correctly', async (t) => {
	const module = mockDefaultModuleBuilder().toMethods();
	const result = module
		.$use(async (next) => {
			const result = await next();
			if (typeof result === 'string') {
				return `${result}_1`;
			}
			return result;
		})
		.$schema(mockSchemaForDefaultModuleBuilder(module))
		.__make()
		.build();

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

test('ModuleBuilder should handle $directive correctly', async (t) => {
	const module = mockDefaultModuleBuilder().toMethods();
	const result = module
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
		.$schema(mockSchemaForDefaultModuleBuilder(module))
		.__make()
		.build();

	t.is(result.transformers.length, 3);
});

test('ModuleBuilder should handle edit correctly', async (t) => {
	const module = mockDefaultModuleBuilder();
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

	testUseStoreLike(t, editableModule);
	testSetStoreLike(t, editableModule);
	testUseStoreMutations(t, editableModule, editableModule.commit().edit());

	const editedModule = editableModule.commit().toMethods();

	const result = editedModule
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
		.$schema(mockSchemaForDefaultModuleBuilder(editedModule))
		.__make()
		.build();

	t.deepEqual(await runModuleResolvers(result.resolvers), {
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
