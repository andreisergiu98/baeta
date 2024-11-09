import { randomUUID } from 'node:crypto';
import { getUserModule } from './typedef.js';

const { Query, Mutation, Subscription } = getUserModule();

Query.user(({ args }) => {
	return {
		id: args.where.id ?? randomUUID({}),
		email: 'jon.doe@baeta.io',
		lastName: 'Doe',
	};
});

Query.user.$use(async ({ args }, next) => {
	const result = await next();
	console.log('Got user:', result, 'for args:', args);
	return result;
});

Query.users(() => {
	const users = Array.from({ length: 10 }).map((_, i) => ({
		id: randomUUID({}),
		email: `jon.doe${i}@baeta.io`,
		lastName: `Doe ${i}`,
	}));
	return users;
});

Mutation.updateUser(({ args, ctx }) => {
	const updatedUser = {
		id: args.where.id,
		email: 'jon.doe@baeta.io',
		givenName: args.data.givenName ?? 'Jon',
		lastName: args.data.lastName ?? 'Doe',
	};

	ctx.pubsub.publish('user-updated', updatedUser);

	return updatedUser;
});

Subscription.userUpdated({
	subscribe(params) {
		return params.ctx.pubsub.asyncIterator('user-updated');
	},
	resolve(params) {
		return params.payload;
	},
});
