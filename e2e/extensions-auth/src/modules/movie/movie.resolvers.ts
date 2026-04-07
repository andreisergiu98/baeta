import { MovieModule } from './typedef.ts';

const { Query, Mutation, Movie } = MovieModule;

export const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
	rating: Movie.rating.key('rating'),
});

const movieQuery = Query.movie
	.$auth(
		{
			isLoggedIn: true,
		},
		{
			grants: ['readReviews'],
		},
	)
	.resolve(({ args }) => {
		return {
			id: args.where.id,
			title: 'Inception',
			year: 2010,
			rating: 8.8,
		};
	});

const publicMoviesQuery = Query.publicMovies
	.$auth(
		{
			isPublic: true,
		},
		{
			skipDefaults: true,
		},
	)
	.resolve(() => {
		return Array.from({ length: 3 }).map((_, i) => ({
			id: i.toString(),
			title: `Movie ${i}`,
			year: 2020 + i,
			rating: 7.0 + i * 0.5,
		}));
	});

const createMovieMutation = Mutation.createMovie
	.$auth({
		hasRole: 'admin',
	})
	.resolve(({ args }) => {
		return {
			id: '99',
			title: args.input.title,
			year: args.input.year,
			rating: args.input.rating ?? null,
		};
	});

export const queryResolver = Query.$fields({
	movie: movieQuery,
	publicMovies: publicMoviesQuery,
});

export const mutationResolver = Mutation.$fields({
	createMovie: createMovieMutation,
});
