import { PubSubEngine } from 'graphql-subscriptions';

export type Context = {
  userId?: string;
  executionCtx: ExecutionContext;
  pubsub: PubSubEngine;
};
