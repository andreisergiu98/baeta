import type { SubscriptionInfo } from './subscribe.ts';

export abstract class SubscriptionDatabase {
	abstract getSubscriptions(topic: string): Promise<SubscriptionInfo[]>;

	abstract createSubscription(info: SubscriptionInfo): Promise<void>;

	abstract deleteSubscription(id: string): Promise<void>;

	abstract deleteSubscriptions(connectionId: string): Promise<void>;
}
