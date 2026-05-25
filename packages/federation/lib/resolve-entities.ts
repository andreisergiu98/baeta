type EntityRepresentation<T extends string, R extends Record<string, unknown>> = {
	__typename: T;
} & R;

export async function resolveEntities<
	T extends string,
	R extends Record<string, unknown>,
	Ctx,
	Info,
>(
	representations: Array<EntityRepresentation<T, R>>,
	entityHandlerMap: Map<
		string,
		(representation: EntityRepresentation<T, any>, ctx: Ctx, info: Info) => any
	>,
	ctx: Ctx,
	info: Info,
) {
	const promises = representations.map(async (representation) => {
		const typename = representation.__typename;
		const handler = entityHandlerMap.get(typename);
		if (handler == null) {
			throw new Error(
				`Entity representation is missing or has invalid __typename: ${String(typename)}`,
			);
		}
		return await handler(representation, ctx, info);
	});
	return await Promise.all(promises);
}
