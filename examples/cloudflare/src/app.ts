import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';
import { modules } from './modules/autoload.ts';
import type { Context } from './types/context.ts';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Env = {};

const baeta = createApplication({
	modules,
});

const yoga = createYoga({
	schema: baeta.schema,
});

function handleGraphql(request: Request, env: Env, ctx: ExecutionContext) {
	const context: Context = {
		userId: 'id-0',
		executionCtx: ctx,
		waitUntil: ctx.waitUntil,
	};
	return yoga.fetch(request, context);
}

const router = new Hono<{ Bindings: Env }>();

router.get('/graphql', (ctx) => {
	ctx.executionCtx;
	return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx as ExecutionContext);
});

router.post('/graphql', (ctx) => {
	return handleGraphql(ctx.req.raw, ctx.env, ctx.executionCtx as ExecutionContext);
});

export default router;
