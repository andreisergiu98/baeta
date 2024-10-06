import type { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import type { Subscribe, SubscribeResolve, Subscription } from '../lib/subscription.ts';

export type NativeSubscription<
	Payload = unknown,
	Result = unknown,
	Root = unknown,
	Context = unknown,
	Args = unknown,
> = {
	subscribe: NativeSubscriptionSubscribe<Payload, Root, Context, Args>;
	resolve?: GraphQLFieldResolver<Payload, Context, Args, Result>;
};

type NativeSubscriptionSubscribe<Payload, Root, Context, Args> = (
	source: Root,
	args: Args,
	context: Context,
	info: GraphQLResolveInfo,
) => AsyncIterator<Payload> | Promise<AsyncIterator<Payload>>;

export function createSubscriptionAdapter<Payload, Result, Root, Context, Args>(
	subscription: Subscription<Payload, Result, Root, Context, Args>,
) {
	const resolver: NativeSubscription<Payload, Result, Root, Context, Args> = {
		subscribe: createSubscribeAdapter(subscription.subscribe),
	};

	if (subscription.resolve != null) {
		resolver.resolve = createResolverAdapter(subscription.resolve);
	}

	return resolver;
}

function createSubscribeAdapter<Payload, Root, Context, Args>(
	subscribe: Subscribe<Payload, Root, Context, Args>,
): NativeSubscriptionSubscribe<Payload, Root, Context, Args> {
	return function adapter(root, args, ctx, info) {
		return subscribe({ root, args, ctx, info });
	};
}

function createResolverAdapter<Payload, Result, Context, Args>(
	resolve: SubscribeResolve<Result, Payload, Context, Args>,
): GraphQLFieldResolver<Payload, Context, Args, Result> {
	return function adapter(payload, args, ctx, info) {
		return resolve({ args, info, ctx, payload }) as Result;
	};
}
