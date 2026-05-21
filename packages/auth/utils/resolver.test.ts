import test from '@baeta/testing';
import { isOperationType } from './resolver.ts';

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
