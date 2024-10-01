import { Publish, Subscribe } from '@baeta/cloudflare-subscriptions';
import { PubSubMap } from './pubsub';

export type Context = {
	userId?: string;
	executionCtx: ExecutionContext;
	publish: Publish<PubSubMap>;
	subscribe: Subscribe<PubSubMap>;
};
