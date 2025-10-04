import { UserModule } from './typedef.ts';

const { Query, Mutation, Subscription, User } = UserModule;

export const userResolver = User.$fields({
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
	return Array.from({ length: 10 }).map((_, i) => ({
		id: i.toString(),
		email: `jon.doe${i}@baeta.io`,
		lastName: `Doe ${i}`,
		profile: null,
		givenName: null,
	}));
});

const updateUserMutation = Mutation.updateUser
	.use(async (next, { args }) => {
		const result = await next();
		console.log('Updated user:', result, 'for args:', args);
		return result;
	})
	.resolve(({ args, ctx }) => {
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

const userUpdatedSubscription = Subscription.userUpdated
	.use((next) => {
		console.log('Before use');
		return next();
	})
	.use(async (next) => {
		console.log('Before subscribed to user updated');
		const sub = await next();
		console.log('After subscribed to user updated');
		return sub;
	})
	.subscribe(({ ctx }) => {
		console.log('Subscribed to user updated');
		return ctx.pubsub.subscribe('user-updated');
	})
	.resolve(({ source }) => {
		console.log('Resolved user updated', source);
		return source;
	});

export const queryResolver = Query.$fields({
	user: userQuery,
	users: usersQuery,
});

export const mutationResolver = Mutation.$fields({
	updateUser: updateUserMutation,
});

export const subscriptionResolver = Subscription.$fields({
	userUpdated: userUpdatedSubscription,
});
