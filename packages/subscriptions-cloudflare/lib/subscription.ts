import { handleWS } from './handle-ws.ts';
import { publish } from './publish.ts';
import { subscribe } from './subscribe.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';
import { createWsConnectionsClass } from './ws-connections.ts';

// biome-ignore lint/suspicious/noExplicitAny: accept any type for generic pubsub map
export type Publish<Map extends Record<string, any>> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
	payload: P,
) => Promise<void>;

// biome-ignore lint/suspicious/noExplicitAny: accept any type for generic pubsub map
export type Subscribe<Map extends Record<string, any>> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
) => AsyncIterable<P>;

export function createCloudflareSubscription<
	Env,
	Context,
	ContextParams,
	// biome-ignore lint/suspicious/noExplicitAny: accept any type for generic pubsub map
	PubSubMap extends Record<string, any> = Record<string, any>,
>(options: SubscriptionsOptions<Env, Context, ContextParams>) {
	return {
		handleWS: (request: Request, env: Env, execContext: ExecutionContext) => {
			return handleWS(request, env, execContext, options);
		},
		createSubscriber: (): Subscribe<PubSubMap> => {
			return (topic) => {
				return subscribe(topic.toString());
			};
		},
		createPublisher: (env: Env, execContext: ExecutionContext): Publish<PubSubMap> => {
			return (topic, payload) => {
				const promise = publish(env, execContext, options, topic.toString(), payload);
				execContext.waitUntil(promise);
				return promise;
			};
		},
		createWsConnectionsClass: () => createWsConnectionsClass(options),
	};
}
