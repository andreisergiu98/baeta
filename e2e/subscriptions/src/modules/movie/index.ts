import {
	movieResolver,
	mutationResolver,
	queryResolver,
	subscriptionResolver,
} from './movie.resolvers.ts';
import { MovieModule } from './typedef.ts';

export default MovieModule.$schema({
	Movie: movieResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
	Subscription: subscriptionResolver,
});
