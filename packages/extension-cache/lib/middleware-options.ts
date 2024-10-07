import type { ItemRef, RefCompatibleRoot } from './ref.ts';

type MiddlewareOptionsRefFn<Root> = {
	getRootRef?: (root: Root) => ItemRef;
};

type MiddlewareOptionsRef<Root> = Root extends RefCompatibleRoot
	? MiddlewareOptionsRefFn<Root>
	: Required<MiddlewareOptionsRefFn<Root>>;

export type MiddlewareOptions<Root> = MiddlewareOptionsRef<Root>;
