import type { PubSubMap, TypedPubsub } from '../lib/pubsub.ts';

export type Context = {
	userId?: string;
	pubsub: TypedPubsub<PubSubMap>;
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ServerContext = {};
