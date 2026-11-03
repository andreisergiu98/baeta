import test from '@baeta/testing';
import {
	type DocumentNode,
	type GraphQLScalarType as GraphQLScalarTypeInstance,
	GraphQLScalarType,
	type GraphQLSchema,
	graphql,
	parse,
	print,
	subscribe,
} from 'graphql';
import { type AppPlugin, createAppPluginId } from '../sdk/app-plugin.ts';
import { createFieldBuilder } from '../sdk/field.ts';
import { createModuleBuilder } from '../sdk/module.ts';
import { createSchemaState } from '../sdk/schema-state.ts';
import { createSubscriptionBuilder } from '../sdk/subscription.ts';
import { createTypeBuilder } from '../sdk/type.ts';
import { createApplication } from './application.ts';

const sdl = 'type Query { hello: String }';

function createTestModule() {
	return resolveQueryModule(createQueryModule('test', 'hello'), 'hello', 'world');
}

function createQueryModule(name: string, field: string) {
	return createModuleBuilder<unknown, unknown>(name, {
		Query: createTypeBuilder('Query', {
			[field]: createFieldBuilder<unknown, unknown, unknown, {}, unknown>('Query', field),
		}),
	});
}

function resolveQueryModule(
	module: ReturnType<typeof createQueryModule>,
	field: string,
	value: unknown,
) {
	const { Query } = module;
	return module.$schema({
		Query: Query.$fields({
			[field]: Query[field].resolve(() => value),
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
		sources: { sdl, modules: [createTestModule()] },
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
				sources: { sdl, modules: [createTestModule()] },
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

	createApplication({ sources: { sdl, modules: [createTestModule()] }, plugins: [plugin] });
	createApplication({ sources: { sdl, modules: [createTestModule()] }, plugins: [plugin] });

	t.is(calls, 2);
});

test('createApplication attaches plugin schema states to the schema it returns', (t) => {
	const state = createSchemaState<{ limit: number }>(Symbol('limits'));
	const seen: unknown[] = [];
	const { schema } = createApplication({
		sources: { sdl, modules: [createTestModule()] },
		assumeValid: true,
		plugins: [
			{
				id: createAppPluginId('limits-plugin'),
				mutate: () => ({
					schemaState: state.build({ limit: 10 }),
					onSchema: (schema) => seen.push(state.read(schema)),
				}),
			},
		],
	});

	t.deepEqual(state.read(schema), { limit: 10 });
	t.deepEqual(seen, [{ limit: 10 }]);
});

test('createApplication passes the schema document to plugins', (t) => {
	const documents: DocumentNode[] = [];
	createApplication({
		sources: { sdl, modules: [createTestModule()] },
		plugins: [
			{
				id: createAppPluginId('document-plugin'),
				mutate: (_, { document }) => {
					documents.push(document);
				},
			},
		],
	});

	t.deepEqual(documents.map(print), [print(parse(sdl))]);
});

test('createApplication rejects a field resolved by two modules', (t) => {
	t.throws(
		() =>
			createApplication({
				sources: {
					sdl: 'type Query { me: String }',
					modules: [
						resolveQueryModule(createQueryModule('public', 'me'), 'me', 'public'),
						resolveQueryModule(createQueryModule('admin', 'me'), 'me', 'admin'),
					],
				},
			}),
		{
			message:
				'Query.me is resolved by both module "public" and module "admin". A field can only be resolved by one module.',
		},
	);
});

test('createApplication merges fields named like Object.prototype keys from several modules', async (t) => {
	const { schema } = createApplication({
		sources: {
			sdl: 'type Query { constructor: String driver: String }',
			modules: [
				resolveQueryModule(createQueryModule('teams', 'constructor'), 'constructor', 'Ferrari'),
				resolveQueryModule(createQueryModule('drivers', 'driver'), 'driver', 'Leclerc'),
			],
		},
	});

	const result = await graphql({ schema, source: '{ constructor driver }' });
	t.deepEqual(result, { data: { constructor: 'Ferrari', driver: 'Leclerc' } });
});

test('createApplication rejects a resolver for a field the schema does not define', (t) => {
	t.throws(
		() =>
			createApplication({
				sources: {
					sdl,
					modules: [resolveQueryModule(createQueryModule('extra', 'goodbye'), 'goodbye', 'x')],
				},
			}),
		{
			message: 'Module "extra" resolves Query.goodbye, but the schema doesn\'t define that field.',
		},
	);
});

test('createApplication rejects a resolver for a type that is not an object type', (t) => {
	const module = createModuleBuilder<unknown, unknown>('filters', {
		Filter: createTypeBuilder('Filter', {
			id: createFieldBuilder<unknown, unknown, unknown, {}, unknown>('Filter', 'id'),
		}),
	});
	t.throws(
		() =>
			createApplication({
				sources: {
					sdl: 'input Filter { id: ID } type Query { hello(filter: Filter): String }',
					modules: [
						module.$schema({ Filter: module.Filter.$fields({ id: module.Filter.id.key('id') }) }),
					],
				},
			}),
		{
			message:
				'Module "filters" resolves Filter.id, but Filter isn\'t an object type in the schema.',
		},
	);
});

test('createApplication implements scalars and keeps their name, description and specifiedBy', async (t) => {
	const module = createQueryModule('time', 'now');
	const { schema } = createApplication({
		sources: {
			sdl: '"Point in time" scalar DateTime @specifiedBy(url: "https://example.com") type Query { now: DateTime }',
			modules: [
				module.$schema({
					Query: module.Query.$fields({ now: module.Query.now.resolve(() => new Date(0)) }),
					DateTime: new GraphQLScalarType({
						name: 'ISODate',
						serialize: (value) => (value as Date).toISOString(),
					}),
				}),
			],
		},
	});

	const result = await graphql({ schema, source: '{ now }' });
	t.deepEqual(result, { data: { now: '1970-01-01T00:00:00.000Z' } });

	const scalar = schema.getType('DateTime') as GraphQLScalarTypeInstance;
	t.is(scalar.name, 'DateTime');
	t.is(scalar.description, 'Point in time');
	t.is(scalar.specifiedByURL, 'https://example.com');
});

test('createApplication parses default values with the implemented scalars', async (t) => {
	const module = createModuleBuilder<unknown, unknown>('time', {
		Query: createTypeBuilder('Query', {
			since: createFieldBuilder<boolean, unknown, unknown, { since: unknown }, unknown>(
				'Query',
				'since',
			),
			filter: createFieldBuilder<
				boolean,
				unknown,
				unknown,
				{ filter: { since: unknown } },
				unknown
			>('Query', 'filter'),
		}),
	});
	const { schema } = createApplication({
		sources: {
			sdl: `
				scalar DateTime
				input Filter { since: DateTime = "2020-01-01T00:00:00.000Z" }
				type Query {
					since(since: DateTime = "2020-01-01T00:00:00.000Z"): Boolean
					filter(filter: Filter = {}): Boolean
				}
			`,
			modules: [
				module.$schema({
					DateTime: new GraphQLScalarType({
						name: 'DateTime',
						serialize: (value) => (value as Date).toISOString(),
						parseValue: (value) => new Date(value as string),
					}),
					Query: module.Query.$fields({
						since: module.Query.since.resolve(
							({ args }: { args: { since: unknown } }) => args.since instanceof Date,
						),
						filter: module.Query.filter.resolve(
							({ args }: { args: { filter: { since: unknown } } }) =>
								args.filter.since instanceof Date,
						),
					}),
				}),
			],
		},
	});

	t.deepEqual(await graphql({ schema, source: '{ since filter }' }), {
		data: { since: true, filter: true },
	});
	t.deepEqual(
		await graphql({
			schema,
			source: 'query ($filter: Filter) { filter(filter: $filter) }',
			variableValues: { filter: {} },
		}),
		{ data: { filter: true } },
	);
	t.deepEqual(
		await graphql({
			schema,
			source: '{ __type(name: "Query") { fields { args { defaultValue } } } }',
		}),
		{
			data: {
				__type: {
					fields: [
						{ args: [{ defaultValue: '"2020-01-01T00:00:00.000Z"' }] },
						{ args: [{ defaultValue: '{since: "2020-01-01T00:00:00.000Z"}' }] },
					],
				},
			},
		},
	);
});

test('createApplication rejects a scalar implementation for a type that is not a scalar', (t) => {
	const module = createQueryModule('time', 'hello');
	t.throws(
		() =>
			createApplication({
				sources: {
					sdl,
					modules: [
						module.$schema({
							Query: module.Query.$fields({ hello: module.Query.hello.resolve(() => 'world') }),
							DateTime: new GraphQLScalarType({ name: 'DateTime' }),
						}),
					],
				},
			}),
		{
			message:
				'Module "time" implements the scalar DateTime, but DateTime isn\'t a scalar in the schema.',
		},
	);
});

test('createApplication resolves abstract types from __typename', async (t) => {
	const { schema } = createApplication({
		sources: {
			sdl: 'type Cat { name: String } type Dog { name: String } union Pet = Cat | Dog type Query { pet: Pet }',
			modules: [
				resolveQueryModule(createQueryModule('pets', 'pet'), 'pet', {
					__typename: 'Dog',
					name: 'Rex',
				}),
			],
		},
	});

	const result = await graphql({ schema, source: '{ pet { __typename ... on Dog { name } } }' });
	t.deepEqual(result, { data: { pet: { __typename: 'Dog', name: 'Rex' } } });
});

test('createApplication attaches subscribe resolvers', async (t) => {
	const module = createModuleBuilder<unknown, unknown>('ticks', {
		Query: createTypeBuilder('Query', {
			hello: createFieldBuilder<string, unknown, unknown, {}, unknown>('Query', 'hello'),
		}),
		Subscription: createTypeBuilder('Subscription', {
			tick: createSubscriptionBuilder<number, unknown, unknown, {}, unknown>('tick'),
		}),
	});
	const { schema } = createApplication({
		sources: {
			sdl: 'type Query { hello: String } type Subscription { tick: Int }',
			modules: [
				module.$schema({
					Query: module.Query.$fields({ hello: module.Query.hello.resolve(() => 'world') }),
					Subscription: module.Subscription.$fields({
						tick: module.Subscription.tick
							.subscribe(async function* () {
								yield 1;
								yield 2;
							})
							.resolve(({ source }: { source: unknown }) => source),
					}),
				}),
			],
		},
	});

	const stream = await subscribe({ schema, document: parse('subscription { tick }') });
	const results: unknown[] = [];
	if (Symbol.asyncIterator in stream) {
		for await (const result of stream) {
			results.push(result);
		}
	}
	t.deepEqual(results, [{ data: { tick: 1 } }, { data: { tick: 2 } }]);
});

test('createApplication validates the schema unless assumeValid is set', (t) => {
	const invalidSdl =
		'interface Node { id: ID! } type User implements Node { name: String } type Query { user: User }';
	const modules = [resolveQueryModule(createQueryModule('users', 'user'), 'user', null)];

	t.throws(() => createApplication({ sources: { sdl: invalidSdl, modules } }), {
		message:
			"Couldn't build schema! Reason: Interface field Node.id expected but User does not provide it.",
	});
	t.notThrows(() =>
		createApplication({ sources: { sdl: invalidSdl, modules }, assumeValid: true }),
	);
});
