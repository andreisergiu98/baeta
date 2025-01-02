import test from 'ava';
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

	const result = parse('NUM', { type: 'number' });
	t.true(Number.isNaN(result));
});
