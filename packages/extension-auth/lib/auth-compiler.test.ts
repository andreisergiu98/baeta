import type { NativeMiddleware, ResolverMapper } from '@baeta/core/sdk';
import { sinon } from '@baeta/testing';
import test from 'ava';
import { compileMiddlewares } from './auth-compiler.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';

type TestScopes = {
	trueScope: true;
	falseScope: true;
};

type TestGrant = 'grant';

function createMapper() {
	return {
		getTypes: sinon.stub().returns(['Query', 'Mutation', 'Subscription', 'Type']),
		getTypeFields: sinon.stub((type: string) => {
			if (type === 'Query') {
				return ['query1', 'query2'];
			}
			if (type === 'Mutation') {
				return ['mutation1', 'mutation2'];
			}
			if (type === 'Subscription') {
				return ['sub1', 'sub2'];
			}
			return ['field1', 'field2'];
		}),
		prependMiddleware: sinon.spy(),
	};
}

function castMapper(mapper: Record<string, unknown>): ResolverMapper {
	return mapper as unknown as ResolverMapper;
}

function createMiddleware(): NativeMiddleware {
	return (next) =>
		(...args) =>
			next(...args);
}

function createScopeLoader(): GetScopeLoader<TestScopes, TestGrant> {
	return async () => ({
		trueScope: true,
		falseScope: false,
	});
}

test('compileMiddlewares registers middlewares', (t) => {
	const mapper = createMapper();
	const middleware = createMiddleware();
	const loadScopes = createScopeLoader();

	const middlewareMap = {
		Query: {
			query1: middleware,
		},
		Mutation: {
			mutation1: middleware,
		},
		Subscription: {
			'sub1.subscribe': middleware,
			'sub2.resolve': middleware,
		},
		Type: {
			field1: middleware,
		},
	};

	compileMiddlewares(castMapper(mapper), middlewareMap, loadScopes);

	t.true(mapper.prependMiddleware.calledWith('Query', 'query1', middleware));
	t.true(mapper.prependMiddleware.neverCalledWith('Query', 'query2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation1', middleware));
	t.true(mapper.prependMiddleware.neverCalledWith('Mutation', 'mutation2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.subscribe', middleware));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.resolve', middleware));
	t.true(mapper.prependMiddleware.neverCalledWith('Subscription', 'sub2.subscribe', middleware));
	t.true(mapper.prependMiddleware.neverCalledWith('Subscription', 'sub1.resolve', middleware));

	t.true(mapper.prependMiddleware.calledWith('Type', 'field1', middleware));
	t.true(mapper.prependMiddleware.neverCalledWith('Type', 'field2', middleware));
});

test('compileMiddlewares registers wildcard middlewares', (t) => {
	const mapper = createMapper();
	const middleware = createMiddleware();
	const loadScopes = createScopeLoader();

	const middlewareMap = {
		Query: {
			'*': middleware,
		},
		Mutation: {
			'*': middleware,
		},
		Subscription: {
			'*': middleware,
		},
		Type: {
			'*': middleware,
		},
	};

	compileMiddlewares(castMapper(mapper), middlewareMap, loadScopes);

	t.true(mapper.prependMiddleware.calledWith('Query', 'query1', middleware));
	t.true(mapper.prependMiddleware.calledWith('Query', 'query2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation1', middleware));
	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.subscribe', middleware));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.subscribe', middleware));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.resolve', middleware));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.resolve', middleware));

	t.true(mapper.prependMiddleware.calledWith('Type', 'field1', middleware));
	t.true(mapper.prependMiddleware.calledWith('Type', 'field2', middleware));
});

test("compileMiddlewares wildcard won't overwrite preexisting middlewares", (t) => {
	const mapper = createMapper();
	const loadScopes = createScopeLoader();

	const middleware1 = createMiddleware();
	const middleware2 = createMiddleware();

	const middlewareMap = {
		Query: {
			'*': middleware1,
			query2: middleware2,
		},
		Mutation: {
			mutation2: middleware2,
			'*': middleware1,
		},
		Subscription: {
			'*': middleware1,
			'sub2.subscribe': middleware2,
		},
		Type: {
			'*': middleware1,
			field2: middleware2,
		},
	};

	compileMiddlewares(castMapper(mapper), middlewareMap, loadScopes);

	t.true(mapper.prependMiddleware.calledWith('Query', 'query1', middleware1));
	t.true(mapper.prependMiddleware.calledWith('Query', 'query2', middleware2));

	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation1', middleware1));
	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation2', middleware2));

	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.subscribe', middleware1));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.subscribe', middleware2));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.resolve', middleware1));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.resolve', middleware1));

	t.true(mapper.prependMiddleware.calledWith('Type', 'field1', middleware1));
	t.true(mapper.prependMiddleware.calledWith('Type', 'field2', middleware2));
});

test('compileMiddlewares registers fallback when no middleware provided', (t) => {
	const mapper = createMapper();
	const middleware = createMiddleware();
	const loadScopes = createScopeLoader();

	const middlewareMap = {
		Query: {
			query1: middleware,
		},
		Subscription: {
			'sub1.subscribe': middleware,
		},
	};

	const defaultScopes: DefaultScopes<TestScopes, TestGrant> = {
		Query: {
			trueScope: true,
		},
		Mutation: {
			trueScope: true,
		},
		Subscription: {
			subscribe: {
				trueScope: true,
			},
		},
	};

	compileMiddlewares(castMapper(mapper), middlewareMap, loadScopes, defaultScopes);

	t.true(mapper.prependMiddleware.calledWith('Query', 'query1', middleware));
	t.true(mapper.prependMiddleware.calledWith('Query', 'query2'));
	// We want to know that a middleware was registered, but not with this specific one
	t.true(mapper.prependMiddleware.neverCalledWith('Query', 'query2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation1'));
	t.true(mapper.prependMiddleware.neverCalledWith('Mutation', 'mutation1', middleware));
	t.true(mapper.prependMiddleware.calledWith('Mutation', 'mutation2'));
	t.true(mapper.prependMiddleware.neverCalledWith('Mutation', 'mutation2', middleware));

	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub1.subscribe', middleware));
	t.true(mapper.prependMiddleware.calledWith('Subscription', 'sub2.subscribe'));
	t.true(mapper.prependMiddleware.neverCalledWith('Subscription', 'sub2.subscribe', middleware));

	t.true(mapper.prependMiddleware.neverCalledWith('Subscription', 'sub1.resolve'));
	t.true(mapper.prependMiddleware.neverCalledWith('Subscription', 'sub2.resolve'));

	t.true(mapper.prependMiddleware.neverCalledWith('Type', 'field1'));
	t.true(mapper.prependMiddleware.neverCalledWith('Type', 'field2'));
});
