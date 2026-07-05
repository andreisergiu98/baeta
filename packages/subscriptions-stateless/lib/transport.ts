import type { ExecutionResult } from 'graphql';

export interface SubscriptionBatchMessage {
	destinations: Array<{ connectionId: string; subscriptionId: string }>;
	result: ExecutionResult;
}

export interface SubscriptionTransport {
	sendBatch: (messages: SubscriptionBatchMessage[]) => PromiseLike<void>;
}
