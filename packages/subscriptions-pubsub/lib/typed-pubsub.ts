import type { PubSubEngine } from './pubsub-engine.ts';
/**
 * Configuration options for TypedPubSub
 */
export interface TypedPubSubOptions {
	/** Optional prefix for channel names */
	prefix?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: we need to use `any` in this file to support dynamic typing
type Any = any;

type PubSubMap = Record<string, Any>;
type OnMessage<Payload> = (message: Payload) => Promise<void> | void;

type RestPayloadFnArgs<Fn> = Fn extends (
	triggerName: string,
	payload: Any,
	...rest: infer Rest
) => Any
	? Rest
	: never;

type RestSubscribeFnArgs<Fn> = Fn extends (
	triggerName: string,
	onMessage: OnMessage<Any>,
	...rest: infer Rest
) => Any
	? Rest
	: never;

type RestUnsubscribeFnArgs<Fn> = Fn extends (subId: number, ...rest: infer Rest) => Any
	? Rest
	: never;

type RestAsyncIterableIteratorFnArgs<Fn> = Fn extends (
	triggers: string | readonly string[],
	...rest: infer Rest
) => Any
	? Rest
	: never;

/**
 * Creates a type-safe wrapper around a PubSub implementation.
 *
 * This utility ensures that your subscription channels and their payloads
 * are properly typed, helping catch potential errors at compile time.
 *
 * @param pubsub - The PubSub engine instance (e.g., PubSub, RedisPubSub)
 * @param options - Configuration options
 *
 * @example
 * ```typescript
 * // Define your event map
 * type PubSubMap = {
 *   "user-updated": User;
 *   [c: `user-updated-${string}`]: User;
 * };
 *
 * // Create typed PubSub instance
 * const pubsub = new TypedPubSub<PubSub, PubSubMap>(new PubSub());
 *
 * // Usage with Redis
 * const pubsub = new TypedPubSub<RedisPubSub, PubSubMap>(
 *   new RedisPubSub({
 *     publisher: new Redis(options),
 *     subscriber: new Redis(options),
 *   }),
 *   {
 *     prefix: "feature-1:",
 *   }
 * );
 * ```
 */
export class TypedPubSub<Engine extends PubSubEngine, Map extends PubSubMap> {
	protected channelPrefix: string;
	protected pubsub: Engine;
	protected options?: TypedPubSubOptions;

	constructor(pubsub: Engine, options?: TypedPubSubOptions) {
		this.channelPrefix = options?.prefix ?? '';
		this.pubsub = pubsub;
		this.options = options;
	}

	publish = <C extends keyof Map>(
		channel: C,
		message: Map[C],
		...rest: RestPayloadFnArgs<Engine['publish']>
	) => {
		return this.pubsub.publish(this.mapChannel(channel), message, ...rest);
	};

	subscribe = <C extends keyof Map>(
		channel: C,
		onMessage: OnMessage<Map[C]>,
		...rest: RestSubscribeFnArgs<Engine['subscribe']>
	) => {
		return this.pubsub.subscribe(this.mapChannel(channel), onMessage, ...rest);
	};

	unsubscribe = (subId: number, ...rest: RestUnsubscribeFnArgs<Engine['unsubscribe']>) => {
		return this.pubsub.unsubscribe(subId, ...rest);
	};

	asyncIterableIterator = <C extends keyof Map>(
		triggers: C | C[],
		...rest: RestAsyncIterableIteratorFnArgs<Engine['asyncIterableIterator']>
	) => {
		return this.pubsub.asyncIterableIterator<Map[C]>(this.mapTriggers(triggers), ...rest);
	};

	protected mapChannel = <C extends keyof Map>(channel: C): string => {
		return `${this.channelPrefix}${channel.toString()}`;
	};

	protected mapTriggers = <C extends keyof Map>(triggers: C | C[]): string | string[] => {
		return Array.isArray(triggers) ? triggers.map(this.mapChannel) : this.mapChannel(triggers);
	};
}
