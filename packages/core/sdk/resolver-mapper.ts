import { IResolvers } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLFieldResolver } from 'graphql';
import { ScalarResolver } from '../lib';
import { composeResolvers } from './compose';
import { NativeMiddleware } from './middleware';
import { NativeSubscribe } from './subscription';

export type FieldResolvers = Record<string, GraphQLFieldResolver<unknown, unknown>>;

export type SubscriptionsResolvers = {
  Subscription?: Record<string, NativeSubscribe | undefined> | undefined;
};

export type ResolversMap = Record<string, FieldResolvers | undefined> & SubscriptionsResolvers;

export type MiddlewareMap = Record<string, NativeMiddleware[]>;

export type ScalarsMap = Record<string, ScalarResolver | undefined>;

export class ResolverMapper {
  readonly scalars: ScalarsMap = {};
  readonly resolvers: ResolversMap = {};
  readonly middlewares: MiddlewareMap = {};
  readonly typeFields: Record<string, string[]> = {};

  setResolver(type: string, field: string, resolver: GraphQLFieldResolver<unknown, unknown>) {
    if (this.resolvers[type] == null) {
      this.resolvers[type] = {};
    }
    (this.resolvers[type] as FieldResolvers)[field] = resolver;
  }

  setScalar(scalar: string, resolver: ScalarResolver) {
    this.scalars[scalar] = resolver;
  }

  setSubscription(field: string, resolver: NativeSubscribe) {
    if (this.resolvers.Subscription == null) {
      this.resolvers.Subscription = {};
    }
    this.resolvers.Subscription[field] = resolver;
  }

  addMiddleware(type: string, field: string, middleware: NativeMiddleware, unshift = false) {
    if (type === '*') {
      const types = Object.keys(this.typeFields);

      for (const t of types) {
        this.addMiddleware(t, field, middleware, unshift);
      }

      return;
    }

    if (field === '*') {
      const fields = this.typeFields[type];

      for (const field of fields) {
        this.addMiddleware(type, field, middleware, unshift);
      }

      return;
    }

    const key = `${type}.${field}`;

    if (this.middlewares[key] == null) {
      this.middlewares[key] = [];
    }

    this.setDefaultFieldResolver(type, field);

    if (unshift) {
      this.middlewares[key].unshift(middleware);
    } else {
      this.middlewares[key].push(middleware);
    }
  }

  setDefaultFieldResolver(type: string, field: string) {
    if (['Query', 'Mutation', 'Subscription'].includes(type)) {
      return;
    }

    const typeResolvers = this.resolvers[type] as FieldResolvers | undefined;

    if (typeResolvers?.[field] == null) {
      this.setResolver(type, field, defaultFieldResolver);
    }
  }

  registerTypeField(type: string, field: string) {
    if (this.typeFields[type] == null) {
      this.typeFields[type] = [];
    }

    if (!this.typeFields[type].includes(field)) {
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
