import type { Emit, Listen } from '@baeta/subscriptions-stateless';
import type { PubSubMap } from './pubsub.ts';

export type Context = {
	userId?: string;
	emit: Emit<PubSubMap>;
	listen: Listen<PubSubMap>;
};
