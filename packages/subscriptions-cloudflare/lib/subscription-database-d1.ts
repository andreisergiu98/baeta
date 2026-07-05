import type { SubscriptionState } from '@baeta/subscriptions-stateless';
import { getConnectionPoolId } from './connection-id.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';

interface D1SubscriptionRow {
	id: string;
	topic: string;
	connectionId: string;
	connectionPoolId: string;
	data: string;
}

interface D1SubscriptionRowData {
	query: string;
	variables: string | undefined;
	operationName: string | undefined;
	contextParams: string | undefined;
}

export class SubscriptionDatabaseD1 implements SubscriptionDatabase {
	private readonly db: D1Database;
	constructor(db: D1Database) {
		this.db = db;
	}

	protected table = 'Subscriptions';

	async getSubscriptions(topic: string): Promise<SubscriptionState[]> {
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
				query: data.query,
				variables: data.variables,
				operationName: data.operationName,
				contextParams: data.contextParams,
			};
		});
	}

	async createSubscription(state: SubscriptionState): Promise<void> {
		await this.db
			.prepare(
				`INSERT INTO ${this.table} (id, connectionId, connectionPoolId, topic, data) VALUES (?, ?, ?, ?, ?)`,
			)
			.bind(
				state.id,
				state.connectionId,
				getConnectionPoolId(state.connectionId),
				state.topic,
				serializeData(state),
			)
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

export function serializeData(state: SubscriptionState) {
	const data: D1SubscriptionRowData = {
		query: state.query,
		variables: state.variables,
		operationName: state.operationName,
		contextParams: state.contextParams,
	};
	return JSON.stringify(data);
}

export function parseData(data: string): D1SubscriptionRowData {
	return JSON.parse(data);
}
