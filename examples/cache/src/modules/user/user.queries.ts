import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';
import { userCache } from './user.cache.ts';

const { Query } = UserModule;

const userQuery = Query.user.$useCache(userCache).resolve(async ({ args }) => {
	return db.user.findFirst({
		where: {
			id: args.where.id ?? undefined,
			email: args.where.email ?? undefined,
		},
	});
});

const usersQuery = Query.users.$useCache(userCache).resolve(async ({ args }) => {
	return db.user.findMany({
		where: args.where
			? {
					id: args.where.id ?? undefined,
					email: args.where.email ?? undefined,
				}
			: undefined,
	});
});

export default Query.$fields({
	user: userQuery,
	users: usersQuery,
});
