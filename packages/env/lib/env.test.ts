import test from '@baeta/testing';
import { createEnvParser } from './env.ts';

// Helper to create mock env getter
const createMockEnv = (mockEnv: Record<string, string>) => {
	return (key: string) => mockEnv[key];
};

test('parses string values correctly', (t) => {
	const parse = createEnvParser(createMockEnv({ NAME: 'test' }));

	const result = parse('NAME', { type: 'string' });
	t.is(result, 'test');
});

test('parses number values correctly', (t) => {
	const parse = createEnvParser(createMockEnv({ PORT: '3000' }));

	const result = parse('PORT', { type: 'number' });
	t.is(result, 3000);
});

test('parses boolean values correctly', (t) => {
	const parse = createEnvParser(createMockEnv({ DEBUG: 'true' }));

	const result = parse('DEBUG', { type: 'boolean' });
	t.true(result);
});

test('uses default value when env var is missing', (t) => {
	const parse = createEnvParser(createMockEnv({}));

	const result = parse('PORT', { type: 'number', default: 3000 });
	t.is(result, 3000);
});

test('throws error when required value is missing', (t) => {
	const parse = createEnvParser(createMockEnv({}));

	const error = t.throws(() => {
		parse('PORT', { type: 'number', required: true });
	});

	t.regex(error.message, /is required/);
});

test('uses custom resolver correctly', (t) => {
	const parse = createEnvParser(createMockEnv({ CUSTOM: 'test' }));

	const result = parse('CUSTOM', {
		type: 'number',
		resolver: (value) => value.length,
	});

	t.is(result, 4);
});

test('throws on resolver type mismatch', (t) => {
	const parse = createEnvParser(createMockEnv({ CUSTOM: 'test' }));

	const error = t.throws(() => {
		parse('CUSTOM', {
			type: 'number',
			resolver: (value) => value as unknown as number, // Returns string instead of number
		});
	});

	t.regex(error.message, /Return type of custom resolver not matching/);
});

test('handles undefined values correctly', (t) => {
	const parse = createEnvParser(createMockEnv({}));

	const result = parse('OPTIONAL', { type: 'string' });
	t.is(result, undefined);
});

test('handles boolean false correctly', (t) => {
	const parse = createEnvParser(createMockEnv({ FLAG: 'false' }));

	const result = parse('FLAG', { type: 'boolean' });
	t.false(result);
});

test('throws on invalid number format', (t) => {
	const parse = createEnvParser(createMockEnv({ NUM: 'not-a-number' }));

	t.throws(() => parse('NUM', { type: 'number' }));
});

test('throws on hex / binary / whitespace-padded number', (t) => {
	const parseHex = createEnvParser(createMockEnv({ NUM: '0x10' }));
	t.throws(() => parseHex('NUM', { type: 'number' }));

	const parseBin = createEnvParser(createMockEnv({ NUM: '0b10' }));
	t.throws(() => parseBin('NUM', { type: 'number' }));

	const parsePadded = createEnvParser(createMockEnv({ NUM: '  42  ' }));
	t.throws(() => parsePadded('NUM', { type: 'number' }));
});

test('accepts scientific notation and signed decimals', (t) => {
	const parse = createEnvParser(createMockEnv({ A: '1e3', B: '-1.5', C: '+0', D: '.5' }));
	t.is(parse('A', { type: 'number' }), 1000);
	t.is(parse('B', { type: 'number' }), -1.5);
	t.is(parse('C', { type: 'number' }), 0);
	t.is(parse('D', { type: 'number' }), 0.5);
});

test('boolean accepts documented set, rejects misc', (t) => {
	const parseTrue = createEnvParser(createMockEnv({ A: 'TRUE', B: '1', C: 'yes', D: 'on' }));
	t.true(parseTrue('A', { type: 'boolean' }));
	t.true(parseTrue('B', { type: 'boolean' }));
	t.true(parseTrue('C', { type: 'boolean' }));
	t.true(parseTrue('D', { type: 'boolean' }));

	const parseFalse = createEnvParser(createMockEnv({ A: 'FALSE', B: '0', C: 'no', D: 'off' }));
	t.false(parseFalse('A', { type: 'boolean' }));
	t.false(parseFalse('B', { type: 'boolean' }));
	t.false(parseFalse('C', { type: 'boolean' }));
	t.false(parseFalse('D', { type: 'boolean' }));

	const parseMisc = createEnvParser(createMockEnv({ A: 'banana', B: 'flase' }));
	t.throws(() => parseMisc('A', { type: 'boolean' }));
	t.throws(() => parseMisc('B', { type: 'boolean' }));
});

test('treats empty string as a set value for string type (not unset)', (t) => {
	const parse = createEnvParser(createMockEnv({ MSG: '' }));

	const result = parse('MSG', { type: 'string', default: 'fallback' });
	t.is(result, '');
});

test('treats empty string as unset for number/boolean (falls back to default)', (t) => {
	const parseNum = createEnvParser(createMockEnv({ PORT: '' }));
	t.is(parseNum('PORT', { type: 'number', default: 3000 }), 3000);

	const parseBool = createEnvParser(createMockEnv({ FLAG: '' }));
	t.true(parseBool('FLAG', { type: 'boolean', default: true }));
});
