import type { Middleware } from '@baeta/core';
import { type AppPlugin, createAppPluginId } from '@baeta/core/sdk';
import { BadUserInput, BaetaErrorCode } from '@baeta/errors';
import test from '@baeta/testing';
import { execute, type ExecutionResult, parse, subscribe } from 'graphql';
import { createTestSchema } from '../__tests__/app.ts';
import { createInputDirective, type InputDirective } from './directive.ts';
import { inputValidationAppPlugin } from './plugin.ts';

const directivesSdl = `
directive @scalarCheck(reject: Boolean) repeatable on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_OBJECT
directive @listCheck(depth: Int, reject: Boolean) repeatable on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
directive @objectCheck(reject: Boolean) repeatable on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_OBJECT
`;

type CheckConfig = { reject?: boolean; depth?: number };

type Call = { directive: string; value: unknown; path: ReadonlyArray<number | string> };

function createRecorder() {
	const calls: Call[] = [];
	const create = (name: string, target: InputDirective['target']) =>
		createInputDirective<CheckConfig>({
			name,
			target,
			getListDepth: (config) => config.depth ?? 0,
			resolve({ value, path, directiveConfig }) {
				calls.push({ directive: name, value, path });
				if (directiveConfig.reject) {
					throw new BadUserInput(`${name} rejected ${path.join('.')}`);
				}
			},
		});
	const directives = [
		create('scalarCheck', 'scalar'),
		create('listCheck', 'list'),
		create('objectCheck', 'object'),
	];
	return { calls, directives };
}

function createQuerySchema(typeDefs: string, directives: InputDirective[]) {
	return createTestSchema({
		typeDefs: directivesSdl + typeDefs,
		directives,
		resolvers: { Query: { value: () => true } },
	});
}

function run(schema: ReturnType<typeof createTestSchema>, query: string) {
	return execute({ schema, document: parse(query) }) as ExecutionResult;
}

test('validated sync resolvers stay sync', (t) => {
	const { directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(n: Int @scalarCheck): Boolean }',
		directives,
	);

	const result = run(schema, '{ value(n: 1) }');

	t.false(result instanceof Promise);
	t.deepEqual(result.data, { value: true });
});

test('list directives run once per list, not on its items', (t) => {
	const { calls, directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(tags: [String!] @listCheck): Boolean }',
		directives,
	);

	run(schema, '{ value(tags: ["a", "b"]) }');

	t.deepEqual(calls, [{ directive: 'listCheck', value: ['a', 'b'], path: ['tags'] }]);
});

test('list directives run at their list depth', (t) => {
	const { calls, directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(matrix: [[Int!]!] @listCheck(depth: 1)): Boolean }',
		directives,
	);

	run(schema, '{ value(matrix: [[1], [2, 3]]) }');

	t.deepEqual(calls, [
		{ directive: 'listCheck', value: [1], path: ['matrix', 0] },
		{ directive: 'listCheck', value: [2, 3], path: ['matrix', 1] },
	]);
});

test('scalar directives on lists run once per item', (t) => {
	const { calls, directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(tags: [String] @scalarCheck): Boolean }',
		directives,
	);

	run(schema, '{ value(tags: ["a", null, "b"]) }');

	t.deepEqual(calls, [
		{ directive: 'scalarCheck', value: 'a', path: ['tags', 0] },
		{ directive: 'scalarCheck', value: 'b', path: ['tags', 2] },
	]);
});

test('object directives run on the position, then the type, then the fields', (t) => {
	const { calls, directives } = createRecorder();
	const schema = createQuerySchema(
		`
		input Input @objectCheck {
			name: String @scalarCheck
		}
		type Query { value(input: Input @objectCheck): Boolean }
		`,
		directives,
	);

	run(schema, '{ value(input: { name: "a" }) }');

	t.deepEqual(
		calls.map((call) => [call.directive, call.path]),
		[
			['objectCheck', ['input']],
			['objectCheck', ['input']],
			['scalarCheck', ['input', 'name']],
		],
	);
});

test('validates recursive input types', (t) => {
	const { directives } = createRecorder();
	const schema = createQuerySchema(
		`
		input Filter {
			name: String @scalarCheck(reject: true)
			and: [Filter!]
		}
		type Query { value(filter: Filter): Boolean }
		`,
		directives,
	);

	const result = run(schema, '{ value(filter: { and: [{ and: [{ name: "a" }] }] }) }');

	t.is(result.errors?.[0].message, 'scalarCheck rejected filter.and.0.and.0.name');
});

test('validates input types that only reach directives through a cycle', (t) => {
	const { directives } = createRecorder();
	const schema = createQuerySchema(
		`
		input A {
			b: B
			name: String @scalarCheck(reject: true)
		}
		input B {
			a: A
		}
		type Query { value(b: B): Boolean }
		`,
		directives,
	);

	const result = run(schema, '{ value(b: { a: { name: "x" } }) }');

	t.is(result.errors?.[0].message, 'scalarCheck rejected b.a.name');
});

test('passes the field arguments, root and context to directives', (t) => {
	const received: unknown[] = [];
	const directive = createInputDirective<Record<string, never>, { user: string }>({
		name: 'scalarCheck',
		target: 'scalar',
		resolve({ args, root, ctx }) {
			received.push(args, root, ctx.user);
		},
	});
	const schema = createQuerySchema('type Query { value(n: Int @scalarCheck, m: Int): Boolean }', [
		directive,
	]);

	const result = execute({
		schema,
		document: parse('{ value(n: 1, m: 2) }'),
		rootValue: 'root',
		contextValue: { user: 'jon' },
	}) as ExecutionResult;

	t.deepEqual(result.data, { value: true });

	t.deepEqual(received, [{ n: 1, m: 2 }, 'root', 'jon']);
});

