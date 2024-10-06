import type { IResolvers } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import type { ScalarResolver } from '../lib/index.ts';
import { composeResolvers } from './compose.ts';
import type { NativeMiddleware } from './middleware.ts';
import type { NativeTypeResolver } from './resolver-type.ts';
import type { NativeResolver } from './resolver.ts';
import type { NativeSubscription } from './subscription.ts';

export type FieldResolvers = Record<string, NativeResolver> & {
	__resolveType?: NativeTypeResolver;
};

export type SubscriptionsResolvers = {
	Subscription?: Record<string, NativeSubscription | undefined>;
};

export type ResolversMap = {
	[type: string]: FieldResolvers | undefined;
} & SubscriptionsResolvers;

export type ScalarsMap = Record<string, ScalarResolver | undefined>;
export type MiddlewareMap = Record<string, NativeMiddleware[] | undefined>;

export class ResolverMapper {
	readonly scalars: ScalarsMap = Object.create(null);
	readonly resolvers: ResolversMap = Object.create(null);
	readonly middlewares: MiddlewareMap = Object.create(null);

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

	addMiddleware<Result, Root, Context, Args>(
		type: string,
		field: string,
		middleware: NativeMiddleware<Result, Root, Context, Args>,
		unshift = false,
	) {
		if (type === '*') {
			for (const t of this.getTypes()) {
				this.addMiddleware(t, field, middleware, unshift);
			}

			return;
		}

		if (field === '*') {
			for (const field of this.getTypeFields(type)) {
				this.addMiddleware(type, field, middleware, unshift);
			}

			return;
		}

		this.setDefaultFieldResolver(type, field);
		const key = `${type}.${field}`;
		this.middlewares[key] ??= [];

		if (unshift) {
			this.middlewares[key].unshift(middleware as NativeMiddleware);
		} else {
			this.middlewares[key].push(middleware as NativeMiddleware);
		}
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
		const resolvers = composeResolvers(this.resolvers, this.middlewares);

		return {
			...resolvers,
			...this.scalars,
		} as IResolvers;
	}
}
