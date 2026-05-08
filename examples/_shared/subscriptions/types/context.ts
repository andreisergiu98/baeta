import type { PubSub } from 'graphql-yoga';
import type { PubSubMap } from '../lib/pubsub.ts';

export type Context = {
	pubsub: PubSub<PubSubMap>;
};

export type ServerContext = {};
