import type { GraphQLFieldResolver } from 'graphql';
import { createObjectLens } from '../utils/object.ts';
import type { NativeMiddleware } from './middleware.ts';
import type { MiddlewareMap, ResolversMap, SubscriptionsResolvers } from './resolver-maps.ts';

export function composeResolvers(resolvers: ResolversMap, middlewareMap: MiddlewareMap = {}) {
	const composed = copyResolvers(resolvers);

	for (const key in middlewareMap) {
		const middlewares = middlewareMap[key] ?? [];

		if (middlewares.length === 0) {
			continue;
		}

		const path = key.split('.');
		const lens = createObjectLens<GraphQLFieldResolver<unknown, unknown>>(composed, path);
		const originalResolver = lens.get();

		if (!originalResolver) {
			continue;
		}

		lens.set(chainMiddlewares(middlewares, originalResolver));
	}

	return composed;
}

export function copySubscriptionResolvers(map: ResolversMap) {
	if (map.Subscription == null) {
		return;
	}

	const subscription = map.Subscription;
	const copy = {} as NonNullable<SubscriptionsResolvers['Subscription']>;

	for (const key in subscription) {
		const resolvers = subscription[key];

		if (resolvers) {
			copy[key] = { ...resolvers };
		}
	}

	return copy;
}

export function copyResolvers<T extends ResolversMap>(resolvers: T): T {
	const copy = {} as T;

	for (const key in resolvers) {
		if (key === 'Subscription') {
			copy.Subscription = copySubscriptionResolvers(resolvers);
			continue;
		}

		if (resolvers[key]) {
			copy[key] = { ...resolvers[key] };
		}
	}

	return copy;
}

export function chainMiddlewares(
	middlewares: NativeMiddleware[],
	resolver: GraphQLFieldResolver<unknown, unknown>,
) {
	if (middlewares.length === 0) {
		return resolver;
	}

	const chain = middlewares.reduce((a, b) => {
		return (next) => a(b(next));
	});

	return chain(resolver);
}
