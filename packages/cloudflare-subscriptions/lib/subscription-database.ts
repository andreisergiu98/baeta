import { SubscriptionInfo } from './subscribe';

export abstract class SubscriptionDatabase {
  async getSubscriptions(topic: string): Promise<SubscriptionInfo[]> {
    return [];
  }

  async createSubscription(info: SubscriptionInfo): Promise<void> {}

  async deleteSubscription(id: string): Promise<void> {}

  async deleteSubscriptions(connectionId: string): Promise<void> {}
}
