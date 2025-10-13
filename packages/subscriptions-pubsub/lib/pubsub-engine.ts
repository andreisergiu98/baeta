// biome-ignore lint/suspicious/noExplicitAny: allow args
type Any = any;
export interface PubSubEngine {
	publish: (triggerName: string, payload: Any, ...rest: Any[]) => Promise<void>;
	subscribe: (
		triggerName: string,
		onMessage: (message: Any) => Promise<void> | void,
		...rest: Any[]
	) => Promise<number>;
	unsubscribe: (subId: number, ...rest: Any[]) => void;
	asyncIterableIterator: <T>(
		triggers: string | readonly string[],
		...rest: Any[]
	) => AsyncIterableIterator<T>;
}
