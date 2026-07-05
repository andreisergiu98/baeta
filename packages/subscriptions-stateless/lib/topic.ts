import type { ExecutionResult } from 'graphql';

export type SubscriptionTopic<T = unknown> = AsyncIterable<T> & {
	topic: string;
	payloads: T[];
};

export function isSubscriptionTopic(
	value: AsyncIterable<unknown> | ExecutionResult,
): value is SubscriptionTopic {
	return 'topic' in value && typeof (value as any).topic === 'string';
}
