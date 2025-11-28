import test from '@baeta/testing';
import type { Middleware } from '../lib/middleware.ts';
import {
	type MockContext,
	type MockInfo,
	type MockSource,
	mockTypeBuilder,
	runTypeResolvers,
	testSetStoreLike,
	testUseStoreLike,
	testUseStoreMutations,
} from './__test__/helpers.ts';

test('TypeBuilder should be created correctly', async (t) => {
	const typeBuilder = mockTypeBuilder();
	t.is(typeBuilder.type, 'type');
});

test('TypeBuilder should handle $fields correctly', async (t) => {
	const typeBuilder = mockTypeBuilder();
	const methods = typeBuilder.toMethods();
	const fields = typeBuilder.toMethods().$fields({
		field1: methods.field1.key('name'),
		field2: methods.field2.key('name'),
	});
	const resolversMap = fields.__make().build([]);
	t.deepEqual(await runTypeResolvers(resolversMap), {
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
	const resolversMap = fields.__make().build([]);
	t.deepEqual(await runTypeResolvers(resolversMap), {
		field1: 'test',
		field2: 'test',
	});
	t.is(i, 2);
});

test('TypeBuilder edit should handle store correctly', async (t) => {
	const typeBuilder = mockTypeBuilder();
	const edit = typeBuilder.edit();
	testUseStoreLike(t, edit);
	testSetStoreLike(t, edit);
	testUseStoreMutations(t, edit, edit.commit().edit());
});
