import type { SubscriptionState } from './state.ts';
import type { SubscriptionStore } from './store.ts';

export class InMemorySubscriptionStore implements SubscriptionStore {
	protected subscriptions = new Map<string, SubscriptionState>();

	getSubscriptions(topic: string): Promise<SubscriptionState[]> {
		const matches: SubscriptionState[] = [];
		for (const info of this.subscriptions.values()) {
			if (info.topic === topic) {
				matches.push(info);
			}
		}
		return Promise.resolve(matches);
	}

	createSubscription(state: SubscriptionState): Promise<void> {
		this.subscriptions.set(state.id, state);
		return Promise.resolve();
	}

	deleteSubscription(id: string): Promise<void> {
		this.subscriptions.delete(id);
		return Promise.resolve();
	}

	deleteSubscriptions(connectionId: string): Promise<void> {
		for (const [id, info] of this.subscriptions) {
			if (info.connectionId === connectionId) {
				this.subscriptions.delete(id);
			}
		}
		return Promise.resolve();
	}
}
