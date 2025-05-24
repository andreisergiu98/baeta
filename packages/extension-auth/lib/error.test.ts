import { AggregateGraphQLError, BaetaErrorCode, UnauthenticatedError } from '@baeta/errors';
import test, { sinon } from '@baeta/testing';
import { log } from '@baeta/util-log';
import { GraphQLError } from 'graphql';
import { aggregateErrorResolver, defaultErrorResolver, resolveError } from './error.ts';

test.before(() => {
	sinon.stub(log, 'warn');
});

test.after(() => {
	sinon.restore();
});

test('resolveError throws resolved error when resolver returns an error', (t) => {
	const customError = new Error('Custom error');
	const resolver = () => customError;
	t.throws(() => resolveError(new Error(), resolver, 'test/path'), { is: customError });
});

test("resolveError throws original error when resolver doesn't return an error", (t) => {
	const originalError = new Error('Original error');
	const resolver = () => 10;
	t.throws(() => resolveError(originalError, resolver, 'test/path'), { is: originalError });
});

test('defaultErrorResolver returns original error for non-aggregate errors', (t) => {
	const error = new GraphQLError('Test error');
	const result = defaultErrorResolver(error, 'test/path');
	t.is(result, error);
});

test('aggregateErrorResolver returns single error when AggregateError contains one error', (t) => {
	const singleError = new GraphQLError('Single error');
	const aggregateError = new AggregateError([singleError]);
	const result = aggregateErrorResolver(aggregateError, 'test/path');
	t.is(result, singleError);
});

test('aggregateErrorResolver combines multiple GraphQLErrors into AggregateGraphQLError', (t) => {
	const error1 = new GraphQLError('Error 1');
	const error2 = new GraphQLError('Error 2');
	const aggregateError = new AggregateError([error1, error2]);

	const result = aggregateErrorResolver(aggregateError, 'test/path') as AggregateGraphQLError;

	t.true(result instanceof AggregateGraphQLError);
	t.is(result.extensions.errors.length, 2);
});

test('aggregateErrorResolver wraps non-GraphQLErrors in InternalServerError', (t) => {
	const regularError = new Error('Regular error');
	const graphqlError = new GraphQLError('GraphQL error');
	const aggregateError = new AggregateError([regularError, graphqlError]);

	const result = aggregateErrorResolver(aggregateError, 'test/path') as AggregateGraphQLError;

	t.true(result instanceof AggregateGraphQLError);
	t.is(result.extensions.errors.length, 2);
	t.is(result.extensions.errors[0].extensions?.code, BaetaErrorCode.InternalServerError);
});

test('aggregateErrorResolver preserves HTTP status when combining errors', (t) => {
	const error1 = new GraphQLError('GraphQL error');
	const error2 = new UnauthenticatedError();
	const aggregateError = new AggregateError([error1, error2]);

	const result = aggregateErrorResolver(aggregateError, 'test/path') as AggregateGraphQLError;

	t.deepEqual(result.extensions?.http, { status: 401 });
});

test('aggregateErrorResolver prioritizes 401 status code', (t) => {
	const error1 = new GraphQLError('Error 1', {
		extensions: { http: { status: 400 } },
	});
	const error2 = new GraphQLError('Error 2', {
		extensions: { http: { status: 401 } },
	});
	const error3 = new GraphQLError('Error 3', {
		extensions: { http: { status: 402 } },
	});
	const aggregateError = new AggregateError([error1, error2, error3]);

	const result = aggregateErrorResolver(aggregateError, 'test/path') as AggregateGraphQLError;

	t.deepEqual(result.extensions.http, { status: 401 });
});
