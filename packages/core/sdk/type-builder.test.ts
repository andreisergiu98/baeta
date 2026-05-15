import test from '@baeta/testing';
import type { Middleware } from '../lib/middleware.ts';
import type { MockContext, MockInfo, MockSource } from './__test__/mocks.ts';
import { executeMockedTypeResolvers, mockTypeBuilder } from './__test__/type-mocks.ts';
import { makeSymbol } from './symbols.ts';

test('TypeBuilder should be created correctly', async (t) => {
	const typeBuilder = mockTypeBuilder();
	t.is(typeBuilder.type, 'Type');
});

test('TypeBuilder should handle $fields correctly', async (t) => {
	const typeBuilder = mockTypeBuilder();
	const methods = typeBuilder.toMethods();
	const fields = typeBuilder.toMethods().$fields({
		field1: methods.field1.key('name'),
		field2: methods.field2.key('name'),
	});
	const { resolvers } = fields[makeSymbol]().build([]);
	t.deepEqual(await executeMockedTypeResolvers(resolvers), {
		field1: 'test',
		field2: 'test',
	});
});

test('TypeBuilder should handle $use correctly', async (t) => {
	let i = 0;
	const typeBuilder = mockTypeBuilder();
	const methods = typeBuilder.toMethods();
	const typeMiddleware: Middleware<unknown, MockSource, MockContext, unknown, MockInfo> = (
		next,
	) => {
		i++;
		return next();
	};
	const fields = typeBuilder
		.toMethods()
		.$use(typeMiddleware)
		.$fields({
			field1: methods.field1.key('name'),
			field2: methods.field2.key('name'),
		});
	const { resolvers } = fields[makeSymbol]().build([]);
	t.deepEqual(await executeMockedTypeResolvers(resolvers), {
		field1: 'test',
		field2: 'test',
	});
	t.is(i, 2);
});

test('TypeBuilder edit should handle mergeMeta correctly', (t) => {
	const key1 = Symbol('1');
	const key2 = Symbol('2');

	const edit1 = mockTypeBuilder().edit();
	edit1.mergeMeta(new Map([[key1, 1]]));
	edit1.mergeMeta(new Map([[key2, 2]]));

	const edit2 = mockTypeBuilder().edit();
	edit2.mergeMeta(new Map([[key1, 99]]));

	const methods1 = edit1.commitToMethods();
	const methods2 = edit2.commitToMethods();
	const methods1WithFields = methods1.$fields({
		field1: methods1.field1.key('name'),
		field2: methods1.field2.key('name'),
	});
	const compiler1 = methods1WithFields[makeSymbol]();
	const methods2WithFields = methods2.$fields({
		field1: methods2.field1.key('name'),
		field2: methods2.field2.key('name'),
	});
	const compiler2 = methods2WithFields[makeSymbol]();

	t.is(compiler1.useMetadata<number>(key1).get(), 1);
	t.is(compiler1.useMetadata<number>(key2).get(), 2);
	t.is(compiler2.useMetadata<number>(key1).get(), 99);
	t.is(compiler2.useMetadata<number>(key2).get(), undefined);
});
