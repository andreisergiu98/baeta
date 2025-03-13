export type GetAction = {
	type: 'get';
	keys: string[];
};

export type PutAction = {
	type: 'put';
	values: [string, string][];
	ttl?: number;
};

export type ListAction = {
	type: 'list';
	prefix: string;
	startAfter?: string;
	limit?: number;
};

export type DeleteAction = {
	type: 'delete';
	keys: string[];
};

export type FlushAction = {
	type: 'flush';
};

export type Action = GetAction | PutAction | ListAction | DeleteAction | FlushAction;

export type CacheValue = {
	value: string;
	expireAt?: number;
};

export class BaetaCache implements DurableObject {
	constructor(
		public state: DurableObjectState,
		public env: { [key: string]: never },
	) {}

	async fetch(request: Request) {
		const json = await request.json();
		const body = json as Action;

		if (body.type === 'get') {
			const result = await this.get(body.keys);
			return this.createResponse(result, 200);
		}

		if (body.type === 'put') {
			const result = await this.put(body.values, body.ttl);
			return this.createResponse(result, 200);
		}

		if (body.type === 'list') {
			const result = await this.list(body.prefix, body.startAfter, body.limit);
			return this.createResponse(result, 200);
		}

		if (body.type === 'delete') {
			const result = await this.delete(body.keys);
			return this.createResponse(result, 200);
		}

		if (body.type === 'flush') {
			const result = await this.flush();
			return this.createResponse(result, 200);
		}

		throw new Error('bad_request');
	}

	private createResponse(body: string | null, status: number) {
		return new Response(body, { status });
	}

	get = async (keys: string[]) => {
		const map = await this.state.storage.get<CacheValue>(keys, {
			allowConcurrency: true,
		});
		const values = keys.map((key) => map.get(key)?.value ?? null);
		return JSON.stringify(values);
	};

	put = async (values: [string, string][], ttl?: number) => {
		const entries: Record<string, CacheValue> = {};
		const expireAt = ttl ? Date.now() + ttl : undefined;

		for (const [key, value] of values) {
			entries[key] = {
				value,
				expireAt,
			};
		}

		if (expireAt) {
			await this.scheduledEviction(expireAt);
		}

		await this.state.storage.put<CacheValue>(entries);
		return null;
	};

	list = async (prefix: string, startAfter?: string, limit?: number) => {
		const keys = await this.state.storage.list({
			prefix,
			startAfter,
			limit,
			allowConcurrency: true,
		});
		return JSON.stringify([...keys.keys()]);
	};

	delete = async (keys: string[]) => {
		await this.state.storage.delete(keys);
		return null;
	};

	flush = async () => {
		await this.state.storage.deleteAll();
		return null;
	};

	handleEviction = async () => {
		const limit = 1000;
		const now = Date.now();
		const expiredKeys: string[] = [];

		let counter = limit;
		let startAfter: string | undefined;
		let earliestExpiry: number | undefined;

		while (counter === limit) {
			const map = await this.state.storage.list<CacheValue>({
				limit,
				allowConcurrency: true,
				startAfter,
			});

			counter = map.size;

			for (const [key, value] of map.entries()) {
				startAfter = key;

				if (!value.expireAt) {
					continue;
				}

				if (value.expireAt < now) {
					expiredKeys.push(key);
					continue;
				}

				if (earliestExpiry === undefined || value.expireAt < earliestExpiry) {
					earliestExpiry = value.expireAt;
				}
			}
		}

		// console.log("removing", expiredKeys)

		if (expiredKeys.length > 0) {
			await this.state.storage.delete(expiredKeys);
		}

		if (earliestExpiry) {
			await this.scheduledEviction(earliestExpiry);
		}
	};

	scheduledEviction = async (at: number) => {
		const alarm = await this.state.storage.getAlarm();
		if (alarm && alarm < at) {
			return;
		}

		await this.state.storage.deleteAlarm();

		await this.state.storage.setAlarm(at, {
			allowConcurrency: true,
		});
	};

	alarm = async () => {
		await this.handleEviction();
	};
}
