import test from 'ava';
import type { GraphQLResolveInfo } from 'graphql';
import { forgeNativeResolver, forgeResolverArgs, getResolverFromMap } from './__test__/utils.ts';
import { chainMiddlewares, composeResolvers } from './compose.ts';
import type { NativeMiddleware } from './middleware.ts';
import type { MiddlewareMap } from './resolver-maps.ts';

function createMockedResolverMap() {
	return {
		Query: {
			user: () => ({
				id: 1,
				name: 'John Doe',
				age: 25,
			}),
		},
		Mutation: {
			createUser: () => ({
				id: 1,
				name: 'John Doe',
				age: 25,
			}),
		},
	};
}

function createMockedMiddleware(): NativeMiddleware {
	return (next) => (root, args, context, info) => {
		const result = next(root, args, context, info);
		return result ? { ...result, age: 30 } : null;
	};
}

function createMockedMiddlewareMap(): MiddlewareMap {
	return {
		'Query.user': [createMockedMiddleware()],
	};
}

test('composeResolvers replaces the default resolver with the composed resolver', (t) => {
	const resolverMap = createMockedResolverMap();
	const middlewareMap = createMockedMiddlewareMap();
	const composed = composeResolvers(resolverMap, middlewareMap);

	const resolver = getResolverFromMap(composed, 'Query', 'user');
	const resolverArgs = forgeResolverArgs();

	t.deepEqual(resolver(...resolverArgs.native), {
		id: 1,
		name: 'John Doe',
		age: 30,
	});
});

test('composeResolvers does not replace resolvers for non-mapped types', (t) => {
	const resolverMap = createMockedResolverMap();
	const middlewareMap = createMockedMiddlewareMap();
	const composed = composeResolvers(resolverMap, middlewareMap);

	const mutationResolver = getResolverFromMap(composed, 'Mutation', 'createUser');

	t.is(mutationResolver, resolverMap.Mutation.createUser);
});

test('chainResolvers correctly composes multiple resolvers', (t) => {
	const resolver = forgeNativeResolver(0);

	const middleware: NativeMiddleware = (next) => {
		return (root, args, context, info) => {
			const result = next(root, args, context, info);

			if (typeof result === 'number') {
				return result + 1;
			}

			return result;
		};
	};

	const composedResolver = chainMiddlewares([middleware, middleware], resolver);

	t.is(composedResolver({}, {}, {}, {} as GraphQLResolveInfo), 2);
});

test('chainResolvers returns the original resolver if there is only one function', (t) => {
	const resolver = forgeNativeResolver(0);
	const composedResolver = chainMiddlewares([], resolver);
	t.is(composedResolver({}, {}, {}, {} as GraphQLResolveInfo), 0);
});
