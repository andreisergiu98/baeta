import test from '@baeta/testing';
import { createResolverPath, isOperationType } from './resolver.ts';

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

test('isOperationType should return true for valid operation types', (t) => {
	t.true(isOperationType('Query'));
	t.true(isOperationType('Mutation'));
	t.true(isOperationType('Subscription'));
});

test('isOperationType should return false for invalid operation types', (t) => {
	t.false(isOperationType('Invalid'));
	t.false(isOperationType(''));
	t.false(isOperationType('query'));
	t.false(isOperationType('mutation'));
});
