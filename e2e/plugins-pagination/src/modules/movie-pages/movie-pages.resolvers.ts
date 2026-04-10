import { MoviePagesModule } from './typedef.ts';

const { Query } = MoviePagesModule;

const allMovies = Array.from({ length: 10 }).map((_, i) => ({
	id: i.toString(),
	title: `Movie ${i}`,
	year: 2020 + i,
	rating: 7.0 + i * 0.3,
}));

const moviesConnectionQuery = Query.moviesConnection.resolve(({ args }) => {
	const { cursor, limit } = args.page;

	let startIndex = 0;
	if (cursor) {
		const cursorIndex = allMovies.findIndex((m) => m.id === cursor);
		if (cursorIndex >= 0) {
			startIndex = cursorIndex + 1;
		}
	}

	const slice = allMovies.slice(startIndex, startIndex + limit);
	const hasNextPage = startIndex + limit < allMovies.length;
	const hasPreviousPage = startIndex > 0;

	return {
		pageInfo: {
			hasNextPage,
			hasPreviousPage,
		},
		edges: slice.map((movie) => ({
			cursor: movie.id,
			node: movie,
		})),
	};
});

export const queryResolver = Query.$fields({
	moviesConnection: moviesConnectionQuery,
});
