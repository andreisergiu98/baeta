import { createApplication } from '@baeta/core';
import {
	createCloudflareSubscription,
	SubscriptionDatabaseD1,
} from '@baeta/subscriptions-cloudflare';
import { graphqlServer } from '@hono/graphql-server';
import { Hono, type MiddlewareHandler } from 'hono';
import modules from './modules/index.ts';
import type { Context } from './types/context.ts';

export type Env = {
	WS_CONNECTIONS: DurableObjectNamespace;
	SUBSCRIPTIONS: D1Database;
};

interface ContextParams {
	userId: string;
}

const baeta = createApplication({
	modules,
});

const server = graphqlServer({
	schema: baeta.schema,
	graphiql: true,
});

const subscriptions = createCloudflareSubscription<Env, Context, ContextParams>({
	schema: baeta.schema,
	getWSConnections(env) {
		return env.WS_CONNECTIONS;
	},
	getDatabase(env) {
		return new SubscriptionDatabaseD1(env.SUBSCRIPTIONS);
	},
	context: {
		createContext,
		getContextParams,
	},
});

function createContext(
	params: ContextParams,
	env: Env,
	executionContext: ExecutionContext,
): Context {
	return {
		userId: params.userId,
		executionCtx: executionContext,
		waitUntil: executionContext.waitUntil,
		publish: subscriptions.createPublisher(env, executionContext),
		subscribe: subscriptions.createSubscriber(),
	};
}

function getContextParams(_request: Request, _env: Env): ContextParams {
	return { userId: 'id-0' };
}

const wsMiddleware: MiddlewareHandler = (ctx, next) => {
	const upgradeHeader = ctx.req.header('upgrade');
	if (upgradeHeader !== 'websocket') {
		return next();
	}
	return subscriptions.handleWS(ctx.req.raw, ctx.env, ctx.executionCtx as ExecutionContext);
};

const graphqlMiddleware: MiddlewareHandler = (ctx, next) => {
	const contextParams = getContextParams(ctx.req.raw, ctx.env);
	const context = createContext(contextParams, ctx.env, ctx.executionCtx as ExecutionContext);
	Object.assign(ctx.executionCtx, context);
	return server(ctx, next);
};

const router = new Hono<{ Bindings: Env }>();

router.get('/graphql', wsMiddleware, graphqlMiddleware);
router.post('/graphql', graphqlMiddleware);

export const BaetaWsConnections = subscriptions.createWsConnectionsClass();

export default router;
