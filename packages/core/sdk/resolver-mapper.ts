import { defaultFieldResolver, GraphQLFieldResolver } from 'graphql';
import { ScalarResolver } from '../lib';
import { composeResolvers, ResolversComposerMapping } from './compose';
import { NativeMiddleware } from './middleware';
import { NativeSubscribe } from './subscription';

export type FieldResolvers = Record<string, GraphQLFieldResolver<unknown, unknown>>;

export type SubscriptionsResolvers = {
  Subscription?: Record<string, NativeSubscribe | undefined> | undefined;
};

export type ResolversMap = Record<string, FieldResolvers | ScalarResolver | undefined> &
  SubscriptionsResolvers;

export class ResolverMapper {
  readonly resolvers: ResolversMap = {};
  readonly middlewares: ResolversComposerMapping = {};
  readonly typeFields: Record<string, string[]> = {};

  setResolver(type: string, field: string, resolver: GraphQLFieldResolver<unknown, unknown>) {
    if (this.resolvers[type] == null) {
      this.resolvers[type] = {};
    }
    (this.resolvers[type] as FieldResolvers)[field] = resolver;
  }

  setScalar(scalar: string, resolver: ScalarResolver) {
    this.resolvers[scalar] = resolver;
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
    if (typeResolvers?.[field] != null) {
      return;
    }

    this.setResolver(type, field, defaultFieldResolver);
  }

  registerTypeField(type: string, field: string) {
    if (this.typeFields[type] == null) {
      this.typeFields[type] = [];
    }

    if (this.typeFields[type].includes(field)) {
      return;
    }

    this.typeFields[type].push(field);
  }

  compose() {
    return composeResolvers(this.resolvers, this.middlewares);
  }
}
