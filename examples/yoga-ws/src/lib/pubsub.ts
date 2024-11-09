import { PubSub } from 'graphql-subscriptions';
import type { User } from '../__generated__/types.ts';

export type PubSubMap = {
	'user-updated': User;
};

/**
 *  This is for a simple, single-instance example. For a real-world application use a more robust solution, like Redis pubsub.
 */

// This is a simple wrapper around PubSub that enforces a map of channels to types and supports channel prefixes.
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class TypedPubsub<Map extends Record<string, any>> {
	constructor(
		protected pubsub: PubSub,
		protected prefix = '',
	) {}

	publish<C extends keyof Map>(channel: C, message: Map[C]) {
		const mappedChannel = this.mapChannel(channel);
		return this.pubsub.publish(mappedChannel, message);
	}

	subscribe<C extends keyof Map>(channel: C, onMessage: (message: Map[C]) => Promise<void> | void) {
		const mappedChannel = this.mapChannel(channel);
		return this.pubsub.subscribe(mappedChannel, onMessage);
	}

	unsubscribe(subId: number) {
		return this.pubsub.unsubscribe(subId);
	}

	asyncIterator<C extends keyof Map>(triggers: C | C[]) {
		const mappedTriggers = this.mapTriggers(triggers);
		return this.pubsub.asyncIterator<Map[C]>(mappedTriggers);
	}

	private mapChannel = <C extends keyof Map>(channel: C): string => {
		return `${this.prefix}${channel.toString()}`;
	};

	private mapTriggers = <C extends keyof Map>(triggers: C | C[]): string | string[] => {
		if (Array.isArray(triggers)) {
			return triggers.map(this.mapChannel);
		}
		return this.mapChannel(triggers);
	};
}

export const pubsub = new TypedPubsub<PubSubMap>(new PubSub());
