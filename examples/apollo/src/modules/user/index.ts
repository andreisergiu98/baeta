import { UserModule } from './typedef.ts';
import { queryResolver, userResolver } from './user.resolvers.ts';

export default UserModule.$schema({
	User: userResolver,
	Query: queryResolver,
});
