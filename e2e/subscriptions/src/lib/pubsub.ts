import { TypedPubSub } from '@baeta/subscriptions-pubsub';
import { PubSub } from 'graphql-subscriptions';
import type { Movie } from '../__generated__/types.ts';

export type PubSubMap = {
	'movie-created': Movie;
	'movie-title-changed': string;
};

export type MoviePubSub = TypedPubSub<PubSub, PubSubMap>;

export function createMoviePubSub(): MoviePubSub {
	return new TypedPubSub<PubSub, PubSubMap>(new PubSub());
}