test('skips omitted arguments named like Object.prototype properties', (t) => {
	const { calls, directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(constructor: String @scalarCheck, toString: String @scalarCheck): Boolean }',
		directives,
	);

	const result = run(schema, '{ value(toString: "a") }');

	t.deepEqual(result.data, { value: true });
	t.deepEqual(calls, [{ directive: 'scalarCheck', value: 'a', path: ['toString'] }]);
});

test('aggregates errors from multiple directives', (t) => {
	const { directives } = createRecorder();
	const schema = createQuerySchema(
		'type Query { value(a: Int @scalarCheck(reject: true), b: Int @scalarCheck(reject: true)): Boolean }',
		directives,
	);

	const result = run(schema, '{ value(a: 1, b: 2) }');

	t.is(result.errors?.[0].extensions.code, BaetaErrorCode.AggregateError);
	t.is((result.errors?.[0].extensions.errors as unknown[]).length, 2);
});

test('rejects invalid subscription arguments before subscribing', async (t) => {
	const { directives } = createRecorder();
	let subscribed = false;
	const schema = createTestSchema({
		typeDefs: `${directivesSdl}
			type Query { value: Boolean }
			type Subscription { tick(n: Int @scalarCheck(reject: true)): Int }`,
		directives,
		resolvers: { Query: { value: () => true } },
		subscriptions: {
			tick: {
				subscribe: async function* () {
					subscribed = true;
					yield 1;
				},
			},
		},
	});

	const result = await subscribe({ schema, document: parse('subscription { tick(n: 1) }') });

	t.false(subscribed);
	t.false(Symbol.asyncIterator in result);
	t.is((result as ExecutionResult).errors?.[0].message, 'scalarCheck rejected n');
});

test('runs after earlier top-level plugins and before module middlewares', (t) => {
	const order: string[] = [];
	const recordMiddleware =
		(name: string): Middleware<any, unknown, unknown, unknown, unknown> =>
		(next) => {
			order.push(name);
			return next();
		};
	const before: AppPlugin = {
		id: createAppPluginId('before'),
		mutate: (compilers) => {
			for (const compiler of compilers) {
				for (const type of compiler.types) {
					for (const field of type.fields) {
						if (field.kind === 'Field') {
							field.addTopLevelMiddleware(recordMiddleware('before'));
						}
					}
				}
			}
		},
	};
	const directive = createInputDirective({
		name: 'scalarCheck',
		target: 'scalar',
		resolve: () => {
			order.push('validation');
		},
	});
	const schema = createTestSchema({
		typeDefs: `${directivesSdl} type Query { value(n: Int @scalarCheck): Boolean }`,
		directives: [directive],
		resolvers: { Query: { value: () => true } },
		middleware: recordMiddleware('module'),
		plugins: [before, inputValidationAppPlugin],
	});

	run(schema, '{ value(n: 1) }');

	t.deepEqual(order, ['before', 'validation', 'module']);
});

test('requires the app plugin when a module registers input directives', (t) => {
	const { directives } = createRecorder();
	t.throws(
		() =>
			createTestSchema({
				typeDefs: `${directivesSdl} type Query { value(n: Int @scalarCheck): Boolean }`,
				directives,
				resolvers: { Query: { value: () => true } },
				plugins: [],
			}),
		{ message: /Modules are using the plugin @baeta\/directives/ },
	);
});

test('rejects conflicting registrations of the same directive name', (t) => {
	const first = createRecorder();
	const second = createRecorder();
	t.throws(
		() =>
			createQuerySchema('type Query { value(n: Int @scalarCheck): Boolean }', [
				...first.directives,
				...second.directives,
			]),
		{ message: /@scalarCheck is registered more than once/ },
	);
});

const misplacedDirectives = [
	{
		title: 'scalar directive on an input object',
		typeDefs: 'input Input { n: Int } type Query { value(input: Input @scalarCheck): Boolean }',
		message:
			'Input directive @scalarCheck on Query.value(input:) validates a scalar or enum, but Query.value(input:) is Input.',
	},
	{
		title: 'object directive on a scalar',
		typeDefs: 'input Input { n: Int @objectCheck } type Query { value(input: Input): Boolean }',
		message:
			'Input directive @objectCheck on Input.n validates an input object, but Input.n is Int.',
	},
	{
		title: 'list directive on a scalar',
		typeDefs: 'type Query { value(n: Int @listCheck): Boolean }',
		message:
			'Input directive @listCheck on Query.value(n:) validates a list at depth 0, but Query.value(n:) is Int.',
	},
	{
		title: 'list directive deeper than the list nesting',
		typeDefs: 'type Query { value(tags: [String] @listCheck(depth: 1)): Boolean }',
		message:
			'Input directive @listCheck on Query.value(tags:) validates a list at depth 1, but Query.value(tags:) is [String].',
	},
	{
		title: 'non-object directive on an input object type',
		typeDefs: 'input Input @scalarCheck { n: Int } type Query { value: Boolean }',
		message:
			'Input directive @scalarCheck on Input validates a scalar or enum, but Input is Input.',
	},
];

for (const { title, typeDefs, message } of misplacedDirectives) {
	test(`fails at startup for a ${title}`, (t) => {
		const { directives } = createRecorder();
		t.throws(() => createQuerySchema(typeDefs, directives), { message });
	});
}
