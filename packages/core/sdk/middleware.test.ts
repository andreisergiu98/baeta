import test from 'ava';
import type { GraphQLResolveInfo } from 'graphql';
import { createMiddlewareAdapter } from './middleware.ts';
import { createResolverAdapter } from './resolver.ts';

test('createMiddlewareAdapter should map parameters correctly', (t) => {
	const root = {};
	const args = {};
	const ctx = {};
	const info = {} as GraphQLResolveInfo;

	const resolver = createResolverAdapter((params) => params);

	const adapted = createMiddlewareAdapter((params, next) => {
		t.is(params.root, root);
		t.is(params.args, args);
		t.is(params.ctx, ctx);
		t.is(params.info, info);
		return next();
	});

	const result = adapted(resolver)(root, args, ctx, info) as {
		root: unknown;
		args: unknown;
		ctx: unknown;
		info: unknown;
	};

	t.is(result.root, root);
	t.is(result.args, args);
	t.is(result.ctx, ctx);
	t.is(result.info, info);
});
