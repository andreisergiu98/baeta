import { createApplication } from '@baeta/core';
import {
	createCloudflareSubscription,
	SubscriptionDatabaseD1,
} from '@baeta/subscriptions-cloudflare';
import { env } from 'cloudflare:workers';
import { graphql } from 'graphql';
import { Hono, type Handler, type MiddlewareHandler } from 'hono';
import { graphiqlHtml } from './graphiql.ts';
import { dedupeAppPlugin, filterAppPlugin } from './lib/subscriptions.ts';
import modules from './modules/index.ts';
import type { Context } from './types/context.ts';

export type Env = {
	WS_CONNECTIONS: DurableObjectNamespace;
	SUBSCRIPTIONS: D1Database;
};

const workerEnv = env as Env;

interface ContextParams {
	userId: string;
}

const baeta = createApplication({
	modules,
	plugins: [filterAppPlugin, dedupeAppPlugin],
});

const subscriptions = createCloudflareSubscription<Context, ContextParams>({
	schema: baeta.schema,
	getWSConnections: () => workerEnv.WS_CONNECTIONS,
	getDatabase: () => new SubscriptionDatabaseD1(workerEnv.SUBSCRIPTIONS),
	context: {
		createContext,
		getContextParams,
	},
});

function createContext(params: ContextParams): Context {
	return {
		userId: params.userId,
		emit: subscriptions.createEmitter(),
		listen: subscriptions.createListener(),
	};
}

function createHttpContext(params: ContextParams, executionCtx: ExecutionContext): Context {
	return {
		userId: params.userId,
		emit: subscriptions.createEmitter(executionCtx),
		listen: subscriptions.createListener(),
	};
}

function getContextParams(_request: Request): ContextParams {
	return { userId: 'id-0' };
}

const wsMiddleware: MiddlewareHandler = (ctx, next) => {
	const upgradeHeader = ctx.req.header('upgrade');
	if (upgradeHeader !== 'websocket') {
		return next();
	}
	return subscriptions.handleWS(ctx.req.raw);
};

const graphqlHandler: Handler<{ Bindings: Env }> = async (ctx) => {
	const contextParams = getContextParams(ctx.req.raw);
	const context = createHttpContext(contextParams, ctx.executionCtx as ExecutionContext);

	const body = await ctx.req.json<{
		query: string;
		variables?: Record<string, unknown> | null;
		operationName?: string | null;
	}>();

	const result = await graphql({
		schema: baeta.schema,
		source: body.query,
		variableValues: body.variables,
		operationName: body.operationName,
		contextValue: context,
	});

	return ctx.json({ ...result, errors: result.errors?.map((error) => error.toJSON()) });
};

const router = new Hono<{ Bindings: Env }>();

router.get('/graphql', wsMiddleware, (ctx) => {
	return ctx.html(graphiqlHtml);
});
router.post('/graphql', graphqlHandler);

export const BaetaWsConnections = subscriptions.createWsConnectionsClass();

export default router;
