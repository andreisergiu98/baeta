import { createConnectionId } from './connection-id.ts';
import { getPoolingId } from './pooling-type.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';

export function handleWS<Context, ContextParams>(
	request: Request,
	options: SubscriptionsOptions<Context, ContextParams>,
) {
	const upgradeHeader = request.headers.get('upgrade');

	if (upgradeHeader !== 'websocket') {
		throw new Error('request is not a websocket request');
	}

	const poolingId = getPoolingId(request, options.poolingType ?? 'global');
	const connectionPool = options.getWSConnections();
	const stubId = connectionPool.idFromName(poolingId);
	const stub = connectionPool.get(stubId);
	const connectionId = createConnectionId(stubId.toString());

	return stub.fetch(
		`https://ws-connections-durable-object.internal/connect/${connectionId}`,
		request,
	);
}
