import { queryResolver } from './movie-pages.resolvers.ts';
import { MoviePagesModule } from './typedef.ts';

export default MoviePagesModule.$schema({
	Query: queryResolver,
});
