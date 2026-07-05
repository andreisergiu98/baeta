import {
	createStatelessSubscriptions,
	type Emit,
	type Listen,
} from '@baeta/subscriptions-stateless';
import { handleWS } from './handle-ws.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';
import { createWsTransport } from './transport.ts';
import { createWsConnectionsClass } from './ws-connections.ts';

export function createCloudflareSubscription<
	Context,
	ContextParams,
	PubSubMap extends Record<string, any> = Record<string, any>,
>(options: SubscriptionsOptions<Context, ContextParams>) {
	const contextLoader = options.context;
	const subscriptions = createStatelessSubscriptions<Context, ContextParams, PubSubMap>({
		schema: options.schema,
		store: options.getDatabase,
		transport: createWsTransport(options),
		hideSuggestions: options.hideSuggestions,
		cache: options.cache,
		createContext: contextLoader ? (params) => contextLoader.createContext(params) : undefined,
	});

	return {
		handleWS: (request: Request) => {
			return handleWS(request, options);
		},
		createListener: (): Listen<PubSubMap> => {
			return subscriptions.createListener();
		},
		createEmitter: (executionContext?: ExecutionContext): Emit<PubSubMap> => {
			const emit = subscriptions.createEmitter();
			return (topic, payload, emitOptions) => {
				const promise = emit(topic, payload, emitOptions);
				executionContext?.waitUntil(promise);
				return promise;
			};
		},
		createWsConnectionsClass: () => createWsConnectionsClass(options, subscriptions),
	};
}
