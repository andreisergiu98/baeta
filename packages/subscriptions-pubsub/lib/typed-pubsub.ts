import type { PubSubEngineV2, PubSubEngineV3 } from './pubsub-engine.ts';

export interface TypedPubSubOptions {
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

type RestAsyncIteratorFnArgs<Fn> = Fn extends (
	triggers: string | string[],
	...rest: infer Rest
) => Any
	? Rest
	: never;

type RestAsyncIterableIteratorFnArgs<Fn> = Fn extends (
	triggers: string | readonly string[],
	...rest: infer Rest
) => Any
	? Rest
	: never;

class TypedPubSubBase<Engine extends PubSubEngineV2 | PubSubEngineV3, Map extends PubSubMap> {
	protected channelPrefix: string;

	constructor(
		protected pubsub: Engine,
		protected options?: TypedPubSubOptions,
	) {
		this.channelPrefix = options?.prefix ?? '';
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

	protected mapChannel = <C extends keyof Map>(channel: C): string => {
		return `${this.channelPrefix}${channel.toString()}`;
	};

	protected mapTriggers = <C extends keyof Map>(triggers: C | C[]): string | string[] => {
		return Array.isArray(triggers) ? triggers.map(this.mapChannel) : this.mapChannel(triggers);
	};
}

class TypedPubSubV2<Engine extends PubSubEngineV2, Map extends PubSubMap> extends TypedPubSubBase<
	Engine,
	Map
> {
	asyncIterator = <C extends keyof Map>(
		triggers: C | C[],
		...rest: RestAsyncIteratorFnArgs<Engine['asyncIterator']>
	) => {
		return this.pubsub.asyncIterator<Map[C]>(this.mapTriggers(triggers), ...rest);
	};
}

/** @hidden */
class TypedPubSubV3<Engine extends PubSubEngineV3, Map extends PubSubMap> extends TypedPubSubBase<
	Engine,
	Map
> {
	asyncIterableIterator = <C extends keyof Map>(
		triggers: C | C[],
		...rest: RestAsyncIterableIteratorFnArgs<Engine['asyncIterableIterator']>
	) => {
		return this.pubsub.asyncIterableIterator<Map[C]>(this.mapTriggers(triggers), ...rest);
	};
}

export type TypedPubSub<
	Engine extends PubSubEngineV2 | PubSubEngineV3,
	// biome-ignore lint/suspicious/noExplicitAny: accept any for dynamic typing
	Map extends Record<string, any>,
> = Engine extends PubSubEngineV3
	? TypedPubSubV3<Engine, Map>
	: Engine extends PubSubEngineV2
		? TypedPubSubV2<Engine, Map>
		: never;

export function createTypedPubSub<
	Engine extends PubSubEngineV2 | PubSubEngineV3,
	// biome-ignore lint/suspicious/noExplicitAny: accept any for dynamic typing
	Map extends Record<string, any>,
>(pubsub: Engine, options?: TypedPubSubOptions): TypedPubSub<Engine, Map> {
	if ('asyncIterator' in pubsub) {
		return new TypedPubSubV2<PubSubEngineV2, Map>(pubsub, options) as TypedPubSub<Engine, Map>;
	}

	if ('asyncIterableIterator' in pubsub) {
		return new TypedPubSubV3<PubSubEngineV3, PubSubMap>(pubsub, options) as TypedPubSub<
			Engine,
			Map
		>;
	}

	throw new Error('Unsupported PubSub');
}
