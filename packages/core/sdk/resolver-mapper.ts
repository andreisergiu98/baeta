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
  resolvers: ResolversMap = {};
  middlewares: ResolversComposerMapping = {};

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

  addMiddleware(type: string, field: string, middleware: NativeMiddleware) {
    const key = `${type}.${field}`;
    if (this.middlewares[key] == null) {
      this.middlewares[key] = [];
    }
    this.middlewares[key].push(middleware);
  }

  setDefaultFieldResolver(type: string, field: string) {
    const typeResolvers = this.resolvers[type] as FieldResolvers | undefined;
    if (typeResolvers?.[field] != null) {
      return;
    }
    this.setResolver(type, field, defaultFieldResolver);
  }

  compose() {
    return composeResolvers(this.resolvers, this.middlewares);
  }
}
