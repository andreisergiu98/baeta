import { DurableObject } from 'cloudflare:workers';
import { actions } from './actions.ts';
import { createActionsRequestHandler } from './actions-handler.ts';

const JSON_BATCH_SIZE = 5_000;

function batch<T>(items: T[]): T[][] {
	const batches: T[][] = [];
	for (let i = 0; i < items.length; i += JSON_BATCH_SIZE) {
		batches.push(items.slice(i, i + JSON_BATCH_SIZE));
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
			saveItems: (args) => this.saveItems(args.items, Date.now() + args.ttlMs),
			saveItemsWithDiff: (args) => this.saveItemsWithDiff(args.items, Date.now() + args.ttlMs),
			deleteItems: (args) => this.deleteItems(args.keys),
			deleteItemsWithDiff: (args) => this.deleteItemsWithDiff(args.keys),
			getQuery: (args) => this.getQuery(args.key),
			saveQuery: (args) =>
				this.saveQuery(args.key, args.indexes, args.metadata, Date.now() + args.ttlMs),
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
		const now = Date.now();
		const results: (string | null)[] = [];
		for (const chunk of batch(keys)) {
			const json = JSON.stringify(chunk);
			const rows = this.sql
				.exec<{ value: string | null }>(
					`SELECT i.value
					FROM json_each(?) AS je
					LEFT JOIN items i ON je.value = i.key AND i.expires_at > ?
					ORDER BY je.key`,
					json,
					now,
				)
				.toArray();
			for (const row of rows) {
				results.push(row.value ?? null);
			}
		}
		return results;
	}

	async saveItems(items: Array<[string, string]>, expiresAt: number) {
		for (const chunk of batch(items)) {
			const json = JSON.stringify(chunk);
			this.sql.exec(
				`INSERT OR REPLACE INTO items (key, value, expires_at)
				SELECT json_extract(je.value, '$[0]'), json_extract(je.value, '$[1]'), ?
				FROM json_each(?) AS je`,
				expiresAt,
				json,
			);
		}
		await this.ensureAlarm();
	}

	async saveItemsWithDiff(items: Array<[string, string]>, expiresAt: number) {
		const keys = items.map(([key]) => key);
		const currentValues = this.getPartialItems(keys);
		for (const chunk of batch(items)) {
			const json = JSON.stringify(chunk);
			this.sql.exec(
				`INSERT OR REPLACE INTO items (key, value, expires_at)
				SELECT json_extract(je.value, '$[0]'), json_extract(je.value, '$[1]'), ?
				FROM json_each(?) AS je`,
				expiresAt,
				json,
			);
		}
		await this.ensureAlarm();
		return currentValues;
	}

	deleteItems(keys: string[]) {
		for (const chunk of batch(keys)) {
			const json = JSON.stringify(chunk);
			this.sql.exec(
				'DELETE FROM items WHERE key IN (SELECT je.value FROM json_each(?) AS je)',
				json,
			);
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
		if (indexKeys.length > 0) {
			const json = JSON.stringify(indexKeys);
			this.sql.exec(
				`INSERT OR REPLACE INTO query_indexes (index_key, query_key, expires_at)
				SELECT je.value, ?, ? FROM json_each(?) AS je`,
				queryKey,
				expiresAt,
				json,
			);
		}
		await this.ensureAlarm();
	}

	deleteQueries(indexKeys: string[]) {
		const json = JSON.stringify(indexKeys);
		this.sql.exec(
			`DELETE FROM queries WHERE key IN (
				SELECT query_key FROM query_indexes
				WHERE index_key IN (SELECT je.value FROM json_each(?) AS je)
			)`,
			json,
		);
		this.sql.exec(
			'DELETE FROM query_indexes WHERE index_key IN (SELECT je.value FROM json_each(?) AS je)',
			json,
		);
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
			await this.ctx.storage.setAlarm(Date.now() + 30_000);
		}
	}

	private async ensureAlarm() {
		if (!(await this.ctx.storage.getAlarm())) {
			await this.ctx.storage.setAlarm(Date.now() + 30_000);
		}
	}
}
