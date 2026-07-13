import { createApplication } from '@baeta/core';
import { createStatelessSubscriptions } from '@baeta/subscriptions-stateless';
import { bodyParser } from '@koa/bodyparser';
import Router from '@koa/router';
import { graphql } from 'graphql';
import Koa from 'koa';
import {
	createCentrifugoTransport,
	handleConnect,
	handleRpc,
	handleSubscribe,
	InMemoryStore,
} from './lib/centrifugo.ts';
import { config } from './lib/env.ts';
import { dedupeAppPlugin, filterAppPlugin } from './lib/plugins.ts';
import { GraphQLOperationSchema } from './lib/schemas.ts';
import modules from './modules/index.ts';
import type { Context, ContextParams } from './types/context.ts';
import type { PubSubMap } from './types/pubsub.ts';

const baeta = createApplication({
	modules,
	plugins: [filterAppPlugin, dedupeAppPlugin],
});

const store = new InMemoryStore(config.subscriptionTtlMs);

const subscriptions = createStatelessSubscriptions<Context, ContextParams, PubSubMap>({
	schema: baeta.schema,
	store,
	transport: createCentrifugoTransport({
		apiUrl: config.centrifugoApiUrl,
		apiKey: config.centrifugoApiKey,
	}),
	createContext,
});

// Reclaim leases that clients stopped refreshing. Local only — no Centrifugo calls.
const sweeper = setInterval(() => store.sweep(), config.sweepIntervalMs);
sweeper.unref();

function createContext(params: ContextParams): Context {
	return {
		userId: params.userId,
		emit: subscriptions.createEmitter(),
		listen: subscriptions.createListener(),
	};
}

function getContextParams(): ContextParams {
	return { userId: 'id-0' };
}

const app = new Koa();
const router = new Router();

router.post('/graphql', async (ctx) => {
	const body = GraphQLOperationSchema.parse(ctx.request.body);
	const result = await graphql({
		schema: baeta.schema,
		source: body.query,
		variableValues: body.variables,
		operationName: body.operationName,
		contextValue: createContext(getContextParams()),
	});
	ctx.body = { ...result, errors: result.errors?.map((error) => error.toJSON()) };
});

router.post('/centrifugo/connect', (ctx) => handleConnect(ctx, getContextParams));
router.post('/centrifugo/subscribe', (ctx) => handleSubscribe(ctx, subscriptions));
router.post('/centrifugo/rpc', (ctx) => handleRpc(ctx, store));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => {
	console.log(`🚀 GraphQL + Centrifugo proxy server ready on http://localhost:${config.port}`);
	console.log('   Run `yarn client` to open a subscription and trigger a mutation');
});
