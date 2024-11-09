import type { PubSubMap, TypedPubsub } from '../lib/pubsub.ts';

export type UserContext = {
	appVersion: string;
	pubsub: TypedPubsub<PubSubMap>;
};

// biome-ignore lint/complexity/noBannedTypes: Empty context
export type ServerContext = {};
