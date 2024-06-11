import { IResolvers } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLFieldResolver } from 'graphql';
import { ScalarResolver } from '../lib';
import { composeResolvers } from './compose';
import { NativeMiddleware } from './middleware';
import { NativeTypeResolver } from './resolver-type';
import { NativeSubscribe } from './subscription';

export type FieldResolvers = Record<string, GraphQLFieldResolver<unknown, unknown>> & {
  __resolveType?: NativeTypeResolver;
};

export type SubscriptionsResolvers = {
  Subscription?: Record<string, NativeSubscribe | undefined>;
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

  setResolver(type: string, field: string, resolver: GraphQLFieldResolver<unknown, unknown>) {
    this.resolvers[type] ??= {};
    // biome-ignore lint/style/noNonNullAssertion: map initialized above
    this.resolvers[type]![field] = resolver;
  }

  setScalar(scalar: string, resolver: ScalarResolver) {
    this.scalars[scalar] = resolver;
  }

  setSubscription(field: string, resolver: NativeSubscribe) {
    this.resolvers.Subscription ??= {};
    this.resolvers.Subscription[field] = resolver;
  }

  setTypenameResolver(type: string, resolver: NativeTypeResolver) {
    this.resolvers[type] ??= {};
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    this.resolvers[type]!.__resolveType = resolver;
  }

  addMiddleware(type: string, field: string, middleware: NativeMiddleware, unshift = false) {
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
      // biome-ignore lint/style/noNonNullAssertion: initialized above
      this.middlewares[key]!.unshift(middleware);
    } else {
      // biome-ignore lint/style/noNonNullAssertion: initialized above
      this.middlewares[key]!.push(middleware);
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
      // biome-ignore lint/style/noNonNullAssertion: map initialized above
      this.typeFields[type]!.push(field);
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
