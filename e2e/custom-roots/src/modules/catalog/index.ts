import { CatalogModule } from './typedef.ts';

const { Movie, RootQuery, RootMutation, RootSubscription } = CatalogModule;

const movies = [
	{ id: '1', title: 'Inception' },
	{ id: '2', title: 'Interstellar' },
];

const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
});

const queryResolver = RootQuery.$fields({
	movie: RootQuery.movie.resolve(
		({ args }) => movies.find((movie) => movie.id === args.id) ?? null,
	),
	movies: RootQuery.movies.resolve(() => movies),
});

const mutationResolver = RootMutation.$fields({
	renameMovie: RootMutation.renameMovie.resolve(({ args }) => {
		const movie = movies.find((movie) => movie.id === args.id);
		return movie == null ? null : { ...movie, title: args.title };
	}),
});

const subscriptionResolver = RootSubscription.$fields({
	movieRenamed: RootSubscription.movieRenamed
		.subscribe(async function* ({ args }) {
			yield { id: args.id, title: 'Renamed' };
		})
		.resolve(({ source }) => source),
});

export default CatalogModule.$schema({
	Movie: movieResolver,
	RootQuery: queryResolver,
	RootMutation: mutationResolver,
	RootSubscription: subscriptionResolver,
});
