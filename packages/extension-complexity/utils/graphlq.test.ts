import test from '@baeta/testing';
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { isListOrNullableList } from './graphlq.ts';

test('isListOrNullableList should identify direct GraphQLList', (t) => {
	const listType = new GraphQLList(GraphQLString);
	t.true(isListOrNullableList(listType));
});

test('isListOrNullableList should identify non-nullable GraphQLList', (t) => {
	const nonNullListType = new GraphQLNonNull(new GraphQLList(GraphQLString));
	t.true(isListOrNullableList(nonNullListType));
});

test('isListOrNullableList should identify nested non-nullable lists', (t) => {
	const nestedListType = new GraphQLNonNull(
		new GraphQLList(new GraphQLNonNull(new GraphQLList(GraphQLString))),
	);
	t.true(isListOrNullableList(nestedListType));
});

test('isListOrNullableList should return false for scalar types', (t) => {
	t.false(isListOrNullableList(GraphQLString));
});

test('isListOrNullableList should return false for non-nullable scalar types', (t) => {
	const nonNullScalar = new GraphQLNonNull(GraphQLString);
	t.false(isListOrNullableList(nonNullScalar));
});
