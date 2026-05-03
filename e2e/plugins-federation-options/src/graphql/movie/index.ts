import { MovieModule } from './module-types.ts';
import { movieResolver, mutationResolver, queryResolver } from './movie.resolvers.ts';

export default MovieModule.$schema({
	Movie: movieResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
});
