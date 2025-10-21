import { ForbiddenError } from '@baeta/errors';
import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';

const { Mutation } = UserModule;

const createUserMutation = Mutation.createUser
	// Only admins can create users.
	.$auth({
		hasAccess: 'admin',
	})
	.resolve(async ({ args, ctx }) => {
		const user = await db.user.create({
			data: args.data,
		});

		ctx.pubsub.publish('user-created', user.id);

		return user;
	});

const updateUserMutation = Mutation.updateUser
	// We allow the user to update its own profile, but only admins can update other users.
	.$auth(async ({ args, ctx }) => {
		const user = await db.user.findFirst({
			where: {
				id: args.where.id ?? undefined,
				email: args.where.email ?? undefined,
			},
		});

		if (user && user.id === ctx.userId) {
			return true;
		}

		if (!user) {
			// We can also throw any time.
			throw new ForbiddenError();
		}

		return {
			hasAccess: 'admin',
		};
	})
	.use(async (next, { ctx }) => {
		const user = await next();
		if (user) {
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
