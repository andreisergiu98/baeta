import test from '@baeta/testing';

type TestFn = (value: string) => string;

export function createBase64Tests(encodeBase64: TestFn, decodeBase64: TestFn) {
	test('encodeBase64: should encode simple string correctly', (t) => {
		const input = 'Hello, World!';
		const expected = 'SGVsbG8sIFdvcmxkIQ==';
		t.is(encodeBase64(input), expected);
	});

	test('encodeBase64: should handle empty string', (t) => {
		t.is(encodeBase64(''), '');
	});

	test('encodeBase64: should handle special characters', (t) => {
		const input = '!@#$%^&*()_+';
		const expected = 'IUAjJCVeJiooKV8r';
		t.is(encodeBase64(input), expected);
	});

	test('encodeBase64: should handle UTF-8 characters', (t) => {
		const input = '你好，世界';
		const expected = '5L2g5aW977yM5LiW55WM';
		t.is(encodeBase64(input), expected);
	});

	test('decodeBase64: should decode simple string correctly', (t) => {
		const input = 'SGVsbG8sIFdvcmxkIQ==';
		const expected = 'Hello, World!';
		t.is(decodeBase64(input), expected);
	});

	test('decodeBase64: should handle empty string', (t) => {
		t.is(decodeBase64(''), '');
	});

	test('decodeBase64: should handle special characters', (t) => {
		const input = 'IUAjJCVeJiooKV8r';
		const expected = '!@#$%^&*()_+';
		t.is(decodeBase64(input), expected);
	});

	test('decodeBase64: should handle UTF-8 characters', (t) => {
		const input = '5L2g5aW977yM5LiW55WM';
		const expected = '你好，世界';
		t.is(decodeBase64(input), expected);
	});

	test('encodeBase64: should handle very long strings', (t) => {
		const longString = 'a'.repeat(100000);
		const encoded = encodeBase64(longString);
		const decoded = decodeBase64(encoded);
		t.is(decoded, longString);
	});

	test('encodeBase64: should handle binary data', (t) => {
		const binaryString = String.fromCharCode(...Array(256).keys());
		const encoded = encodeBase64(binaryString);
		const decoded = decodeBase64(encoded);
		t.is(decoded, binaryString);
	});

	test('base64 round trip: encode -> decode should return original string', (t) => {
		const original = 'Hello, World! 你好，世界 !@#$%^&*()_+';
		const encoded = encodeBase64(original);
		const decoded = decodeBase64(encoded);
		t.is(decoded, original);
	});

	test('base64 round trip: should handle empty string', (t) => {
		const original = '';
		const encoded = encodeBase64(original);
		const decoded = decodeBase64(encoded);
		t.is(decoded, original);
	});
}
