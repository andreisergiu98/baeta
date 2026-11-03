import { UserModule } from './typedef.ts';
import { userCache } from './user.cache.ts';

const { Query } = UserModule;

export default Query.$fields({
	user: Query.user.map((params) =>
		userCache.queries.findUser({
			id: params.args.where.id ?? null,
			email: params.args.where.email ?? null,
		}),
	),
	users: Query.users
		.map(() => userCache.queries.findUsers({}))
		.map(({ source }) => {
			if (source == null) {
				return [];
			}
			return source;
		}),
});
