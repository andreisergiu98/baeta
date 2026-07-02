import type { MoviePubSub } from '../lib/pubsub.ts';

export type Context = {
	pubsub: MoviePubSub;
	canSubscribe?: boolean;
};
