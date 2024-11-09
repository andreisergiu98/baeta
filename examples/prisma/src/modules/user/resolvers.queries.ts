import { db } from '../../lib/db/prisma.js';
import { getUserModule } from './typedef.js';
import { userCache } from './user-cache.js';

const { Query } = getUserModule();

Query.user(async (params) => {
	return db.user.findFirst({
		where: {
			id: params.args.where.id,
			email: params.args.where.email,
		},
	});
});

Query.user.$useCache(userCache, {});

Query.users(async (params) => {
	return db.user.findMany({
		where: {},
	});
});

Query.users.$useCache(userCache, {});

Query.user.$auth(
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

Query.users.$auth(
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
