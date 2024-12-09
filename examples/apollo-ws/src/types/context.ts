import type { TypedPubSub } from '@baeta/subscriptions-pubsub';
import type { PubSub } from 'graphql-subscriptions';
import type { PubSubMap } from '../lib/pubsub.ts';

export type Context = {
	pubsub: TypedPubSub<PubSub, PubSubMap>;
};
