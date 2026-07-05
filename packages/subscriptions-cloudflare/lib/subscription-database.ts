import type { SubscriptionState, SubscriptionStore } from '@baeta/subscriptions-stateless';

export abstract class SubscriptionDatabase implements SubscriptionStore {
	abstract getSubscriptions(topic: string): Promise<SubscriptionState[]>;

	abstract createSubscription(state: SubscriptionState): Promise<void>;

	abstract deleteSubscription(id: string): Promise<void>;

	abstract deleteSubscriptions(connectionId: string): Promise<void>;
}
