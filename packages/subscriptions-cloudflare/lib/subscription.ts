import { handleWS } from './handle-ws.ts';
import { publish } from './publish.ts';
import type { DefaultPubSubMap } from './pubsub-map.ts';
import { subscribe } from './subscribe.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';
import { createWsConnectionsClass } from './ws-connections.ts';

export type Publish<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
	payload: P,
) => Promise<void>;

export type Subscribe<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
) => AsyncIterator<P>;

export function createCloudflareSubscription<
	Env,
	Context,
	ContextParams,
	PubSubMap extends DefaultPubSubMap = DefaultPubSubMap,
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
