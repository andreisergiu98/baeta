import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';
import { userCache } from './user.cache.ts';

const { Mutation, Query } = UserModule;

const createUserMutation = Mutation.createUser.resolve(async ({ args, ctx }) => {
	const user = await db.user.create({
		data: args.data,
	});
	// We want to clear the cache for users, because
	// inserting a new user will change the list of users.
	await Query.users.$cacheClear(userCache);
	// OR
	await userCache.deleteQueries(Query.users.$cacheRef);

	ctx.pubsub.publish('user-created', user.id);
	return user;
});

const updateUserMutation = Mutation.updateUser
	.use(async (next, { ctx }) => {
		const user = await next();
		if (user) {
			// Saving the user will automatically update all queries
			// that have the user in their result set.
			await userCache.save(user);
			ctx.pubsub.publish('user-updated', user);
		}
		return user;
	})
	.resolve(async ({ args }) => {
		return db.user.update({
			where: {
				id: args.where.id ?? undefined,
				email: args.where.email ?? undefined,
			},
			data: {
				email: args.data.email ?? undefined,
				lastName: args.data.lastName ?? undefined,
				givenName: args.data.givenName ?? undefined,
				birthday: args.data.birthday ?? undefined,
				profile: args.data.profile ?? undefined,
			},
		});
	});

export default Mutation.$fields({
	createUser: createUserMutation,
	updateUser: updateUserMutation,
});
