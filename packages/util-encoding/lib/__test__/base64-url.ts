import test from '@baeta/testing';

type TestFn = (value: string) => string;

export function createBase64UrlTests(encodeBase64Url: TestFn, decodeBase64Url: TestFn) {
	test('encodeBase64Url: should encode simple string correctly', (t) => {
		const input = 'Hello, World!';
		const expected = 'SGVsbG8sIFdvcmxkIQ';
		t.is(encodeBase64Url(input), expected);
	});

	test('encodeBase64Url: should handle empty string', (t) => {
		t.is(encodeBase64Url(''), '');
	});

	test('encodeBase64Url: should handle special characters', (t) => {
		const input = '!@#$%^&*()_+';
		const expected = 'IUAjJCVeJiooKV8r';
		t.is(encodeBase64Url(input), expected);
	});

	test('encodeBase64Url: should handle UTF-8 characters', (t) => {
		const input = '你好，世界';
		const expected = '5L2g5aW977yM5LiW55WM';
		t.is(encodeBase64Url(input), expected);
	});

	test('encodeBase64Url: should replace standard Base64 characters correctly', (t) => {
		const input = 'subjects?';
		const expected = 'c3ViamVjdHM_'; // Contains URL-safe characters
		t.is(encodeBase64Url(input), expected);
	});

	test('decodeBase64Url: should decode simple string correctly', (t) => {
		const input = 'SGVsbG8sIFdvcmxkIQ';
		const expected = 'Hello, World!';
		t.is(decodeBase64Url(input), expected);
	});

	test('decodeBase64Url: should handle empty string', (t) => {
		t.is(decodeBase64Url(''), '');
	});

	test('decodeBase64Url: should handle special characters', (t) => {
		const input = 'IUAjJCVeJiooKV8r';
		const expected = '!@#$%^&*()_+';
		t.is(decodeBase64Url(input), expected);
	});

	test('decodeBase64Url: should handle UTF-8 characters', (t) => {
		const input = '5L2g5aW977yM5LiW55WM';
		const expected = '你好，世界';
		t.is(decodeBase64Url(input), expected);
	});

	test('decodeBase64Url: should handle URL-safe characters correctly', (t) => {
		const input = 'c3ViamVjdHM_';
		const expected = 'subjects?';
		t.is(decodeBase64Url(input), expected);
	});

	test('encodeBase64Url: should handle very long strings', (t) => {
		const longString = 'a'.repeat(100000);
		const encoded = encodeBase64Url(longString);
		const decoded = decodeBase64Url(encoded);
		t.is(decoded, longString);
	});

	test('encodeBase64Url: should handle binary data', (t) => {
		const binaryString = String.fromCharCode(...Array(256).keys());
		const encoded = encodeBase64Url(binaryString);
		const decoded = decodeBase64Url(encoded);
		t.is(decoded, binaryString);
	});

	test('base64url round trip: encode -> decode should return original string', (t) => {
		const original = 'Hello, World! 你好，世界 !@#$%^&*()_+';
		const encoded = encodeBase64Url(original);
		const decoded = decodeBase64Url(encoded);
		t.is(decoded, original);
	});

	test('base64url round trip: should handle empty string', (t) => {
		const original = '';
		const encoded = encodeBase64Url(original);
		const decoded = decodeBase64Url(encoded);
		t.is(decoded, original);
	});
}
