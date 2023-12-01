import test from 'ava';
import { createObjectLens } from './object';

test('get function returns the value at the specified path', (t) => {
  const input = { foo: { bar: { baz: 'hello' } } };
  const path = ['foo', 'bar', 'baz'];
  const lens = createObjectLens<string>(input, path);

  const value = lens.get();

  t.is(value, 'hello');
});

test('set function updates the value at the specified path', (t) => {
  const input = { foo: { bar: { baz: 'hello' } } };
  const path = ['foo', 'bar', 'baz'];
  const lens = createObjectLens<string>(input, path);

  lens.set('world');

  t.is(input.foo.bar.baz, 'world');
});

test('set function works with arrays', (t) => {
  const input = { foo: { bar: { baz: [1, 2, 3] } } };
  const path = ['foo', 'bar', 'baz', 4];
  const lens = createObjectLens<number>(input, path);

  lens.set(4);

  t.is(input.foo.bar.baz[4], 4);
});

test('get function works with arrays', (t) => {
  const input = { foo: { bar: { baz: [1, 2, 3] } } };
  const path = ['foo', 'bar', 'baz', 1];
  const lens = createObjectLens<number>(input, path);

  const value = lens.get();

  t.is(value, 2);
});

test('set function does nothing if the path is invalid', (t) => {
  const input = { foo: { bar: { baz: 'hello' } } };
  const path = ['foo', 'bar', 'qux', 'biz'];
  const lens = createObjectLens<string>(input, path);

  lens.set('world');

  // @ts-expect-error - qux is not a valid key
  t.is(input.foo.bar.qux, undefined);
});
