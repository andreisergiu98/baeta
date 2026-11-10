import { createApplication } from '@baeta/core';
import { createFieldBuilder, createModuleBuilder, createTypeBuilder } from '@baeta/core/sdk';
import test from '@baeta/testing';
import { execute, parse } from 'graphql';
import { createComplexity } from './create-complexity.ts';

test('complexity limits apply to custom root types', async (t) => {
	const { complexityAppPlugin } = createComplexity({
		limit: { depth: 10, breadth: 2, complexity: 100 },
	});
	const module: any = createModuleBuilder<any, any>('test', {
		RootQuery: createTypeBuilder('RootQuery', {
			a: createFieldBuilder('RootQuery', 'a'),
			b: createFieldBuilder('RootQuery', 'b'),
			c: createFieldBuilder('RootQuery', 'c'),
		}),
	});
	const { RootQuery } = module;
	const { schema } = createApplication({
		sources: {
			sdl: 'schema { query: RootQuery } type RootQuery { a: String, b: String, c: String }',
			roots: { query: 'RootQuery' },
			modules: [
				module.$schema({
					RootQuery: RootQuery.$fields({
						a: RootQuery.a.resolve(() => 'a'),
						b: RootQuery.b.resolve(() => 'b'),
						c: RootQuery.c.resolve(() => 'c'),
					}),
				}),
			],
		},
		plugins: [complexityAppPlugin],
	});

	const allowed = await execute({ schema, document: parse('{ a b }'), contextValue: {} });
	const rejected = await execute({ schema, document: parse('{ a b c }'), contextValue: {} });

	t.deepEqual(allowed.data, { a: 'a', b: 'b' });
	t.deepEqual(rejected.data, { a: null, b: null, c: null });
	t.regex(String(rejected.errors?.[0]?.message), /breadth/i);
});
