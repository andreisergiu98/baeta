import type { PubSub } from 'graphql-yoga';
import type { PubSubMap } from '../lib/pubsub.ts';

export type Context = {
	userId?: string;
	pubsub: PubSub<PubSubMap>;
};

export type ServerContext = {};
