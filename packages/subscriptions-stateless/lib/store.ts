import type { SubscriptionState } from './state.ts';

export interface SubscriptionStore {
	getSubscriptions(topic: string): Promise<SubscriptionState[]>;
	createSubscription(state: SubscriptionState): Promise<void>;
	deleteSubscription(id: string): Promise<void>;
	deleteSubscriptions(connectionId: string): Promise<void>;
}

export type SubscriptionStoreProvider =
	| SubscriptionStore
	| (() => SubscriptionStore | PromiseLike<SubscriptionStore>);

export function resolveStore(
	provider: SubscriptionStoreProvider,
): SubscriptionStore | PromiseLike<SubscriptionStore> {
	if (typeof provider === 'function') {
		return provider();
	}
	return provider;
}
