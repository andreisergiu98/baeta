import type { TypedPubSub } from '@baeta/core';
import type { PubSub } from 'graphql-subscriptions';
import type { PubSubMap } from '../lib/pubsub.ts';

export type Context = {
	pubsub: TypedPubSub<PubSub, PubSubMap>;
};
