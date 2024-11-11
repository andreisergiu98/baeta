import type { PubSubMap, TypedPubsub } from '../lib/pubsub.ts';

export type Context = {
	pubsub: TypedPubsub<PubSubMap>;
};

// biome-ignore lint/complexity/noBannedTypes: Empty context
export type ServerContext = {};
