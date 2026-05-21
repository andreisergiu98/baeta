import { auth, rule, scope } from '../../lib/auth.ts';
import { MovieModule } from './typedef.ts';

const { Query, Mutation, Movie, Review } = MovieModule;

const movieReviews = [
	{ id: 'r1', score: 9, comment: 'A mind-bending masterpiece.' },
	{ id: 'r2', score: 8, comment: 'Visually stunning.' },
];

const reviewsResolver = Movie.reviews
	.$use(auth(scope.$granted('readReviews')))
	.resolve(() => movieReviews);

export const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
	rating: Movie.rating.key('rating'),
	reviews: reviewsResolver,
});

export const reviewResolver = Review.$fields({
	id: Review.id.key('id'),
	score: Review.score.key('score'),
	comment: Review.comment.key('comment'),
});

// Authenticated users can read movies, and the resolver grants `readReviews`
// on the returned movie so nested Movie.reviews can be accessed.
const movieQuery = Query.movie
	.$use(auth(scope.isLoggedIn, { grants: ['readReviews'] }))
	.resolve(({ args }) => {
		return {
			id: args.where.id,
			title: 'Inception',
			year: 2010,
			rating: 8.8,
			reviews: [],
		};
	});

// Public listing that skips the default `isLoggedIn` scope, and intentionally
// doesn't grant `readReviews` so Movie.reviews stays gated.
const publicMoviesQuery = Query.publicMovies
	.$use(auth(rule.or(scope.isPublic, scope.isLoggedIn), { skipDefaults: true }))
	.resolve(() => {
		return Array.from({ length: 3 }).map((_, i) => ({
			id: i.toString(),
			title: `Movie ${i}`,
			year: 2020 + i,
			rating: 7.0 + i * 0.5,
			reviews: [],
		}));
	});

const createMovieMutation = Mutation.createMovie
	.$use(auth(scope.hasRole('admin')))
	.resolve(({ args }) => {
		return {
			id: '99',
			title: args.input.title,
			year: args.input.year,
			rating: args.input.rating ?? null,
			reviews: [],
		};
	});

export const queryResolver = Query.$fields({
	movie: movieQuery,
	publicMovies: publicMoviesQuery,
});

export const mutationResolver = Mutation.$fields({
	createMovie: createMovieMutation,
});
