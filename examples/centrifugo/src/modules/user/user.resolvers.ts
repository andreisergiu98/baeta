import { dedupe, filter } from '../../lib/plugins.ts';
import { UserModule } from './typedef.ts';

const { Query, Mutation, Subscription, User } = UserModule;

export const userResolver = User.$fields({
	id: User.id.key('id'),
	email: User.email.key('email'),
	lastName: User.lastName.key('lastName'),
	profile: User.profile.key('profile'),
	givenName: User.givenName.key('givenName'),
});

const userQuery = Query.user.resolve(({ args }) => {
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

const updateUserMutation = Mutation.updateUser.resolve(async ({ args, ctx }) => {
	const updatedUser = {
		id: args.where.id,
		email: 'jon.doe@baeta.io',
		givenName: args.data.givenName ?? 'Jon',
		lastName: args.data.lastName ?? 'Doe',
		profile: args.data.profile ?? null,
	};

	await ctx.emit('user-updated', updatedUser);

	return updatedUser;
});

const userUpdatedSubscription = Subscription.userUpdated
	.subscribe(({ ctx }) => {
		return ctx.listen('user-updated');
	})
	.$use(filter(({ source }) => Number(source.id) % 2 === 0))
	// Subscription is not relying on ctx so it can be safely deduped.
	.$use(dedupe())
	.resolve(({ source }) => {
		console.log("Emitting 'userUpdated' subscription event:", source);
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
