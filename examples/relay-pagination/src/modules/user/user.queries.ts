import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';

const { Query } = UserModule;

const userQuery = Query.user.resolve(async ({ args }) => {
	return db.user.findFirst({
		where: {
			id: args.where.id ?? undefined,
			email: args.where.email ?? undefined,
		},
	});
});

const usersQuery = Query.users.resolve(async ({ args }) => {
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
