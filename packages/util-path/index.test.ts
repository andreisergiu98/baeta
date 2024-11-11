import test from 'ava';
import { join, normalize, posixPath, toUnix, winPath } from './index.ts';

test('posixPath: should convert Windows path to POSIX path', (t) => {
	const winStyle = 'foo\\bar\\baz';
	const expected = 'foo/bar/baz';
	t.is(posixPath(winStyle), expected);
});

test('posixPath: should leave POSIX path unchanged', (t) => {
	const posixStyle = 'foo/bar/baz';
	t.is(posixPath(posixStyle), posixStyle);
});

test('posixPath: should handle empty string', (t) => {
	t.is(posixPath(''), '');
});

test('winPath: should convert POSIX path to Windows path', (t) => {
	const posixStyle = 'foo/bar/baz';
	const expected = 'foo\\bar\\baz';
	t.is(winPath(posixStyle), expected);
});

test('winPath: should leave Windows path unchanged', (t) => {
	const winStyle = 'foo\\bar\\baz';
	t.is(winPath(winStyle), winStyle);
});

test('winPath: should handle empty string', (t) => {
	t.is(winPath(''), '');
});

test('path conversion: should preserve path in roundtrip conversion', (t) => {
	const original = 'foo/bar/baz';
	t.is(posixPath(winPath(original)), original);
});

test('join: should combine paths using forward slashes', (t) => {
	t.is(join('foo', 'bar', 'baz'), 'foo/bar/baz');
});

test('normalize: should normalize path with forward slashes', (t) => {
	t.is(normalize('foo//bar/../baz'), 'foo/baz');
});

test('toUnix: should convert path to use forward slashes', (t) => {
	t.is(toUnix('foo\\bar\\baz'), 'foo/bar/baz');
});

test('posixPath: should handle paths with multiple consecutive separators', (t) => {
	t.is(posixPath('foo\\\\bar\\\\baz'), 'foo//bar//baz');
});

test('winPath: should handle paths with multiple consecutive separators', (t) => {
	t.is(winPath('foo//bar//baz'), 'foo\\\\bar\\\\baz');
});

test('posixPath: should handle mixed separators', (t) => {
	t.is(posixPath('foo\\bar/baz\\qux'), 'foo/bar/baz/qux');
});

test('winPath: should handle mixed separators', (t) => {
	t.is(winPath('foo/bar\\baz/qux'), 'foo\\bar\\baz\\qux');
});
