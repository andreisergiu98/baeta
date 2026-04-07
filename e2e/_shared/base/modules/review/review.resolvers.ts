import { ReviewModule } from './typedef.ts';

const { Movie, Review } = ReviewModule;

export const reviewResolver = Review.$fields({
	id: Review.id.key('id'),
	movieId: Review.movieId.key('movieId'),
	score: Review.score.key('score'),
	comment: Review.comment.key('comment'),
});

export const movieResolver = Movie.$fields({
	reviews: Movie.reviews.resolve(({ source }) => {
		return Array.from({ length: 2 }).map((_, i) => ({
			id: `m${source.id}_r${i}`,
			movieId: source.id,
			score: 4 + (i % 2),
			comment: `Review ${i} for movie ${source.id}`,
		}));
	}),
});
