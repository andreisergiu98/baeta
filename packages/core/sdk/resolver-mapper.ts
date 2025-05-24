import type { IResolvers } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import type { ScalarResolver } from '../lib/scalar.ts';
import { composeResolvers } from './compose.ts';
import type { NativeMiddleware } from './middleware.ts';
import type { NativeResolver } from './resolver.ts';
import {
	type MiddlewareMap,
	mergeMiddlewareMaps,
	type ResolversMap,
	type ScalarsMap,
} from './resolver-maps.ts';
import type { NativeTypeResolver } from './resolver-type.ts';
import type { NativeSubscription } from './subscription.ts';

export class ResolverMapper {
	readonly scalars: ScalarsMap = Object.create(null);
	readonly resolvers: ResolversMap = Object.create(null);
	readonly middlewares: MiddlewareMap = Object.create(null);
	readonly prependedMiddlewares: MiddlewareMap = Object.create(null);

	readonly types: string[] = [];
	readonly typeFields: Record<string, string[] | undefined> = Object.create(null);

	getTypes() {
		return this.types;
	}

	getTypeFields(type: string) {
		return this.typeFields[type] ?? [];
	}

	setResolver<Result, Root, Context, Args>(
		type: string,
		field: string,
		resolver: NativeResolver<Result, Root, Context, Args>,
	) {
		this.resolvers[type] ??= {};
		this.resolvers[type][field] = resolver as NativeResolver;
	}

	setScalar(scalar: string, resolver: ScalarResolver) {
		this.scalars[scalar] = resolver;
	}

	setSubscription<Payload, Result, Root, Context, Args>(
		field: string,
		resolver: NativeSubscription<Payload, Result, Root, Context, Args>,
	) {
		this.resolvers.Subscription ??= {};
		this.resolvers.Subscription[field] = resolver as NativeSubscription;
	}

	setTypenameResolver<Result, Value, Context>(
		type: string,
		resolver: NativeTypeResolver<Result, Value, Context>,
	) {
		this.resolvers[type] ??= {};
		this.resolvers[type].__resolveType = resolver as NativeTypeResolver;
	}

	protected addMiddlewareToMap<Result, Root, Context, Args>(
		map: MiddlewareMap,
		type: string,
		field: string,
		middleware: NativeMiddleware<Result, Root, Context, Args>,
	) {
		if (type === '*') {
			for (const t of this.getTypes()) {
				this.addMiddlewareToMap(map, t, field, middleware);
			}
			return;
		}

		if (field === '*') {
			for (const field of this.getTypeFields(type)) {
				this.addMiddlewareToMap(map, type, field, middleware);
			}
			return;
		}

		this.setDefaultFieldResolver(type, field);

		const key = `${type}.${field}`;
		map[key] ??= [];
		map[key].push(middleware as NativeMiddleware);
	}

	addMiddleware<Result, Root, Context, Args>(
		type: string,
		field: string,
		middleware: NativeMiddleware<Result, Root, Context, Args>,
	) {
		this.addMiddlewareToMap(this.middlewares, type, field, middleware);
	}

	prependMiddleware<Result, Root, Context, Args>(
		type: string,
		field: string,
		middleware: NativeMiddleware<Result, Root, Context, Args>,
	) {
		this.addMiddlewareToMap(this.prependedMiddlewares, type, field, middleware);
	}

	setDefaultFieldResolver(type: string, field: string) {
		if (['Query', 'Mutation', 'Subscription'].includes(type)) {
			return;
		}

		if (this.resolvers[type]?.[field] == null) {
			this.setResolver(type, field, defaultFieldResolver);
		}
	}

	registerTypeField(type: string, field: string) {
		if (!this.types.includes(type)) {
			this.types.push(type);
		}

		if (!this.typeFields[type]?.includes(field)) {
			this.typeFields[type] ??= [];
			this.typeFields[type].push(field);
		}
	}

	compose() {
		const resolvers = composeResolvers(
			this.resolvers,
			mergeMiddlewareMaps(this.prependedMiddlewares, this.middlewares),
		);

		return {
			...resolvers,
			...this.scalars,
		} as IResolvers;
	}
}
