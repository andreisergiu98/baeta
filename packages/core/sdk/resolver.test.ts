import test from 'ava';
import { GraphQLResolveInfo } from 'graphql';
import { createResolverAdapter } from './resolver';

test('createResolverAdapter should map parameters correctly', (t) => {
  const adapted = createResolverAdapter((params) => {
    return params;
  });

  const root = {};
  const args = {};
  const ctx = {};
  const info = {} as GraphQLResolveInfo;

  const result = adapted(root, args, ctx, info) as {
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
