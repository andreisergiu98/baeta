import test from '@baeta/testing';
import { type GraphQLSchema, graphql, parse } from 'graphql';
import { type AppPlugin, createAppPluginId } from '../sdk/app-plugin.ts';
import { createFieldBuilder } from '../sdk/field.ts';
import { createModuleBuilder } from '../sdk/module.ts';
import { createTypeBuilder } from '../sdk/type.ts';
import { createApplication } from './application.ts';

const typedef = parse('type Query { hello: String }');

function createTestModule() {
	const TestModule = createModuleBuilder<unknown, unknown>(
		'test',
		typedef,
		{
			Query: createTypeBuilder('Query', {
				hello: createFieldBuilder<string, unknown, unknown, {}, unknown>('Query', 'hello'),
			}),
		},
		{},
	);
	const { Query } = TestModule;
	return TestModule.$schema({
		Query: Query.$fields({
			hello: Query.hello.resolve(() => 'world'),
		}),
	});
}

function createSchemaPlugin(onSchema: (schema: GraphQLSchema) => void): AppPlugin {
	return {
		id: createAppPluginId('schema-plugin'),
		mutate: () => ({ onSchema }),
	};
}

test('createApplication passes the final schema to onSchema', async (t) => {
	const received: GraphQLSchema[] = [];
	const { schema } = createApplication({
		modules: [createTestModule()],
		plugins: [createSchemaPlugin((schema) => received.push(schema))],
	});

	t.deepEqual(received, [schema]);

	const result = await graphql({ schema, source: '{ hello }' });
	t.deepEqual(result.data, { hello: 'world' });
});

test('createApplication fails when onSchema throws', (t) => {
	t.throws(
		() =>
			createApplication({
				modules: [createTestModule()],
				plugins: [
					createSchemaPlugin(() => {
						throw new Error('invalid schema');
					}),
				],
			}),
		{ message: 'invalid schema' },
	);
});

test('createApplication runs onSchema once per application', (t) => {
	let calls = 0;
	const plugin: AppPlugin = {
		id: createAppPluginId('schema-plugin'),
		mutate: () => {
			let ran = false;
			return {
				onSchema: () => {
					t.false(ran);
					ran = true;
					calls++;
				},
			};
		},
	};

	createApplication({ modules: [createTestModule()], plugins: [plugin] });
	createApplication({ modules: [createTestModule()], plugins: [plugin] });

	t.is(calls, 2);
});

test('module compilers expose their typedef to plugins', (t) => {
	const typedefs: unknown[] = [];
	createApplication({
		modules: [createTestModule()],
		plugins: [
			{
				id: createAppPluginId('typedef-plugin'),
				mutate: (compilers) => {
					typedefs.push(...compilers.map((compiler) => compiler.typedef));
				},
			},
		],
	});

	t.deepEqual(typedefs, [typedef]);
});
