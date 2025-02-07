import type { Publish, Subscribe } from '@baeta/subscriptions-cloudflare';
import type { PubSubMap } from './pubsub.ts';

export type Context = {
	userId?: string;
	executionCtx: ExecutionContext;
	waitUntil: (promise: Promise<unknown>) => void;
	publish: Publish<PubSubMap>;
	subscribe: Subscribe<PubSubMap>;
};
