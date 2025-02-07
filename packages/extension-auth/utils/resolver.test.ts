import test from 'ava';
import { createResolverPath } from './resolver.ts';

test('createResolverPath should handle various path scenarios', (t) => {
	t.is(createResolverPath(undefined), '');

	t.is(
		createResolverPath({
			key: 'field',
			typename: 'Type',
			prev: undefined,
		}),
		'Type.field',
	);

	t.is(
		createResolverPath({
			key: 'field2',
			typename: 'Type2',
			prev: {
				key: 'field1',
				typename: 'Type1',
				prev: undefined,
			},
		}),
		'Type1.field1.Type2.field2',
	);

	t.is(
		createResolverPath({
			key: 'field',
			typename: undefined,
			prev: {
				key: 'prevField',
				typename: 'PrevType',
				prev: undefined,
			},
		}),
		'PrevType.prevField',
	);

	t.is(
		createResolverPath({
			key: 'field',
			typename: undefined,
			prev: undefined,
		}),
		'',
	);

	t.is(
		createResolverPath({
			key: 'field2',
			typename: 'Type2',
			prev: {
				key: 0,
				typename: undefined,
				prev: {
					key: 'field1',
					typename: 'Type1',
					prev: undefined,
				},
			},
		}),
		'Type1.field1.Type2.field2',
	);
});
