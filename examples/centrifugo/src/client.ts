import { randomUUID } from 'node:crypto';
import { createEnvParser } from '@baeta/env';
import { createClient, fetchExchange, subscriptionExchange } from '@urql/core';
import { Centrifuge } from 'centrifuge';
import { pipe, subscribe } from 'wonka';
import WebSocket from 'ws';

const parseEnv = createEnvParser((key) => process.env[key]);

export const config = {
	centrifugoUrl: new URL(
		parseEnv('CENTRIFUGO_URL', {
			type: 'string',
			default: 'ws://127.0.0.1:8300/connection/websocket',
		}),
	),
	graphqlUrl: new URL(
		parseEnv('GRAPHQL_URL', {
			type: 'string',
			default: 'http://127.0.0.1:4000/graphql',
		}),
	),
	heartbeatIntervalMs: parseEnv('HEARTBEAT_INTERVAL_MS', {
		type: 'number',
		default: 10000,
	}),
};

const NAMESPACE = 'graphql';

const activeChannels = new Set<string>();
let connected = false;

class NodeWebSocket extends WebSocket {
	constructor(url: string, protocols?: string | string[]) {
		super(url, protocols, { headers: { origin: 'http://localhost:4000' } });
	}
}

const SUBSCRIPTION = /* GraphQL */ `
	subscription UserUpdated {
		userUpdated {
			id
			givenName
			lastName
			email
		}
	}
`;

const MUTATION = /* GraphQL */ `
	mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
		updateUser(where: { id: $id }, data: $data) {
			id
			givenName
			lastName
		}
	}
`;

const centrifuge = new Centrifuge(config.centrifugoUrl.toString(), { websocket: NodeWebSocket });
centrifuge.on('connected', () => {
	connected = true;
	console.log('● connected to Centrifugo');
});
centrifuge.on('disconnected', (ctx) => {
	connected = false;
	console.log('○ disconnected:', ctx.reason);
});
centrifuge.on('error', (ctx) => console.error('client error:', ctx.error.message));

const { promise: subscribed, resolve: markSubscribed } = Promise.withResolvers<void>();

const centrifugoSubscriptionExchange = subscriptionExchange({
	forwardSubscription(request) {
		return {
			subscribe(sink) {
				const channel = `${NAMESPACE}:${randomUUID()}`;
				const sub = centrifuge.newSubscription(channel, {
					data: { query: request.query, variables: request.variables ?? {} },
				});
				sub.on('subscribed', () => {
					console.log(`◆ subscribed on ${channel} — waiting for events`);
					markSubscribed();
				});
				sub.on('publication', (ctx) => sink.next(ctx.data as Record<string, unknown>));
				sub.on('error', (ctx) => sink.error?.(new Error(ctx.error.message)));
				sub.subscribe();
				activeChannels.add(channel);
				return {
					unsubscribe() {
						activeChannels.delete(channel);
						sub.unsubscribe();
						centrifuge.removeSubscription(sub);
					},
				};
			},
		};
	},
});

const client = createClient({
	url: config.graphqlUrl.toString(),
	exchanges: [fetchExchange, centrifugoSubscriptionExchange],
});

const { unsubscribe } = pipe(
	client.subscription(SUBSCRIPTION, {}),
	subscribe((result) => {
		if (result.error) {
			console.error('subscription error:', result.error.message);
		} else {
			console.log('★ userUpdated event:', JSON.stringify(result.data?.userUpdated));
		}
	}),
);

let id = 0;
async function runMutation() {
	const result = await client
		.mutation(MUTATION, { id: `${++id}`, data: { givenName: 'Jane', lastName: 'Roe' } })
		.toPromise();
	if (result.error) {
		console.error('mutation error:', result.error.message);
	} else {
		console.log('→ ran updateUser mutation:', JSON.stringify(result.data?.updateUser));
	}
}

centrifuge.connect();
console.log('Connecting… press Ctrl+C to exit.');

const heartbeat = setInterval(() => {
	if (!connected || activeChannels.size === 0) {
		return;
	}
	void centrifuge.rpc('heartbeat', { channels: [...activeChannels] }).catch((error: unknown) => {
		console.error('heartbeat failed:', error);
	});
}, config.heartbeatIntervalMs);
heartbeat.unref();

void subscribed.then(() => {
	void runMutation();
	const interval = setInterval(() => void runMutation(), 5000);
	interval.unref();
});

process.on('SIGINT', () => {
	unsubscribe();
	centrifuge.disconnect();
	process.exit(0);
});
