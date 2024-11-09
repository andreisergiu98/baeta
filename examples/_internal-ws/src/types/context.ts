import type { PubSubMap, TypedPubsub } from '../lib/pubsub.ts';

export type Context = {
	appVersion: string;
	pubsub: TypedPubsub<PubSubMap>;
};

// biome-ignore lint/complexity/noBannedTypes: Empty context
export type ServerContext = {};
