import test from '@baeta/testing';
import type { GraphQLAbstractType, GraphQLResolveInfo } from 'graphql';
import { createTypeResolverAdapter } from './resolver-type.ts';

test('createTypeResolverAdapter should map parameters correctly', (t) => {
	const root = {};
	const ctx = {};
	const info = {} as GraphQLResolveInfo;
	const type = {} as GraphQLAbstractType;

	const adapted = createTypeResolverAdapter((params) => {
		t.is(params.value, root);
		t.is(params.ctx, ctx);
		t.is(params.info, info);
		t.is(params.type, type);
		return '__typename';
	});

	const result = adapted(root, ctx, info, type);

	t.is(result, '__typename');
});
