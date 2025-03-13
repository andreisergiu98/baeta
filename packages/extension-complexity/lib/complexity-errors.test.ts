import test from '@baeta/testing';
import {
	ComplexityError,
	ComplexityErrorCode,
	ComplexityErrorKind,
	getDefaultComplexityError,
} from './complexity-errors.ts';

test('ComplexityError should merge extensions', (t) => {
	const error = new ComplexityError('Error', {
		extensions: { customField: 'value' },
	});
	t.is(error.extensions.code, ComplexityErrorCode);
	t.is(error.extensions.customField, 'value');
});

test('getDefaultComplexityError should create depth error message', (t) => {
	const error = getDefaultComplexityError(ComplexityErrorKind.Depth, 5, 10);

	t.is(error.message, 'Depth limit of 5 exceeded, got: 10');
	t.is(error.extensions.kind, ComplexityErrorKind.Depth);
	t.is(error.extensions.limit, 5);
	t.is(error.extensions.got, 10);
});

test('getDefaultComplexityError should create breadth error message', (t) => {
	const error = getDefaultComplexityError(ComplexityErrorKind.Breadth, 20, 30);

	t.is(error.message, 'Breadth limit of 20 exceeded, got: 30');
	t.is(error.extensions.kind, ComplexityErrorKind.Breadth);
	t.is(error.extensions.limit, 20);
	t.is(error.extensions.got, 30);
});

test('getDefaultComplexityError should create complexity error message', (t) => {
	const error = getDefaultComplexityError(ComplexityErrorKind.Complexity, 100, 150);

	t.is(error.message, 'Complexity limit of 100 exceeded, got: 150');
	t.is(error.extensions.kind, ComplexityErrorKind.Complexity);
	t.is(error.extensions.limit, 100);
	t.is(error.extensions.got, 150);
});
