export interface PubSubEngineV2 {
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	publish: (triggerName: string, payload: any, ...rest: any[]) => Promise<void>;
	subscribe: (
		triggerName: string,
		// biome-ignore lint/suspicious/noExplicitAny: allow any
		onMessage: (message: any) => Promise<void> | void,
		// biome-ignore lint/suspicious/noExplicitAny: allow any
		...rest: any[]
	) => Promise<number>;
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	unsubscribe: (subId: number, ...rest: any[]) => void;
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	asyncIterator: <T>(triggers: string | string[], ...rest: any[]) => AsyncIterator<T>;
}

export interface PubSubEngineV3 {
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	publish: (triggerName: string, payload: any, ...rest: any[]) => Promise<void>;
	subscribe: (
		triggerName: string,
		// biome-ignore lint/suspicious/noExplicitAny: allow any
		onMessage: (message: any) => Promise<void> | void,
		// biome-ignore lint/suspicious/noExplicitAny: allow any
		...rest: any[]
	) => Promise<number>;
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	unsubscribe: (subId: number, ...rest: any[]) => void;
	asyncIterableIterator: <T>(
		triggers: string | readonly string[],
		// biome-ignore lint/suspicious/noExplicitAny: allow any
		...rest: any[]
	) => AsyncIterableIterator<T>;
}
