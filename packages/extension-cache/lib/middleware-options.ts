import type { ItemRef } from './ref.ts';

export interface MiddlewareOptions<Root> {
	getRootRef?: (root: Root) => ItemRef;
}

export interface RequiredMiddlewareOptions<Root> extends MiddlewareOptions<Root> {
	getRootRef: (root: Root) => ItemRef;
}
