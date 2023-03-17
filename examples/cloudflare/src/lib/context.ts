import { Context as HonoContext } from 'hono';
import { Context } from '../types/context';
import { createPubSubWrapper } from './pubsub';

export function createContext(ctx: HonoContext): Context {
  return {
    pubsub: createPubSubWrapper(ctx.executionCtx),
    executionCtx: ctx.executionCtx,
  };
}
