import { UserModule } from './typedef.ts';

const { Query, Mutation, Subscription, User } = UserModule;

const userResolver = User.$fields({
	id: User.id.key('id'),
	email: User.email.key('email'),
	lastName: User.lastName.key('lastName'),
	profile: User.profile.key('profile'),
	givenName: User.givenName.key('givenName'),
});

const userQuery = Query.user
	.use(async (next, { args }) => {
		const result = await next();
		console.log('Got user:', result, 'for args:', args);
		return result;
	})
	.resolve(({ args }) => {
		return {
			id: args.where.id,
			email: 'jon.doe@baeta.io',
			lastName: 'Doe',
			profile: null,
			givenName: null,
		};
	});

const usersQuery = Query.users.resolve(() => {
	const users = Array.from({ length: 10 }).map((_, i) => ({
		id: i.toString(),
		email: `jon.doe${i}@baeta.io`,
		lastName: `Doe ${i}`,
		profile: null,
		givenName: null,
	}));
	return users;
});

const updateUserMutation = Mutation.updateUser.resolve(({ args, ctx }) => {
	const updatedUser = {
		id: args.where.id,
		email: 'jon.doe@baeta.io',
		givenName: args.data.givenName ?? 'Jon',
		lastName: args.data.lastName ?? 'Doe',
		profile: null,
	};

	ctx.pubsub.publish('user-updated', updatedUser);

	return updatedUser;
});

const userUpdatedSubscription = Subscription.userUpdated.subscribe(({ ctx }) => {
	return ctx.pubsub.asyncIterableIterator('user-updated');
});

export default UserModule.$schema({
	User: userResolver,
	Query: Query.$fields({
		user: userQuery,
		users: usersQuery,
	}),
	Mutation: Mutation.$fields({
		updateUser: updateUserMutation,
	}),
	Subscription: Subscription.$fields({
		userUpdated: userUpdatedSubscription,
	}),
});
