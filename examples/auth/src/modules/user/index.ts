import { UserModule } from './typedef.ts';
import mutationResolver from './user.mutations.ts';
import queryResolver from './user.queries.ts';
import subscriptionResolver from './user.subscriptions.ts';
import userResolver from './user.type.ts';

export default UserModule.$schema({
	User: userResolver,
	Query: queryResolver,
	Mutation: mutationResolver,
	Subscription: subscriptionResolver,
});
