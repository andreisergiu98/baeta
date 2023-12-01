import test from 'ava';
import { defaultFieldResolver, GraphQLResolveInfo } from 'graphql';
import {
  forgeNativeMiddleware,
  forgeNativeResolver,
  getResolverFromMap,
  getSubscriptionFromMap,
  mockedScalar,
} from './__test__/utils';
import { NativeResolver } from './resolver';
import { ResolverMapper } from './resolver-mapper';
import { NativeSubscribe } from './subscription';

test('setResolver adds a resolver to the map', (t) => {
  const mapper = new ResolverMapper();
  const resolver = forgeNativeResolver('hello world');
  mapper.setResolver('Query', 'hello', resolver);
  t.is(getResolverFromMap(mapper.resolvers, 'Query', 'hello'), resolver);
});

test('setDefaultFieldResolver sets default resolver for a type field when not defined', (t) => {
  const mapper = new ResolverMapper();
  mapper.setDefaultFieldResolver('User', 'name');
  const resolver = getResolverFromMap(mapper.resolvers, 'User', 'name');
  t.is(resolver, defaultFieldResolver);
});

test("setDefaultFieldResolver doesn't set a default resolver for a type field when defined", (t) => {
  const mapper = new ResolverMapper();
  const resolver = forgeNativeResolver('hello world');
  mapper.setResolver('User', 'name', resolver);
  mapper.setDefaultFieldResolver('User', 'name');
  t.is(getResolverFromMap(mapper.resolvers, 'User', 'name'), resolver);
});

test('setSubscription adds a subscription resolver to the map', (t) => {
  const mapper = new ResolverMapper();

  const getIterator = async function* () {
    yield 'world 1';
    yield 'world 2';
    yield 'world 3';
  };

  const subscribe: NativeSubscribe['subscribe'] = () => {
    return getIterator();
  };

  const resolve = forgeNativeResolver('hello');

  mapper.setSubscription('update', { subscribe, resolve });

  const subscription = getSubscriptionFromMap(mapper.resolvers, 'update');

  t.is(subscription.subscribe, subscribe);
  t.is(subscription.resolve, resolve);
});

test('addMiddleware registers middleware for a type and field', (t) => {
  const mapper = new ResolverMapper();

  const middleware1 = forgeNativeMiddleware();
  const middleware2 = forgeNativeMiddleware();

  mapper.addMiddleware('Query', 'hello', middleware1);
  mapper.addMiddleware('Query', 'hello', middleware2, true);

  t.is(mapper.middlewares['Query.hello']?.[0], middleware2);
  t.is(mapper.middlewares['Query.hello']?.[1], middleware1);
});

test('composes middlewares with resolvers', (t) => {
  const mapper = new ResolverMapper();

  const middleware = (next: NativeResolver) => {
    return (parent: unknown, args: unknown, context: unknown, info: GraphQLResolveInfo) => {
      return `${next(parent, args, context, info)} world`;
    };
  };

  mapper.setResolver('Query', 'hello', forgeNativeResolver('hello'));
  mapper.addMiddleware('Query', 'hello', middleware);

  const composed = mapper.compose();

  const resolver = getResolverFromMap(composed, 'Query', 'hello');

  t.is(resolver({}, {}, {}, {} as GraphQLResolveInfo), 'hello world');
});

test('addMiddleware registers middleware for all fields of a type', (t) => {
  const mapper = new ResolverMapper();
  mapper.typeFields['Query'] = ['hello', 'world'];

  const middleware = forgeNativeMiddleware();
  mapper.addMiddleware('Query', '*', middleware);

  t.is(mapper.middlewares['Query.hello']?.[0], middleware);
  t.is(mapper.middlewares['Query.world']?.[0], middleware);
});

test('addMiddleware registers middleware for all types', (t) => {
  const mapper = new ResolverMapper();
  mapper.registerTypeField('Query', 'hello');
  mapper.registerTypeField('Mutation', 'hello');

  const middleware = forgeNativeMiddleware();
  mapper.addMiddleware('*', '*', middleware);

  t.is(mapper.middlewares['Query.hello']?.[0], middleware);
  t.is(mapper.middlewares['Mutation.hello']?.[0], middleware);
});

test('addMiddleware registers default resolvers when there are none', (t) => {
  const mapper = new ResolverMapper();
  mapper.registerTypeField('User', 'name');

  const middleware = forgeNativeMiddleware();
  mapper.addMiddleware('User', 'name', middleware);
  const nameResolver = getResolverFromMap(mapper.resolvers, 'User', 'name');

  t.is(nameResolver, defaultFieldResolver);
});

test('setScalar adds a scalar to the map', (t) => {
  const mapper = new ResolverMapper();
  mapper.setScalar('MockedScalar', mockedScalar);
  t.is(mapper.scalars['MockedScalar'], mockedScalar);
});
