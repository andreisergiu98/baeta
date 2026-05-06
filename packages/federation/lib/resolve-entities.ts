type EntityRepresentation<T extends string, R extends Record<string, unknown>> = {
	__typename: T;
} & R;

type EntityHandlerMap<T extends string, Ctx, Info> = Record<
	T,
	(representation: EntityRepresentation<T, any>, ctx: Ctx, info: Info) => any
>;

export async function resolveEntities<
	T extends string,
	R extends Record<string, unknown>,
	Ctx,
	Info,
>(
	representations: Array<EntityRepresentation<T, R>>,
	entityHandlerMap: EntityHandlerMap<T, Ctx, Info>,
	ctx: Ctx,
	info: Info,
) {
	const promises = representations.map(async (representation) => {
		const handler = entityHandlerMap[representation.__typename];
		return await handler(representation, ctx, info);
	});
	return await Promise.all(promises);
}
