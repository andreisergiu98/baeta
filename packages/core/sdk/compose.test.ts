import test from 'ava';
import { GraphQLResolveInfo } from 'graphql';
import { forgeNativeResolver, forgeResolverArgs, getResolverFromMap } from './__test__/utils';
import { chainResolvers, composeResolvers } from './compose';
import { NativeMiddleware } from './middleware';
import { NativeResolver } from './resolver';
import { MiddlewareMap } from './resolver-mapper';

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

	const middleware = (next: NativeResolver) => {
		return (root: {}, args: {}, context: {}, info: GraphQLResolveInfo) => {
			const result = next(root, args, context, info);

			if (typeof result === 'number') {
				return result + 1;
			}

			return result;
		};
	};

	const createResolver = chainResolvers([middleware, middleware, () => resolver]);
	const composedResolver = createResolver();

	t.is(composedResolver(), 2);
});

test('chainResolvers returns the original resolver if there is only one function', (t) => {
	const resolver = forgeNativeResolver(0);
	const createResolver = chainResolvers([() => resolver]);
	const composedResolver = createResolver();
	t.is(composedResolver(), 0);
});
