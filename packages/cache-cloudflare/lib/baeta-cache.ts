import { DurableObject } from 'cloudflare:workers';
import { actions } from './actions.ts';
import { createActionsRequestHandler } from './actions-handler.ts';

const CLEANUP_INTERVAL_MS = 10_000;
const BATCH_PARAMS = 99; // max 100 bound params per query, keep 1 spare

function batchByParams<T>(items: T[], paramsPerItem: number): T[][] {
	const batchSize = Math.floor(BATCH_PARAMS / paramsPerItem);
	const batches: T[][] = [];
	for (let i = 0; i < items.length; i += batchSize) {
		batches.push(items.slice(i, i + batchSize));
	}
	return batches;
}

export class BaetaCache extends DurableObject {
	sql: SqlStorage;
	handler: (request: Request) => Promise<Response>;

	constructor(ctx: DurableObjectState, env: { [key: string]: unknown }) {
		super(ctx, env);
		this.sql = ctx.storage.sql;
		this.migrate();
		this.handler = createActionsRequestHandler(actions, {
			getPartialItems: (args) => this.getPartialItems(args.keys),
			saveItems: (args) => this.saveItems(args.items, args.expiresAt),
			saveItemsWithDiff: (args) => this.saveItemsWithDiff(args.items, args.expiresAt),
			deleteItems: (args) => this.deleteItems(args.keys),
			deleteItemsWithDiff: (args) => this.deleteItemsWithDiff(args.keys),
			getQuery: (args) => this.getQuery(args.key),
			saveQuery: (args) => this.saveQuery(args.key, args.indexes, args.metadata, args.expiresAt),
			deleteQueries: (args) => this.deleteQueries(args.indexes),
		});
	}

	private migrate() {
		this.sql.exec(`
			CREATE TABLE IF NOT EXISTS items (
				key TEXT PRIMARY KEY,
				value TEXT NOT NULL,
				expires_at INTEGER NOT NULL
			) WITHOUT ROWID;
			CREATE INDEX IF NOT EXISTS idx_items_expires ON items(expires_at);

			CREATE TABLE IF NOT EXISTS queries (
				key TEXT PRIMARY KEY,
				metadata TEXT NOT NULL,
				expires_at INTEGER NOT NULL
			) WITHOUT ROWID;
			CREATE INDEX IF NOT EXISTS idx_queries_expires ON queries(expires_at);

			CREATE TABLE IF NOT EXISTS query_indexes (
				index_key TEXT NOT NULL,
				query_key TEXT NOT NULL,
				expires_at INTEGER NOT NULL,
				PRIMARY KEY (index_key, query_key)
			) WITHOUT ROWID;
			CREATE INDEX IF NOT EXISTS idx_qi_expires ON query_indexes(expires_at);
		`);
	}

	async fetch(request: Request) {
		return await this.handler(request);
	}

	getPartialItems(keys: string[]) {
		const results: (string | null)[] = [];
		for (const batch of batchByParams(keys, 1)) {
			const placeholders = batch.map(() => '?').join(',');
			const rows = this.sql.exec<{ key: string; value: string }>(
				`SELECT key, value FROM items WHERE key IN (${placeholders}) AND expires_at > ?`,
				...batch,
				Date.now(),
			);
			const map = new Map<string, string>();
			for (const row of rows) {
				map.set(row.key, row.value);
			}
			for (const key of batch) {
				results.push(map.get(key) ?? null);
			}
		}
		return results;
	}

	async saveItems(items: Array<[string, string]>, expiresAt: number) {
		for (const batch of batchByParams(items, 3)) {
			const placeholders = batch.map(() => '(?, ?, ?)').join(',');
			this.sql.exec(
				`INSERT OR REPLACE INTO items (key, value, expires_at) VALUES ${placeholders}`,
				...batch.flatMap(([key, value]) => [key, value, expiresAt]),
			);
		}
		await this.ensureAlarm();
	}

	async saveItemsWithDiff(items: Array<[string, string]>, expiresAt: number) {
		const keys = items.map(([key]) => key);
		const currentValues = this.getPartialItems(keys);
		for (const batch of batchByParams(items, 3)) {
			const placeholders = batch.map(() => '(?, ?, ?)').join(',');
			this.sql.exec(
				`INSERT OR REPLACE INTO items (key, value, expires_at) VALUES ${placeholders}`,
				...batch.flatMap(([key, value]) => [key, value, expiresAt]),
			);
		}
		await this.ensureAlarm();
		return currentValues;
	}

	deleteItems(keys: string[]) {
		for (const batch of batchByParams(keys, 1)) {
			const placeholders = batch.map(() => '?').join(',');
			this.sql.exec(`DELETE FROM items WHERE key IN (${placeholders})`, ...batch);
		}
	}

	deleteItemsWithDiff(keys: string[]) {
		const currentValues = this.getPartialItems(keys);
		this.deleteItems(keys);
		return currentValues;
	}

	getQuery(key: string) {
		const row = this.sql
			.exec<{ metadata: string }>(
				'SELECT metadata FROM queries WHERE key = ? AND expires_at > ?',
				key,
				Date.now(),
			)
			.toArray()
			.at(0);
		return row?.metadata ? row.metadata : null;
	}

	async saveQuery(queryKey: string, indexKeys: string[], metadata: string, expiresAt: number) {
		this.sql.exec(
			'INSERT OR REPLACE INTO queries (key, metadata, expires_at) VALUES (?, ?, ?)',
			queryKey,
			metadata,
			expiresAt,
		);
		for (const batch of batchByParams(indexKeys, 3)) {
			const placeholders = batch.map(() => '(?, ?, ?)').join(',');
			this.sql.exec(
				`INSERT OR REPLACE INTO query_indexes (index_key, query_key, expires_at) VALUES ${placeholders}`,
				...batch.flatMap((indexKey) => [indexKey, queryKey, expiresAt]),
			);
		}
		await this.ensureAlarm();
	}

	deleteQueries(indexKeys: string[]) {
		for (const batch of batchByParams(indexKeys, 1)) {
			const placeholders = batch.map(() => '?').join(',');
			this.sql.exec(
				`DELETE FROM queries WHERE key IN (
					SELECT query_key FROM query_indexes WHERE index_key IN (${placeholders})
				)`,
				...batch,
			);
			this.sql.exec(`DELETE FROM query_indexes WHERE index_key IN (${placeholders})`, ...batch);
		}
	}

	async alarm() {
		const now = Date.now();

		this.sql.exec('DELETE FROM items WHERE expires_at <= ?', now);
		this.sql.exec('DELETE FROM queries WHERE expires_at <= ?', now);
		this.sql.exec('DELETE FROM query_indexes WHERE expires_at <= ?', now);

		// re-schedule only if there's still data
		const { remaining } = this.sql
			.exec<{ remaining: number }>(
				`SELECT
					(SELECT COUNT(*) FROM items) +
					(SELECT COUNT(*) FROM queries) +
					(SELECT COUNT(*) FROM query_indexes) as remaining`,
			)
			.one();

		if (remaining > 0) {
			await this.ctx.storage.setAlarm(Date.now() + CLEANUP_INTERVAL_MS);
		}
	}

	private async ensureAlarm() {
		if (!(await this.ctx.storage.getAlarm())) {
			await this.ctx.storage.setAlarm(Date.now() + CLEANUP_INTERVAL_MS);
		}
	}
}
