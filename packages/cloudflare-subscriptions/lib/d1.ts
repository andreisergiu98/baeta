import { SubscriptionInfo } from './graphql';
import { SubscriptionDatabase } from './subscription-database';

interface D1SubscriptionRow {
  id: string;
  topic: string;
  connectionId: string;
  connectionPoolId: string;
  data: string;
}

interface D1SubscriptionRowData {
  subscription: SubscriptionInfo['subscription'];
}

export class D1Subscription implements SubscriptionDatabase {
  constructor(private db: D1Database) {}

  async getSubscriptions(topic: string): Promise<SubscriptionInfo[]> {
    const res = await this.db
      .prepare('SELECT * FROM subscriptions WHERE topic = ?')
      .bind([topic])
      .all<D1SubscriptionRow>();

    const results = res.results ?? [];

    return results.map((row) => {
      const data = parseData(row.data);

      return {
        id: row.id,
        topic: row.topic,
        connectionId: row.connectionId,
        connectionPoolId: row.connectionPoolId,
        subscription: data.subscription,
      };
    });
  }

  async createSubscription(info: SubscriptionInfo): Promise<void> {
    await this.db
      .prepare(
        'INSERT INTO subscriptions (id, connectionId, connectionPoolId, topic, data) VALUES (?, ?, ?, ?, ?)'
      )
      .bind([info.id, info.connectionId, info.connectionPoolId, info.topic, serializeData(info)])
      .run();
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.db.prepare('DELETE FROM subscriptions WHERE id = ?').bind([id]).run();
  }

  async deleteSubscriptions(connectionId: string): Promise<void> {
    await this.db
      .prepare('DELETE FROM subscriptions WHERE connectionId = ?')
      .bind([connectionId])
      .run();
  }
}

export function serializeData(info: SubscriptionInfo) {
  const data: D1SubscriptionRowData = {
    subscription: info.subscription,
  };
  return JSON.stringify(data);
}

export function parseData(data: string) {
  const parsed = JSON.parse(data) as D1SubscriptionRowData;
  return parsed;
}
