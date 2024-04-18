import { createApplication } from '@baeta/core';
import { Hono } from 'hono';
import { createGraphqlHandler } from './lib/apollo';
import { userModule } from './modules/user';
import { Context } from './types/context';

import { createCloudflareSubscription, D1Subscription } from '@baeta/cloudflare-subscriptions';

export type Env = {
  WS_CONNECTIONS: DurableObjectNamespace;
  SUBSCRIPTIONS: D1Database;
};

interface ContextParams {
  userId: string;
}

const baeta = createApplication({
  modules: [userModule],
});

const createContext = (
  params: ContextParams,
  env: Env,
  executionContext: ExecutionContext,
): Context => {
  return {
    userId: params.userId,
    executionCtx: executionContext,
    publish: subscriptions.createPublisher(env, executionContext),
    subscribe: subscriptions.createSubscriber(),
  };
};

const getContextParams = (request: Request, env: Env): ContextParams => {
  return { userId: '123' };
};

const subscriptions = createCloudflareSubscription<Env, Context, ContextParams>({
  schema: baeta.schema,
  getWSConnections(env) {
    return env.WS_CONNECTIONS;
  },
  getDatabase(env) {
    return new D1Subscription(env.SUBSCRIPTIONS);
  },
  context: {
    createContext,
    getContextParams,
  },
});

const handleGraphql = createGraphqlHandler<Env, Context>(baeta.schema, {
  context: async (request, env, ctx) => {
    const contextParams = getContextParams(request, env);
    return createContext(contextParams, env, ctx);
  },
});

const router = new Hono<{ Bindings: Env }>();

router.get('/graphql', (ctx) => {
  const upgradeHeader = ctx.req.header('upgrade');
  console.log('upgradeHeader', upgradeHeader);
  if (upgradeHeader === 'websocket') {
    return subscriptions.handleWS(ctx.req.raw, ctx.env, ctx.executionCtx);
  }
  return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

router.post('/graphql', (ctx) => {
  return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

export default router;

export const WsConnections = subscriptions.createWsConnectionsClass();
