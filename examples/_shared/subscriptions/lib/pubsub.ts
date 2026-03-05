import { createPubSub } from 'graphql-yoga';
import type { User } from '../__generated__/types.ts';

export type PubSubMap = {
	'user-updated': [User];
};

export const pubsub = createPubSub<PubSubMap>();
