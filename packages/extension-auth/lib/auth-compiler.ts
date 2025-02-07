import type { NativeMiddleware, ResolverMapper } from '@baeta/core/sdk';
import { isOperationType } from '../utils/resolver.ts';
import { createFallbackMiddleware } from './auth-middlewares.ts';
import type { ScopeErrorResolver } from './error.ts';
import type { DefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';

export type MiddlewareMap = Record<string, Record<string, undefined | NativeMiddleware>>;

export function compileMiddlewares<Context>(
	mapper: ResolverMapper,
	middlewareMap: MiddlewareMap,
	loadScopes: GetScopeLoader<Context>,
	defaultScopes?: DefaultScopes,
	errorResolver?: ScopeErrorResolver,
) {
	for (const type of mapper.getTypes()) {
		let fields = mapper.getTypeFields(type);

		if (type === 'Subscription') {
			fields = fields.flatMap((field) => [`${field}.subscribe`, `${field}.resolve`]);
		}

		const fieldsWithScopes = Object.keys(middlewareMap[type] ?? {});
		let fieldsWithoutScopes = fields.filter((field) => !fieldsWithScopes.includes(field));

		for (const field of fieldsWithScopes) {
			const middleware = middlewareMap[type][field];

			if (middleware == null) {
				continue;
			}

			if (field !== '*') {
				mapper.prependMiddleware(type, field, middleware);
				continue;
			}

			for (const fieldWithoutScope of fieldsWithoutScopes) {
				mapper.prependMiddleware(type, fieldWithoutScope, middleware);
			}

			fieldsWithoutScopes = [];
		}

		if (!isOperationType(type) || fieldsWithoutScopes.length === 0) {
			continue;
		}

		for (const field of fieldsWithoutScopes) {
			const middleware = createFallbackMiddleware(
				type,
				field,
				loadScopes,
				defaultScopes,
				errorResolver,
			);

			if (middleware) {
				mapper.prependMiddleware(type, field, middleware);
			}
		}
	}
}
