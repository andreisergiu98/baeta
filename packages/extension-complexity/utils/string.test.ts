import test from '@baeta/testing';
import { capitalize } from './string.ts';

test('capitalize should uppercase the first letter of a string', (t) => {
	t.is(capitalize('hello'), 'Hello');
	t.is(capitalize('world'), 'World');
});

test('capitalize should handle empty strings', (t) => {
	t.is(capitalize(''), '');
});

test('capitalize should not change already capitalized strings', (t) => {
	t.is(capitalize('Hello'), 'Hello');
	t.is(capitalize('World'), 'World');
});

test('capitalize should handle strings with only one character', (t) => {
	t.is(capitalize('a'), 'A');
	t.is(capitalize('z'), 'Z');
});
