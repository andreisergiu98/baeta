import { MovieModule } from './typedef.ts';

const { Query, Mutation, Movie } = MovieModule;

export const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
	rating: Movie.rating.key('rating'),
	createdAt: Movie.createdAt.key('createdAt'),
});

const movieQuery = Query.movie
	.$use(async (next) => {
		const result = await next();
		return result;
	})
	.resolve(({ args }) => {
		return {
			id: args.where.id,
			title: 'Inception',
			year: 2010,
			rating: 8.8,
			createdAt: new Date('2010-07-16T00:00:00Z'),
		};
	});

const moviesQuery = Query.movies.resolve(() => {
	return Array.from({ length: 3 }).map((_, i) => ({
		id: i.toString(),
		title: `Movie ${i}`,
		year: 2020 + i,
		rating: 7.0 + i * 0.5,
		createdAt: new Date('2020-07-16T00:00:00Z'),
	}));
});

const createMovieMutation = Mutation.createMovie.resolve(({ args }) => {
	return {
		id: '99',
		title: args.input.title,
		year: args.input.year,
		rating: args.input.rating ?? null,
		createdAt: new Date('2016-07-16T00:00:00Z'),
	};
});

export const queryResolver = Query.$fields({
	movie: movieQuery,
	movies: moviesQuery,
});

export const mutationResolver = Mutation.$fields({
	createMovie: createMovieMutation,
});
