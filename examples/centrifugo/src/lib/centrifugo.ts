import type {
	StatelessSubscriptions,
	SubscriptionBatchMessage,
	SubscriptionState,
	SubscriptionStore,
	SubscriptionTransport,
} from '@baeta/subscriptions-stateless';
import type Koa from 'koa';
import z from 'zod';
import type { ContextParams } from '../types/context.ts';
import { GraphQLOperationSchema } from './schemas.ts';

export interface CentrifugoTransportOptions {
	apiUrl: URL;
	apiKey: string;
}

export function createCentrifugoTransport(
	options: CentrifugoTransportOptions,
): SubscriptionTransport {
	const batchUrl = new URL('/api/batch', options.apiUrl);
	return {
		sendBatch: (messages) => publishBatch(messages, batchUrl, options.apiKey),
	};
}

async function publishBatch(
	messages: SubscriptionBatchMessage[],
	batchUrl: URL,
	apiKey: string,
): Promise<void> {
	if (messages.length === 0) {
		return;
	}

	const commands = messages.map((message) => {
		if (message.destinations.length === 1) {
			const channel = message.destinations[0].subscriptionId;
			return {
				publish: { channel, data: message.result },
			};
		}
		const channels = message.destinations.map((d) => d.subscriptionId);
		return {
			broadcast: { channels, data: message.result },
		};
	});

	const response = await fetch(batchUrl, {
		method: 'POST',
		headers: { 'content-type': 'application/json', 'X-API-Key': apiKey },
		body: JSON.stringify({ commands, parallel: true }),
	});

	if (!response.ok) {
		throw new Error(`Centrifugo batch failed with HTTP ${response.status}`);
	}

	const body = (await response.json()) as { error?: { message: string } };
	if (body.error != null) {
		throw new Error(`Centrifugo batch error: ${body.error.message}`);
	}
}

interface StoredSubscription {
	state: SubscriptionState;
	expiresAt: number;
}

export class InMemoryStore implements SubscriptionStore {
	private readonly subscriptions = new Map<string, StoredSubscription>();
	private readonly ttlMs: number;

	constructor(ttlMs: number) {
		this.ttlMs = ttlMs;
	}

	getSubscriptions(topic: string): Promise<SubscriptionState[]> {
		const now = Date.now();
		const matches: SubscriptionState[] = [];
		for (const [id, entry] of this.subscriptions) {
			if (entry.expiresAt <= now) {
				this.subscriptions.delete(id);
			} else if (entry.state.topic === topic) {
				matches.push(entry.state);
			}
		}
		return Promise.resolve(matches);
	}

	createSubscription(state: SubscriptionState): Promise<void> {
		this.subscriptions.set(state.id, { state, expiresAt: Date.now() + this.ttlMs });
		return Promise.resolve();
	}

	deleteSubscription(id: string): Promise<void> {
		this.subscriptions.delete(id);
		return Promise.resolve();
	}

	deleteSubscriptions(connectionId: string): Promise<void> {
		for (const [id, entry] of this.subscriptions) {
			if (entry.state.connectionId === connectionId) {
				this.subscriptions.delete(id);
			}
		}
		return Promise.resolve();
	}

	heartbeat(channels: string[]): void {
		const expiresAt = Date.now() + this.ttlMs;
		for (const channel of channels) {
			const entry = this.subscriptions.get(channel);
			if (entry) {
				entry.expiresAt = expiresAt;
			}
		}
	}

	sweep(): void {
		const now = Date.now();
		for (const [id, entry] of this.subscriptions) {
			if (entry.expiresAt <= now) {
				this.subscriptions.delete(id);
			}
		}
	}
}

export function handleConnect(ctx: Koa.DefaultContext, getContextParams: () => ContextParams) {
	ctx.body = { result: { user: getContextParams().userId } };
}

export async function handleSubscribe(
	ctx: Koa.DefaultContext,
	subscriptions: StatelessSubscriptions<ContextParams>,
) {
	const request = SubscriptionProxyRequestSchema.parse(ctx.request.body);
	const query = request.data?.query;

	if (query == null) {
		ctx.body = { error: { code: 400, message: 'Missing GraphQL query in subscription data' } };
		return;
	}

	const registration = await subscriptions.addSubscription({
		id: request.channel,
		connectionId: request.channel,
		request: {
			query,
			variables: request.data?.variables ?? null,
			operationName: request.data?.operationName ?? null,
		},
		contextParams: { userId: request.user },
	});

	if (!registration.ok) {
		const message = registration.value.errors?.[0]?.message ?? 'Invalid subscription';
		ctx.body = { error: { code: 400, message } };
		return;
	}

	ctx.body = { result: {} };
}

export function handleRpc(ctx: Koa.DefaultContext, store: InMemoryStore) {
	const request = RpcProxyRequestSchema.parse(ctx.request.body);
	if (request.method === 'heartbeat') {
		store.heartbeat(request.data?.channels ?? []);
		ctx.body = { result: { data: { ok: true } } };
		return;
	}
	ctx.body = { error: { code: 1404, message: `Unknown RPC method: ${request.method}` } };
}

const SubscriptionProxyRequestSchema = z.object({
	client: z.string(),
	user: z.string(),
	channel: z.string(),
	data: GraphQLOperationSchema.optional().nullable(),
});

const RpcProxyRequestSchema = z.object({
	method: z.string(),
	data: z
		.object({ channels: z.array(z.string()).optional() })
		.optional()
		.nullable(),
});
