import { DurableObjectNamespace } from '@cloudflare/workers-types';
import { Action, GetAction, ListAction, PutAction } from './baeta-cache';

export class CloudflareCacheClient {
	constructor(public durableObject: DurableObjectNamespace) {}

	protected async post(body: Action) {
		const stubId = this.durableObject.idFromString('');
		const stub = this.durableObject.get(stubId);
		return stub.fetch('https://baeta-cache-durable-object.internal', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'content-type': 'application/json' },
		});
	}

	get = async (keys: string[]) => {
		const value: GetAction = {
			type: 'get',
			keys,
		};
		const result = await this.post(value);
		const json = await result.json();
		return json as (string | null)[];
	};

	getOne = async (key: string) => {
		const result = await this.get([key]);
		return result[0];
	};

	put = async (values: [string, string][], ttl?: number) => {
		const value: PutAction = {
			type: 'put',
			values,
			ttl,
		};
		await this.post(value);
		return null;
	};

	putOne = async (key: string, value: string, ttl?: number) => {
		await this.put([[key, value]], ttl);
		return null;
	};

	delete = async (keys: string[]) => {
		const value: Action = {
			type: 'delete',
			keys,
		};
		await this.post(value);
		return null;
	};

	deleteOne = async (key: string) => {
		await this.delete([key]);
		return null;
	};

	list = async (prefix: string, startAfter?: string, limit?: number) => {
		const value: ListAction = {
			type: 'list',
			prefix,
			startAfter,
			limit,
		};
		const result = await this.post(value);
		const json = await result.json();
		return json as string[];
	};
}
