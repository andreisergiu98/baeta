import { UserModule } from './typedef.ts';
import {
	mutationResolver,
	queryResolver,
	subscriptionResolver,
	userResolver,
} from './user.resolvers.ts';

export default UserModule.$schema({
	User: userResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
	Subscription: subscriptionResolver,
});
