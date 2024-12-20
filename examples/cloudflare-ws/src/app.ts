import { createApplication } from '@baeta/core';
import {
	SubscriptionDatabaseD1,
	createCloudflareSubscription,
} from '@baeta/subscriptions-cloudflare';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';
import { modules } from './modules/autoload.ts';
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

const yoga = createYoga({
	schema: baeta.schema,
	graphiql: {
		subscriptionsProtocol: 'WS',
	},
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

function getContextParams(request: Request, env: Env): ContextParams {
	return { userId: 'id-0' };
}

function handleGraphql(request: Request, env: Env, ctx: ExecutionContext) {
	const contextParams = getContextParams(request, env);
	const context = createContext(contextParams, env, ctx);
	return yoga.handleRequest(request, context);
}

const router = new Hono<{ Bindings: Env }>();

router.get('/graphql', (ctx) => {
	const upgradeHeader = ctx.req.header('upgrade');

	if (upgradeHeader === 'websocket') {
		return subscriptions.handleWS(ctx.req.raw, ctx.env, ctx.executionCtx);
	}

	return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

router.post('/graphql', (ctx) => {
	return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx);
});

export const BaetaWsConnections = subscriptions.createWsConnectionsClass();

export default router;
