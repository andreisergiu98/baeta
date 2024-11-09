export type Context = {
	userId?: string;
	executionCtx: ExecutionContext;
	waitUntil: (promise: Promise<unknown>) => void;
};
