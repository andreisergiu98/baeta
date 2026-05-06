import { movieResolver, mutationResolver, queryResolver } from './movie.resolvers.ts';
import { MovieModule } from './typedef.ts';

export default MovieModule.$schema({
	Movie: movieResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
});
