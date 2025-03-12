import test from '@baeta/testing';
import { encodeBase64Url } from '@baeta/util-encoding';
import SuperJSON from 'superjson';
import {
	encodeValue as baseEncodeValue,
	encodeArgs,
	encodePropertyName,
	isSafeString,
} from './encoder.ts';

const serializer = new SuperJSON();

function encodeValue(value: unknown, catchAll?: string) {
	return baseEncodeValue(serializer, value, catchAll);
}

class Class {
	a = 1;
	b = 1;

	getTime() {
		return new Date();
	}
}

test('encodeArgs flattens and encodes object properties', (t) => {
	const date = new Date();
	const classInstance = new Class();
	const urlEncoded = encodeBase64Url('"https://google.com/"');
	const bufferEncoded = encodeBase64Url('[116,101,115,116]');

	const args = {
		array: [1, 2, { b: [1, 2, { c: [1] }] }],
		a: {
			b: { c: date, test: classInstance, bint: BigInt(99999999999999) },
			// @ts-expect-error URL is a node global
			url: new URL('https://google.com'),
			buffer: {
				// @ts-expect-error Buffer is a node global
				value: Buffer.from('test'),
			},
		},
	};
	const result = encodeArgs(serializer, args);
	t.is(
		result,
		`_a_b_bint#_99999999999999,_a_b_c#_${date.getTime()},_a_b_test_a#_1,_a_b_test_b#_1,_a_buffer_value#enc_${bufferEncoded},_a_url#enc_${urlEncoded},_array_0#_1,_array_1#_2,_array_2_b_0#_1,_array_2_b_1#_2,_array_2_b_2_c_0#_1`,
	);
});

test('encodeValue handles different types', (t) => {
	t.is(encodeValue(null), 'null');
	t.is(encodeValue(undefined), 'null');
	t.is(encodeValue(''), 'empty');
	t.is(encodeValue('*'), 'star');
	t.is(encodeValue('simple'), '_simple');
	t.is(encodeValue(123), '_123');
	t.is(encodeValue(true), '_true');
	t.is(encodeValue(Symbol()), 'unsupported');

	const date = new Date();
	t.is(encodeValue(date), `_${date.getTime()}`);

	// @ts-expect-error URL is a node global
	t.not(encodeValue(new URL('https://google.com')), 'unsupported');
	// @ts-expect-error Buffer is a node global
	t.not(encodeValue(Buffer.from('test')), 'unsupported');
	t.not(encodeValue(new Map([[1, 2]])), 'unsupported');
	t.not(encodeValue(new Class()), 'unsupported');
});

test('encodeValue with catchAll parameter', (t) => {
	t.is(encodeValue(undefined, '*'), null);
	t.is(encodeValue('', '*'), null);
	t.is(encodeValue('*', '*'), '*');
});

test('encodePropertyName handles different keys', (t) => {
	t.is(encodePropertyName('simple'), '_simple');
	t.is(encodePropertyName('nested.property'), '_nested_property');
	t.is(encodePropertyName('special@char'), 'enc_c3BlY2lhbEBjaGFy');
});

test('isSafeString identifies strings needing encoding', (t) => {
	t.true(isSafeString('With_underscore'));
	t.true(isSafeString('With-dash'));
	t.true(isSafeString('Simple123'));
	t.false(isSafeString('special@chars'));
	t.false(isSafeString('spaces here'));
});
