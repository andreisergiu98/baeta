import { queryResolver, screeningResolver } from './screening.resolvers.ts';
import { ScreeningModule } from './typedef.ts';

export default ScreeningModule.$schema({
	Screening: screeningResolver,
	Query: queryResolver,
});
