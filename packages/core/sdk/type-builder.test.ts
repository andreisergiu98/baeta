import test from '@baeta/testing';
import type { Middleware } from '../lib/middleware.ts';
import type { MockContext, MockInfo, MockSource } from './__test__/mocks.ts';
import { executeMockedTypeResolvers, mockTypeBuilder } from './__test__/type-mocks.ts';
import { createAppPluginId } from './app-plugin.ts';
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

test('TypeBuilder edit should handle plugin state correctly', (t) => {
	const plugin1 = createAppPluginId<number>('1');
	const plugin2 = createAppPluginId<number>('2');

	const edit1 = mockTypeBuilder().edit();
	edit1.setPluginState(plugin1, 1);
	edit1.setPluginState(plugin2, 2);

	t.is(edit1.hasPluginState(plugin1), true);
	t.is(edit1.getPluginState(plugin1), 1);

	const edit2 = mockTypeBuilder().edit();
	edit2.setPluginState(plugin1, 99);
	edit2.setPluginState(plugin2, 2);
	edit2.unsetPluginState(plugin2);

	t.is(edit2.hasPluginState(plugin2), false);

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

	t.is(compiler1.getPluginState(plugin1), 1);
	t.is(compiler1.getPluginState(plugin2), 2);
	t.is(compiler2.getPluginState(plugin1), 99);
	t.is(compiler2.getPluginState(plugin2), undefined);
});
