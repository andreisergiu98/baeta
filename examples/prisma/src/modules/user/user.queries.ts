import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';

const { Query } = getUserModule();

Query.user(async (params) => {
	return db.user.findFirst({
		where: {
			id: params.args.where.id,
			email: params.args.where.email,
		},
	});
});

Query.users(async (_params) => {
	return db.user.findMany({
		where: {},
	});
});
