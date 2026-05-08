import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';
import { userCache } from './user.cache.ts';

const { Mutation } = UserModule;

const createUserMutation = Mutation.createUser.resolve(async ({ args, ctx }) => {
	const user = await db.user.create({
		data: args.data,
	});
	// Use "insert" for when creating new items, in order for cache queries to be able to reconcile.
	await userCache.insert(user);
	ctx.pubsub.publish('user-created', user.id);
	return user;
});

const updateUserMutation = Mutation.updateUser
	.$use(async (next, { ctx }) => {
		const user = await next();
		if (user) {
			// Use "update" for existing items, so queries can reconcile.
			// Updating the cached item will automatically update all queries
			await userCache.update(user);
			ctx.pubsub.publish('user-updated', user);
		}
		return user;
	})
	.resolve(async ({ args }) => {
		return await db.user.update({
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
