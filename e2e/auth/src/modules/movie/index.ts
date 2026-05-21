import {
	movieResolver,
	mutationResolver,
	queryResolver,
	reviewResolver,
} from './movie.resolvers.ts';
import { MovieModule } from './typedef.ts';

export default MovieModule.$schema({
	Movie: movieResolver,
	Review: reviewResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
});
