import type { PubSub } from 'graphql-yoga';
import type { PubSubMap } from '../lib/pubsub.ts';

export type Context = {
	pubsub: PubSub<PubSubMap>;
};

// biome-ignore lint/complexity/noBannedTypes: Empty context
export type ServerContext = {};
