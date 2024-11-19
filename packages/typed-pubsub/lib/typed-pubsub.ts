export interface TypedPubSubOptions {
	prefix?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: we need to use `any` in this file to support dynamic typing
type Any = any;

type PubSubMap = Record<string, Any>;
type OnMessage<Payload> = (message: Payload) => Promise<void> | void;

interface PubSubEngineBase {
	publish: (triggerName: string, payload: Any, ...rest: Any[]) => Promise<void>;
	subscribe: (triggerName: string, onMessage: OnMessage<Any>, ...rest: Any[]) => Promise<number>;
	unsubscribe: (subId: number, ...rest: Any[]) => void;
}

interface PubSubEngineV2 extends PubSubEngineBase {
	asyncIterator: <T>(triggers: string | string[], ...rest: Any[]) => AsyncIterator<T>;
}

interface PubSubEngineV3 extends PubSubEngineBase {
	asyncIterableIterator: <T>(
		triggers: string | readonly string[],
		...rest: Any
	) => AsyncIterableIterator<T>;
}

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

class TypedPubSubBase<Engine extends PubSubEngineBase, Map extends PubSubMap> {
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

export class TypedPubSubV2<
	Engine extends PubSubEngineV2,
	Map extends PubSubMap,
> extends TypedPubSubBase<Engine, Map> {
	asyncIterator = <C extends keyof Map>(
		triggers: C | C[],
		...rest: RestAsyncIteratorFnArgs<Engine['asyncIterator']>
	) => {
		return this.pubsub.asyncIterator<Map[C]>(this.mapTriggers(triggers), ...rest);
	};
}

export class TypedPubSubV3<
	Engine extends PubSubEngineV3,
	Map extends PubSubMap,
> extends TypedPubSubBase<Engine, Map> {
	asyncIterableIterator = <C extends keyof Map>(
		triggers: C | C[],
		...rest: RestAsyncIterableIteratorFnArgs<Engine['asyncIterableIterator']>
	) => {
		return this.pubsub.asyncIterableIterator<Map[C]>(this.mapTriggers(triggers), ...rest);
	};
}
