import { TypedPubSub } from '@baeta/subscriptions-pubsub';
import { PubSub } from 'graphql-subscriptions';
// import type { User } from '../__generated__/types.ts';

export type PubSubMap = {
	'user-updated': { id: string };
};

/**
 *  This is for a simple, single instance example. For a real-world application use a more robust solution, like graphql-redis-subscriptions.
 *  TypedPubSub is a wrapper around PubSub that enforces a strict event map.
 */
export const pubsub = new TypedPubSub<PubSub, PubSubMap>(new PubSub());
