import type { Middleware } from '../lib/middleware.ts';
import type { Resolver } from '../lib/resolver.ts';

export function composeMiddlewares<Result, Source, Context, Args, Info>(
	middlewares: Middleware<Result, Source, Context, Args, Info>[],
	resolver: Resolver<Result, Source, Context, Args, Info>,
): Resolver<Result, Source, Context, Args, Info> {
	if (middlewares.length === 0) {
		return resolver;
	}
	return middlewares.reduceRight<Resolver<Result, Source, Context, Args, Info>>(
		(next, middleware) => (params) => middleware(async () => next(params), params),
		resolver,
	);
}
