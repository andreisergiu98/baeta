import { createApplication } from '@baeta/core';
import { Hono } from 'hono';
import { createGraphqlHandler } from './lib/apollo';
import { userModule } from './modules/user';
import { Context } from './types/context';

import { createCloudflareSubscription, D1Subscription } from '@baeta/cloudflare-subscriptions';

interface Env {
  WS_CONNECTIONS: DurableObjectNamespace;
  D1_SUBSCRIPTIONS: D1Database;
}

const baeta = createApplication({
  modules: [userModule],
});

const handleGraphql = createGraphqlHandler<Env, Context>(baeta.schema, {
  context: async (request, env, ctx) => {
    return {
      executionCtx: ctx,
    };
  },
});

const subscriptions = createCloudflareSubscription<Env, Context>({
  schema: baeta.schema,
  createContext(request, env, ctx) {
    return {
      executionCtx: ctx,
    };
  },
  getWSConnections(env) {
    return env.WS_CONNECTIONS;
  },
  getDatabase(env) {
    return new D1Subscription(env.D1_SUBSCRIPTIONS);
  },
});

// @ts-expect-error todo
const router = new Hono<{ Bindings: Env }>();

router.get('/', (ctx) => {
  return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

router.get('/graphql', (ctx) => {
  const upgradeHeader = ctx.req.headers.get('upgrade');
  if (upgradeHeader === 'websocket') {
    return subscriptions.handleWS(ctx.req.raw, ctx.env, ctx.executionCtx);
  }
  return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

router.post('/graphql', (ctx) => {
  return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

export default router;
