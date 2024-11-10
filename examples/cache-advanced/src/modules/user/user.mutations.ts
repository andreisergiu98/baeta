import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';

const { Mutation } = getUserModule();

Mutation.createUser(async (params) => {
	const user = await db.user.create({
		data: params.args.data,
	});

	params.ctx.pubsub.publish('user-created', user.id);

	return user;
});

Mutation.updateUser(async (params) => {
	return db.user.update({
		where: {
			id: params.args.where.id,
			email: params.args.where.email,
		},
		data: params.args.data,
	});
});

Mutation.updateUser.$use(async ({ ctx }, next) => {
	const user = await next();
	if (user) {
		ctx.pubsub.publish('user-updated', user);
	}
	return user;
});
