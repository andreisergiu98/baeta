import test from '@baeta/testing';
import { ComplexityError, getDefaultComplexityError } from './complexity-errors.ts';
import { defaultLimits, normalizeOptions } from './complexity-options.ts';

test('normalizeOptions should use default values when no options are provided', (t) => {
	const options = normalizeOptions({});

	t.deepEqual(options.limit, defaultLimits);
	t.is(options.defaultComplexity, 1);
	t.is(options.defaultListMultiplier, 10);
	t.is(options.complexityError, getDefaultComplexityError);
});

test('normalizeOptions should preserve provided values', (t) => {
	const customLimits = { depth: 5, breadth: 20, complexity: 500 };
	const customError = () => new ComplexityError('Custom error');

	const options = normalizeOptions({
		limit: customLimits,
		defaultComplexity: 2,
		defaultListMultiplier: 5,
		complexityError: customError,
	});

	t.deepEqual(options.limit, customLimits);
	t.is(options.defaultComplexity, 2);
	t.is(options.defaultListMultiplier, 5);
	t.is(options.complexityError, customError);
});

test('normalizeOptions should allow partial options', (t) => {
	const options = normalizeOptions({
		defaultComplexity: 3,
	});

	t.deepEqual(options.limit, defaultLimits);
	t.is(options.defaultComplexity, 3);
	t.is(options.defaultListMultiplier, 10);
	t.is(options.complexityError, getDefaultComplexityError);
});
