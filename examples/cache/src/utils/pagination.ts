export function createEdges<T, C>(
	items: T[],
	cursor: C | null,
	take: number,
	getCursor: (item: T) => C,
) {
	let hasNextPage = false;
	let hasPreviousPage = false;

	const edges = items.map((item) => ({
		cursor: getCursor(item),
		node: item,
	}));

	// If the first item has the same cursor as the requested cursor, it means we have a previous page
	if (edges.length > 1 && edges[0].cursor === cursor) {
		hasPreviousPage = true;
		edges.shift();
	}

	// If we have an extra item, it means we have more items after this page
	if (edges.length > take) {
		hasNextPage = true;
		edges.splice(take);
	}

	return {
		pageInfo: {
			hasNextPage,
			hasPreviousPage,
		},
		edges: edges,
	};
}
