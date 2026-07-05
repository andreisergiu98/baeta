export interface SubscriptionDedupeParams<Payload = unknown, Args = unknown, Context = unknown> {
	source: Payload;
	args: Args;
	loadContext: () => Promise<Context> | Context;
}

export type DedupeKey = string | number | symbol;

export type SubscriptionDedupeKeyFn<Payload = unknown, Args = unknown, Context = unknown> = (
	params: SubscriptionDedupeParams<Payload, Args, Context>,
) => DedupeKey | PromiseLike<DedupeKey>;

export type DedupeRegistry = Map<
	string,
	{
		enabled: true;
		getKey?: SubscriptionDedupeKeyFn | undefined;
	}
>;
