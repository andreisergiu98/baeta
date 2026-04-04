import { MovieModule } from './typedef.ts';

const { Query, Mutation, Movie } = MovieModule;

const movieFields = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
	rating: Movie.rating.key('rating'),
});

const movieQuery = Query.movie.resolve(({ args }) => {
	return {
		id: args.where.id ?? '1',
		title: args.where.title ?? 'Inception',
		year: 2010,
		rating: 8.8,
	};
});

const createMovieMutation = Mutation.createMovie.resolve(({ args }) => {
	return {
		id: '99',
		title: args.input.title,
		year: args.input.year,
		rating: args.input.rating ?? null,
	};
});

export default MovieModule.$schema({
	Movie: movieFields,
	Query: Query.$fields({
		movie: movieQuery,
	}),
	Mutation: Mutation.$fields({
		createMovie: createMovieMutation,
	}),
});
