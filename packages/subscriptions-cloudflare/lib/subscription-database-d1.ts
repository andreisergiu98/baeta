import type { SubscriptionInfo } from './subscribe.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';

interface D1SubscriptionRow {
	id: string;
	topic: string;
	connectionId: string;
	connectionPoolId: string;
	data: string;
}

interface D1SubscriptionRowData {
	subscription: SubscriptionInfo['subscription'];
	contextParams: unknown;
}

export class SubscriptionDatabaseD1 implements SubscriptionDatabase {
	constructor(private db: D1Database) {}

	protected table = 'Subscriptions';

	async getSubscriptions(topic: string): Promise<SubscriptionInfo[]> {
		const res = await this.db
			.prepare(`SELECT * FROM ${this.table} WHERE topic = ?`)
			.bind(topic)
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
				contextParams: data.contextParams,
			};
		});
	}

	async createSubscription(info: SubscriptionInfo): Promise<void> {
		await this.db
			.prepare(
				`INSERT INTO ${this.table} (id, connectionId, connectionPoolId, topic, data) VALUES (?, ?, ?, ?, ?)`,
			)
			.bind(info.id, info.connectionId, info.connectionPoolId, info.topic, serializeData(info))
			.run();
	}

	async deleteSubscription(id: string): Promise<void> {
		await this.db.prepare(`DELETE FROM ${this.table} WHERE id = ?`).bind(id).run();
	}

	async deleteSubscriptions(connectionId: string): Promise<void> {
		await this.db
			.prepare(`DELETE FROM ${this.table} WHERE connectionId = ?`)
			.bind(connectionId)
			.run();
	}
}

export function serializeData(info: SubscriptionInfo) {
	const data: D1SubscriptionRowData = {
		subscription: info.subscription,
		contextParams: info.contextParams,
	};
	return JSON.stringify(data);
}

export function parseData(data: string): D1SubscriptionRowData {
	return JSON.parse(data);
}
