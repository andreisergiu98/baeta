import { v4 as uuid } from 'uuid';
import { getPoolingId } from './pooling-type.ts';
import type { SubscriptionsOptions } from './subscription.ts';

export function handleWS<Env>(
	request: Request,
	env: Env,
	ctx: ExecutionContext,
	options: SubscriptionsOptions<Env>,
) {
	const upgradeHeader = request.headers.get('upgrade');

	if (upgradeHeader !== 'websocket') {
		throw new Error('request is not a websocket request');
	}

	const poolingId = getPoolingId(request, options.poolingType ?? 'global');
	const connectionPool = options.getWSConnections(env);
	const stubId = connectionPool.idFromName(poolingId);
	const stub = connectionPool.get(stubId);

	const connectionId = uuid();

	return stub.fetch(
		`https://ws-connections-durable-object.internal/connect/${connectionId}`,
		request,
	);
}
