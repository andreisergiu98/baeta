import { MovieModule } from './typedef.ts';

const { Query, Mutation, Subscription, Movie } = MovieModule;

const movies = [
	{ id: '1', title: 'Inception', year: 2010 },
	{ id: '2', title: 'Interstellar', year: 2014 },
];

export const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
});

export const queryResolver = Query.$fields({
	movies: Query.movies.resolve(() => movies),
});

export const mutationResolver = Mutation.$fields({
	createMovie: Mutation.createMovie.resolve(({ args, ctx }) => {
		const movie = { id: '99', title: args.input.title, year: args.input.year };
		void ctx.pubsub.publish('movie-created', movie);
		return movie;
	}),
});

const movieCreatedSubscription = Subscription.movieCreated
	.subscribe(({ ctx }) => {
		return ctx.pubsub.asyncIterableIterator('movie-created');
	})
	.resolve(({ source }) => {
		return source;
	});

const movieTitleChangedSubscription = Subscription.movieTitleChanged
	.$use((next, { ctx }) => {
		if (!ctx.canSubscribe) {
			throw new Error('Not allowed to subscribe!');
		}
		return next();
	})
	.subscribe(({ ctx }) => {
		return ctx.pubsub.asyncIterableIterator('movie-title-changed');
	})
	.$use(async (next) => {
		const result = await next();
		return `title: ${result}`;
	})
	.resolve(({ source }) => {
		return source.toUpperCase();
	});

export const subscriptionResolver = Subscription.$fields({
	movieCreated: movieCreatedSubscription,
	movieTitleChanged: movieTitleChangedSubscription,
});
