export type MiddlewareParams<Source, Context, Args, Info> = {
	source: Source;
	args: Args;
	ctx: Context;
	info: Info;
};

export type Middleware<Result, Source, Context, Args, Info> = (
	next: () => Promise<Result>,
	params: MiddlewareParams<Source, Context, Args, Info>,
) => Result | PromiseLike<Result>;
