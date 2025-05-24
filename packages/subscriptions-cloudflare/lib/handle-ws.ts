import { getPoolingId } from './pooling-type.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';

export function handleWS<Env, Context, ContextParams>(
	request: Request,
	env: Env,
	_ctx: ExecutionContext,
	options: SubscriptionsOptions<Env, Context, ContextParams>,
) {
	const upgradeHeader = request.headers.get('upgrade');

	if (upgradeHeader !== 'websocket') {
		throw new Error('request is not a websocket request');
	}

	const poolingId = getPoolingId(request, options.poolingType ?? 'global');
	const connectionPool = options.getWSConnections(env);
	const stubId = connectionPool.idFromName(poolingId);
	const stub = connectionPool.get(stubId);

	const connectionId = crypto.randomUUID();

	return stub.fetch(
		`https://ws-connections-durable-object.internal/connect/${connectionId}`,
		request,
	);
}
