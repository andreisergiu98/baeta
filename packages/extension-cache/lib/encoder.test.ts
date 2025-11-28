import test from '@baeta/testing';
import { encodeBase64Url } from '@baeta/util-encoding';
import { encodeValue as baseEncodeValue, encodePropertyName, isSafeString } from './encoder.ts';

function encodeValue(value: unknown, catchAll?: string) {
	const result = baseEncodeValue(
		value,
		catchAll ? { kind: 'WILDCARD', value: catchAll } : undefined,
	);
	return result.value;
}

class Class {
	a = 1;
	b = 1;
	getTime() {
		return new Date();
	}
}

const global = globalThis as typeof globalThis & {
	Buffer: any;
	URL: any;
	crypto: {
		randomUUID: () => string;
	};
};

const Buffer = global.Buffer;
const URL = global.URL;

test('encodeValue handles different types', (t) => {
	t.is(encodeValue(null), 'null');
	t.is(encodeValue(undefined), 'undefined');
	t.is(encodeValue(''), 'blank');
	t.is(encodeValue('*'), 'star');
	t.is(encodeValue('simple'), '_simple');
	t.is(encodeValue(123), '_123');
	t.is(encodeValue(true), '_true');
	t.throws(() => encodeValue(Symbol()));

	const date = new Date();
	t.is(encodeValue(date), `enc_${encodeBase64Url(`"${date.toISOString()}"`)}`);
	const url = new URL('https://example.com');
	t.is(encodeValue(url), `enc_${encodeBase64Url('"https://example.com/"')}`);
	const buffer = Buffer.from('test');
	t.is(encodeValue(buffer), `enc_${encodeBase64Url(`{"type":"Buffer","data":[116,101,115,116]}`)}`);
	const map = new Map([[1, 2]]);
	t.is(encodeValue(map), `enc_${encodeBase64Url('{}')}`);
	const classInstance = new Class();
	t.is(encodeValue(classInstance), `enc_${encodeBase64Url('{"a":1,"b":1}')}`);
});

test('encodeValue with catchAll parameter', (t) => {
	t.is(encodeValue(null, '*'), 'null');
	t.is(encodeValue('', '*'), 'blank');
	t.is(encodeValue(undefined, '*'), '*');
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
