import { movieResolver, reviewResolver } from './review.resolvers.ts';
import { ReviewModule } from './typedef.ts';

export default ReviewModule.$schema({
	Review: reviewResolver,
	Movie: movieResolver,
});
