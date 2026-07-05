export interface SubscriptionFilterParams<Payload = unknown, Args = unknown, Context = unknown> {
	source: Payload;
	args: Args;
	loadContext: () => Promise<Context> | Context;
}

export type SubscriptionFilterPredicate<Payload = unknown, Args = unknown, Context = unknown> = (
	params: SubscriptionFilterParams<Payload, Args, Context>,
) => boolean | PromiseLike<boolean>;

export type FilterRegistry = Map<string, SubscriptionFilterPredicate[]>;
