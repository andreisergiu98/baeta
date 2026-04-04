import { ReviewModule } from './module-types.ts';
import { movieResolver, reviewResolver } from './review.resolvers.ts';

export default ReviewModule.$schema({
	Review: reviewResolver,
	Movie: movieResolver,
});
