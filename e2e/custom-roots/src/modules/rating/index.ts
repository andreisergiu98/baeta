import { RatingModule } from './typedef.ts';

const { Rating, RootQuery } = RatingModule;

const ratingResolver = Rating.$fields({
	movieId: Rating.movieId.key('movieId'),
	score: Rating.score.key('score'),
});

const queryResolver = RootQuery.$fields({
	ratings: RootQuery.ratings.resolve(() => [{ movieId: '1', score: 5 }]),
});

export default RatingModule.$schema({
	Rating: ratingResolver,
	RootQuery: queryResolver,
});
