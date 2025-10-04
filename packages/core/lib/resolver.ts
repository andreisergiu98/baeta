export type ResolverParams<Source, Context, Args, Info> = {
	source: Source;
	args: Args;
	ctx: Context;
	info: Info;
};

export type Resolver<Result, Source, Context, Args, Info> = (
	params: ResolverParams<Source, Context, Args, Info>,
) => Result | PromiseLike<Result>;
