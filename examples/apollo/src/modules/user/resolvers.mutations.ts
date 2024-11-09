import { UnauthenticatedError } from '@baeta/errors';
import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';
import { userCache } from './user-cache.ts';

const { Mutation, Query } = getUserModule();

Mutation.createUser(async (params) => {
	const user = await db.user.create({
		data: params.args.data,
	});

	await userCache.deleteQueries(Query.users.$cacheRef);
	// OR
	await Query.users.$cacheClear(userCache, {});

	return user;
});

Mutation.updateUser.$auth((params) => {
	if (params.args.where.id === params.ctx.userId) {
		return true;
	}
	throw new UnauthenticatedError('You can only update your own user');
});

Mutation.updateUser(async (params) => {
	const user = await db.user.update({
		where: {
			id: params.args.where.id,
			email: params.args.where.email,
		},
		data: params.args.data,
	});

	await userCache.save(user);

	return user;
});

Mutation.createUser.$auth(
	{
		$or: {
			isPublic: true,
			isLoggedIn: true,
		},
	},
	{
		skipDefaults: true,
		grants: ['readUserPhotos'],
	},
);

Mutation.updateUser.$auth(
	{
		$or: {
			isPublic: true,
			isLoggedIn: true,
		},
	},
	{
		skipDefaults: true,
		grants: ['readUserPhotos'],
	},
);
