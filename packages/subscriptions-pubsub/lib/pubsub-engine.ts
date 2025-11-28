/** biome-ignore-all lint/suspicious/noExplicitAny: allow any args*/

export interface PubSubEngine {
	publish: (triggerName: string, payload: any, ...rest: any[]) => Promise<void>;
	subscribe: (
		triggerName: string,
		onMessage: (message: any) => Promise<void> | void,
		...rest: any[]
	) => Promise<number>;
	unsubscribe: (subId: number, ...rest: any[]) => void;
	asyncIterableIterator: <T>(
		triggers: string | readonly string[],
		...rest: any[]
	) => AsyncIterableIterator<T>;
}
